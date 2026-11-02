import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { learnSkills, getSkillById } from '../src/data/learnBank.js';
import { evaluatePractice } from '../src/data/planStorage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const results = {
  passed: 0,
  failed: 0,
  tests: []
};

function assert(condition, name, details = '') {
  if (condition) {
    results.passed++;
    results.tests.push({ name, status: 'PASS', details });
    console.log(`  ✓ [PASS] ${name}`);
  } else {
    results.failed++;
    results.tests.push({ name, status: 'FAIL', details });
    console.error(`  ✗ [FAIL] ${name} - ${details}`);
  }
}

console.log('\n======================================================');
console.log('🧪 SUITE DE PRUEBAS AUTOMATIZADAS - CRECER COACH APP');
console.log('======================================================\n');

// -----------------------------------------------------------------------------
// TEST 1: Catálogo Completo de 10 Habilidades
// -----------------------------------------------------------------------------
console.log('--- TEST 1: Catálogo de Habilidades ---');
assert(learnSkills.length === 10, 'Total de habilidades es exactamente 10', `Obtenido: ${learnSkills.length}`);

learnSkills.forEach((skill, idx) => {
  assert(skill.number === idx + 1, `Habilidad ${idx + 1} (${skill.id}) tiene número correlativo ${idx + 1}`);
  assert(skill.isPremier === true, `Habilidad ${skill.id} tiene isPremier=true`);
  assert(typeof skill.title === 'string' && skill.title.length > 0, `Habilidad ${skill.id} tiene título válido: "${skill.title}"`);
  assert(typeof skill.whyImportant === 'string' && skill.whyImportant.length > 20, `Habilidad ${skill.id} tiene whyImportant descriptivo`);
});

// -----------------------------------------------------------------------------
// TEST 2: Estructura Pedagógica de 8 Fases en Todas las Habilidades
// -----------------------------------------------------------------------------
console.log('\n--- TEST 2: Integridad de las 8 Fases en Todas las Habilidades ---');

learnSkills.forEach(skill => {
  // Fase 1: Mira qué pasa
  assert(
    skill.miraQuePasa && typeof skill.miraQuePasa.dialogue === 'string',
    `Habilidad ${skill.id}: Fase 1 (Mira qué pasa) con diálogo`,
    skill.miraQuePasa?.dialogue?.slice(0, 30)
  );

  // Fase 2: Elige
  assert(
    skill.elige && Array.isArray(skill.elige.options) && skill.elige.options.length >= 3,
    `Habilidad ${skill.id}: Fase 2 (Elige) con >= 3 opciones`,
    `Opciones: ${skill.elige?.options?.length}`
  );
  const correctOpt = skill.elige?.options?.find(o => o.isCorrect);
  assert(!!correctOpt, `Habilidad ${skill.id}: Fase 2 tiene una opción correcta identificada`);

  // Fase 3: Mira cómo se hace (Audio y Paneles)
  assert(
    skill.miraComoSeHace && Array.isArray(skill.miraComoSeHace.panels) && skill.miraComoSeHace.panels.length >= 2,
    `Habilidad ${skill.id}: Fase 3 (Mira cómo se hace) con >= 2 paneles de audio/ejemplo`,
    `Paneles: ${skill.miraComoSeHace?.panels?.length}`
  );

  // Fase 4: Practica (4 actividades)
  assert(
    skill.practica && Array.isArray(skill.practica.activities) && skill.practica.activities.length === 4,
    `Habilidad ${skill.id}: Fase 4 (Practica) con exactamente 4 actividades seleccionables`,
    `Actividades: ${skill.practica?.activities?.length}`
  );

  // Fase 5: Puedes decir o hacer (4 tarjetas)
  assert(
    skill.puedesDecirOHacer && Array.isArray(skill.puedesDecirOHacer.cards) && skill.puedesDecirOHacer.cards.length === 4,
    `Habilidad ${skill.id}: Fase 5 (Puedes decir o hacer) con grid 2x2 (4 tarjetas)`,
    `Tarjetas: ${skill.puedesDecirOHacer?.cards?.length}`
  );

  // Fase 6: Evita (4 tarjetas)
  assert(
    skill.evita && Array.isArray(skill.evita.cards) && skill.evita.cards.length === 4,
    `Habilidad ${skill.id}: Fase 6 (Evita) con grid 2x2 (4 tarjetas)`,
    `Tarjetas: ${skill.evita?.cards?.length}`
  );

  // Fase 7: Pruébalo hoy (Misión, duración y momentos)
  assert(
    skill.pruebaloHoy && skill.pruebaloHoy.habitKey && Array.isArray(skill.pruebaloHoy.durations) && Array.isArray(skill.pruebaloHoy.moments),
    `Habilidad ${skill.id}: Fase 7 (Pruébalo hoy) con misión, selectores de 2 vs 5 min y momentos`
  );
});

// -----------------------------------------------------------------------------
// TEST 3: Matriz de Evaluación Clínica en planStorage.js
// -----------------------------------------------------------------------------
console.log('\n--- TEST 3: Evaluación Clínica para las 10 Habilidades ---');

learnSkills.forEach(skill => {
  // Caso 1: Práctica exitosa
  const evalPositive = evaluatePractice(skill.id, {
    pudoPracticar: 'si',
    pudoJugar: 'si',
    dejoElegir: 'si',
    acompanoSinDirigir: 'si',
    seAcerco: 'si',
    unaSolaCosa: 'si',
    tonoCalmo: 'firme_calmo',
    dificultad: 'ninguna'
  });

  assert(
    evalPositive && evalPositive.status === 'Realizada' && typeof evalPositive.bien === 'string' && typeof evalPositive.recomendacion === 'string',
    `Evaluación de práctica exitosa para habilidad "${skill.id}" retorna estructura completa`,
    evalPositive?.bien?.slice(0, 40) + '...'
  );

  // Caso 2: Práctica pospuesta / hoy no
  const evalPostponed = evaluatePractice(skill.id, {
    pudoPracticar: 'hoy_no',
    pudoJugar: 'hoy_no'
  });

  assert(
    evalPostponed && evalPostponed.status === 'Reprogramada',
    `Evaluación de práctica pospuesta ("hoy_no") para "${skill.id}" retorna status 'Reprogramada'`
  );
});

// -----------------------------------------------------------------------------
// TEST 4: Verificación de Regla de Negocio: ZERO Menciones de "Kazdin"
// -----------------------------------------------------------------------------
console.log('\n--- TEST 4: Regla Estricta: Cero Menciones de Metodología "Kazdin" ---');

function searchDirectoryForPattern(dir, pattern, extFilter) {
  let matches = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        matches = matches.concat(searchDirectoryForPattern(fullPath, pattern, extFilter));
      }
    } else if (extFilter.some(ext => file.endsWith(ext))) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (pattern.test(content)) {
        matches.push(fullPath);
      }
    }
  }
  return matches;
}

const kazdinMatches = searchDirectoryForPattern(
  path.join(rootDir, 'src'),
  /kazdin/i,
  ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.json']
);

assert(
  kazdinMatches.length === 0,
  'No existe ninguna mención de "Kazdin" en el código fuente de la aplicación (src/)',
  kazdinMatches.join(', ')
);

// -----------------------------------------------------------------------------
// RESUMEN FINAL
// -----------------------------------------------------------------------------
console.log('\n======================================================');
console.log(`📊 RESULTADO FINAL: ${results.passed} pruebas exitosas, ${results.failed} fallidas.`);
console.log('======================================================\n');

if (results.failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
