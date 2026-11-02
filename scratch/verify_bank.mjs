import { learnSkills, getSkillById } from '../src/data/learnBank.js';

console.log(`Total skills loaded: ${learnSkills.length}`);
learnSkills.forEach((s, idx) => {
  console.log(`Skill ${idx + 1}: id=${s.id}, title="${s.title}", isPremier=${s.isPremier}, number=${s.number}`);
  // Check required sections for premier skills
  const checks = [
    s.whyImportant ? 'OK' : 'MISSING',
    s.miraQuePasa ? 'OK' : 'MISSING',
    s.elige ? 'OK' : 'MISSING',
    s.miraComoSeHace ? 'OK' : 'MISSING',
    s.practica ? 'OK' : 'MISSING',
    s.puedesDecirOHacer ? 'OK' : 'MISSING',
    s.evita ? 'OK' : 'MISSING',
    s.pruebaloHoy ? 'OK' : 'MISSING',
  ];
  if (checks.some(c => c === 'MISSING')) {
    console.error(`Skill ${s.id} is missing sections:`, checks);
  }
});
