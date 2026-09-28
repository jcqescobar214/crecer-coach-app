import React, { useState } from 'react';
import HelpHeader from './HelpHeader';
import SituationGrid from './SituationGrid';
import CoachContextMessage from './CoachContextMessage';
import IntensityScreen from './IntensityScreen';
import PauseScreen from './PauseScreen';
import CoachResponseScreen from './CoachResponseScreen';

const HelpNowScreen = ({ onBack }) => {
  // Estado para gestionar los pasos del flujo
  // Paso 1: Selección de Situación de Crisis
  // Paso 2: Evaluación de Intensidad de la Situación del Niño (1 al 5)
  // Paso 3: Modo PAUSA - Evaluación de Alteración del Padre (Si la intensidad es Media a Alta: 3, 4 o 5)
  // Paso 4: Respuesta del Coach enfocada en el niño
  const [step, setStep] = useState(1);
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [situationIntensity, setSituationIntensity] = useState(null);
  const [pauseData, setPauseData] = useState(null);

  // Paso 1 -> Paso 2 (o directo a Modo Pausa si es la tarjeta 'Estoy perdiendo la paciencia')
  const handleSelectSituation = (situation) => {
    setSelectedSituation(situation);
    if (situation.id === 'paciencia') {
      setStep(3); // Perdiendo la paciencia va directo al termómetro del padre
    } else {
      setStep(2); // Transición al termómetro de intensidad de la situación del niño
    }
  };

  // Paso 2: Evaluación de Intensidad de la Situación del Niño
  const handleSelectIntensity = (level) => {
    setSituationIntensity(level);
    // Si la intensidad de la situación es MEDIA A ALTA (3, 4 o 5), evalúa la alteración del padre
    if (level >= 3) {
      setStep(3);
    } else {
      // Si la intensidad de la situación es BAJA (1 o 2), pasa directo a la orientación del niño
      setStep(4);
    }
  };

  // Paso 3 -> Paso 4
  const handleCompletePause = (data) => {
    setPauseData(data);
    setStep(4);
  };

  // PASO 2: Intensidad de la Situación del Niño
  if (step === 2) {
    return (
      <IntensityScreen 
        situation={selectedSituation}
        onBack={() => setStep(1)}
        onSelectIntensity={handleSelectIntensity}
      />
    );
  }

  // PASO 3: Modo PAUSA - Termómetro de Alteración del Padre & Respiración condicional (si alteración >= 4)
  if (step === 3) {
    return (
      <PauseScreen 
        situation={selectedSituation}
        intensity={situationIntensity}
        onBack={() => setStep(selectedSituation?.id === 'paciencia' ? 1 : 2)}
        onContinue={handleCompletePause}
      />
    );
  }

  // PASO 4: Respuesta del Coach enfocada en el niño
  if (step === 4) {
    return (
      <CoachResponseScreen 
        situation={selectedSituation}
        intensity={situationIntensity}
        pauseData={pauseData}
        onBack={() => setStep(situationIntensity >= 3 || selectedSituation?.id === 'paciencia' ? 3 : 2)}
      />
    );
  }

  // PASO 1: Selección de Situación de Crisis
  return (
    <div className="flex flex-col bg-slate-50 w-full relative">
      <HelpHeader onBack={onBack} title="¿Qué está pasando?" />

      <div className="p-4 flex flex-col gap-5">
        <SituationGrid onSelectSituation={handleSelectSituation} />
        <CoachContextMessage />
      </div>
    </div>
  );
};

export default HelpNowScreen;
