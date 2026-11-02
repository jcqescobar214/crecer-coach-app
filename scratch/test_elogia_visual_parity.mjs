import fs from 'fs';
import path from 'path';

console.log('======================================================');
console.log('🧪 VERIFICACIÓN DE PARIDAD VISUAL: HABILIDAD ELOGIA');
console.log('======================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ [PASS] ${message}`);
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

// 1. Verificar existencia física de imágenes en public/elogia/
console.log('--- 1. Existencia de Archivos de Imagen en public/elogia/ ---');
const requiredElogiaImages = [
  'illustration_intro.png',
  'illustration_mira.png',
  'illustration_elige.png',
  'thumb_opt_a.png',
  'thumb_opt_b.png',
  'thumb_opt_c.png',
  'demo_panel_1.png',
  'demo_panel_2.png',
  'practica_tarea.png',
  'practica_ropa.png',
  'practica_calma.png',
  'practica_mesa.png',
  'tab_tarea.png',
  'tab_ropa.png',
  'tab_calma.png',
  'tab_mesa.png',
  'illustration_listo.png',
  'illustration_mision.png',
  'card_accion_exacta.png',
  'card_en_caliente.png',
  'card_calidez_fisica.png',
  'card_valora_esfuerzo.png',
  'card_el_pero.png',
  'card_sarcasmo.png',
  'card_elogio_vago.png',
  'card_postergar.png'
];

requiredElogiaImages.forEach(file => {
  const filePath = path.join(process.cwd(), 'public', 'elogia', file);
  const exists = fs.existsSync(filePath);
  const size = exists ? fs.statSync(filePath).size : 0;
  assert(exists && size > 100, `Imagen requerida presente y válida: /elogia/${file} (${(size/1024).toFixed(1)} KB)`);
});

// 2. Paridad en learnBank.js
console.log('\n--- 2. Estructura de Datos de Elogia en learnBank.js ---');
import { getSkillById } from '../src/data/learnBank.js';
const elogia = getSkillById('elogia');

assert(Boolean(elogia), 'Habilidad elogia encontrada en learnBank.js');
assert(elogia.elige?.image === '/elogia/illustration_elige.png', 'Punto 2 (Elige) tiene image definida');
assert(elogia.elige?.options?.every(o => Boolean(o.thumb)), 'Punto 2 (Elige) tiene miniaturas (thumbs) en todas las opciones');

assert(Array.isArray(elogia.miraComoSeHace?.panels) && elogia.miraComoSeHace.panels.length === 2, 'Punto 3 (Mira cómo se hace) tiene exactamente 2 paneles');
assert(elogia.miraComoSeHace?.panels?.every(p => Boolean(p.image)), 'Punto 3 (Mira cómo se hace) tiene imágenes demo_panel en ambos paneles');

assert(Array.isArray(elogia.practica?.activities) && elogia.practica.activities.length === 4, 'Punto 4 (Practica) tiene exactamente 4 actividades');
assert(elogia.practica?.activities?.every(a => Boolean(a.image) && Boolean(a.icon)), 'Punto 4 (Practica) tiene imágenes de situación y tab icons en las 4 actividades');

assert(Array.isArray(elogia.puedesDecirOHacer?.cards) && elogia.puedesDecirOHacer.cards.length === 4, 'Punto 5 (Puedes decir o hacer) tiene 4 tarjetas');
assert(elogia.puedesDecirOHacer?.cards?.every(c => Boolean(c.image)), 'Punto 5 tiene imágenes en las 4 tarjetas');

assert(Array.isArray(elogia.evita?.cards) && elogia.evita.cards.length === 4, 'Punto 6 (Evita) tiene 4 tarjetas');
assert(elogia.evita?.cards?.every(c => Boolean(c.image)), 'Punto 6 tiene imágenes en las 4 tarjetas');

// 3. ElogiaSkillScreen.jsx
console.log('\n--- 3. Verificación de ElogiaSkillScreen.jsx ---');
const elogiaScreenContent = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'ElogiaSkillScreen.jsx'), 'utf-8');

assert(elogiaScreenContent.includes('/elogia/illustration_elige.png'), 'ElogiaSkillScreen incluye ilustración para Paso 2 Elige');
assert(elogiaScreenContent.includes('/elogia/thumb_opt_a.png'), 'ElogiaSkillScreen incluye miniaturas para opciones de Paso 2');
assert(elogiaScreenContent.includes('/elogia/demo_panel_1.png') && elogiaScreenContent.includes('/elogia/demo_panel_2.png'), 'ElogiaSkillScreen incluye demo_panel_1 y 2 en Paso 3');
assert(elogiaScreenContent.includes('playSampleAudio'), 'ElogiaSkillScreen incluye reproducción de audio con síntesis en Paso 3');
assert(elogiaScreenContent.includes('activitiesData[activeActivity].image'), 'ElogiaSkillScreen incluye imagen de situación en Paso 4 Practica');
assert(elogiaScreenContent.includes('/elogia/tab_tarea.png') && elogiaScreenContent.includes('act.icon'), 'ElogiaSkillScreen renderiza iconos de pestaña en Paso 4');
assert(elogiaScreenContent.includes('/elogia/card_accion_exacta.png'), 'ElogiaSkillScreen incluye imágenes de tarjetas en Paso 5 Puedes decir o hacer');
assert(elogiaScreenContent.includes('/elogia/card_el_pero.png'), 'ElogiaSkillScreen incluye imágenes de tarjetas en Paso 6 Evita');
assert(!elogiaScreenContent.toLowerCase().includes('kazdin'), 'ElogiaSkillScreen no contiene menciones de Kazdin');

// 4. SkillExperienceScreen.jsx
console.log('\n--- 4. Verificación de SkillExperienceScreen.jsx ---');
const skillExpContent = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'SkillExperienceScreen.jsx'), 'utf-8');

assert(skillExpContent.includes('illustration_elige.png'), 'SkillExperienceScreen renderiza ilustración en Paso 2');
assert(skillExpContent.includes('thumb_opt_'), 'SkillExperienceScreen renderiza miniaturas de opciones en Paso 2');
assert(skillExpContent.includes('demo_panel_'), 'SkillExperienceScreen renderiza paneles visuales con play audio en Paso 3');
assert(skillExpContent.includes('practica_'), 'SkillExperienceScreen renderiza banner de situación cotidiana en Paso 4');
assert(skillExpContent.includes('card.image') && skillExpContent.includes('puedesDecirOHacer'), 'SkillExperienceScreen renderiza imágenes de tarjetas en Paso 5');
assert(skillExpContent.includes('card.image') && skillExpContent.includes('evita'), 'SkillExperienceScreen renderiza imágenes de tarjetas en Paso 6');
assert(!skillExpContent.toLowerCase().includes('kazdin'), 'SkillExperienceScreen no contiene menciones de Kazdin');

// 5. App.jsx Routing
console.log('\n--- 5. Verificación de Enrutamiento en App.jsx ---');
const appContent = fs.readFileSync(path.join(process.cwd(), 'src', 'App.jsx'), 'utf-8');
assert(appContent.includes("selectedSkill.id === 'elogia'"), 'App.jsx contiene bloque condicional para elogia');
assert(appContent.includes('<ElogiaSkillScreen'), 'App.jsx monta ElogiaSkillScreen');

console.log('\n======================================================');
console.log(`📊 RESULTADO PARIDAD: ${passedTests}/${totalTests} pruebas exitosas.`);
console.log('======================================================\n');
