import React, { useState } from 'react';
import HelpHeader from './HelpHeader';
import SituationGrid from './SituationGrid';
import CoachContextMessage from './CoachContextMessage';
import PauseScreen from './PauseScreen';
import CoachResponseScreen from './CoachResponseScreen';

const HelpNowScreen = ({ onBack }) => {
  // Flujo optimizado de baja carga cognitiva (2 toques al guion):
  // Paso 1: Selección de Situación de Crisis
  // Paso 2: Modo PAUSA ("Primero tú" - Decisión de 1 toque: Guion directo vs Respirar)
  // Paso 3: Teleprompter / Orientación al Niño (y reflexión post-crisis "en frío")
  const [step, setStep] = useState(1);
  const [selectedSituation, setSelectedSituation] = useState(null);
  const [pauseData, setPauseData] = useState(null);

  // Paso 1 -> Paso 2 (Directo a Modo PAUSA)
  const handleSelectSituation = (situation) => {
    setSelectedSituation(situation);
    setStep(2);
  };

  // Paso 2 -> Paso 3 (Directo a Guion Teleprompter)
  const handleCompletePause = (data) => {
    setPauseData(data);
    setStep(3);
  };

  // PASO 2: Modo PAUSA ("Primero tú")
  if (step === 2) {
    return (
      <PauseScreen 
        situation={selectedSituation}
        onBack={() => setStep(1)}
        onContinue={handleCompletePause}
      />
    );
  }

  // PASO 3: Teleprompter de Crisis y Orientación al Niño
  if (step === 3) {
    return (
      <CoachResponseScreen 
        situation={selectedSituation}
        pauseData={pauseData}
        onBack={() => setStep(2)}
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
