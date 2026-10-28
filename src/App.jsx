import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeDashboard from './components/HomeDashboard';
import CoachChatScreen from './components/CoachChatScreen';
import HelpNowScreen from './components/HelpNowScreen';
import LearnHubScreen from './components/LearnHubScreen';
import SkillExperienceScreen from './components/SkillExperienceScreen';
import ConectaSkillScreen from './components/ConectaSkillScreen';
import PlanScreen from './components/PlanScreen';
import ProgressScreen from './components/ProgressScreen';
import RegisterPracticeScreen from './components/RegisterPracticeScreen';
import EmergencyButton from './components/EmergencyButton';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [currentScreen, setCurrentScreen] = useState(null); // 'helpNow' | 'registerPractice' | null
  const [selectedSkill, setSelectedSkill] = useState(null); // Objeto de habilidad activa en el wizard
  const [practiceSkillId, setPracticeSkillId] = useState('conecta');

  const handleActionClick = (actionId) => {
    if (actionId === 'help') {
      setCurrentScreen('helpNow');
    } else if (actionId === 'learn') {
      setActiveTab('aprender');
      setSelectedSkill(null);
      setCurrentScreen(null);
    } else if (actionId === 'plan') {
      setActiveTab('plan');
      setSelectedSkill(null);
      setCurrentScreen(null);
    }
  };

  const handleStartRegisterPractice = (skillId = 'conecta') => {
    setPracticeSkillId(skillId);
    setCurrentScreen('registerPractice');
  };

  const renderContent = () => {
    // 1. Pantalla de crisis inmediata (Ayúdame ahora)
    if (currentScreen === 'helpNow') {
      return (
        <HelpNowScreen 
          onBack={() => setCurrentScreen(null)} 
        />
      );
    }

    // 2. Pantalla de registro de práctica (5 preguntas + feedback clínico)
    if (currentScreen === 'registerPractice') {
      return (
        <RegisterPracticeScreen
          skillId={practiceSkillId}
          onBack={() => setCurrentScreen(null)}
          onComplete={() => {
            setCurrentScreen(null);
            setActiveTab('plan');
          }}
        />
      );
    }

    // 3. Experiencia guiada de habilidad
    if (selectedSkill) {
      // Si es "Conecta y juega", usamos la experiencia especializada de alta fidelidad
      if (selectedSkill.id === 'conecta') {
        return (
          <ConectaSkillScreen
            onBack={() => setSelectedSkill(null)}
            onComplete={() => {
              setSelectedSkill(null);
              setActiveTab('aprender');
            }}
            onGoToPlan={() => {
              setSelectedSkill(null);
              setActiveTab('plan');
            }}
          />
        );
      }

      // Otras habilidades usan el SkillExperienceScreen genérico
      return (
        <SkillExperienceScreen
          skill={selectedSkill}
          onBack={() => setSelectedSkill(null)}
          onComplete={() => {
            setSelectedSkill(null);
            setActiveTab('inicio');
          }}
          onExploreOther={() => setSelectedSkill(null)}
        />
      );
    }

    // 4. Catálogo "Quiero aprender" (10 Habilidades Prácticas con Conecta y Juega de #1)
    if (activeTab === 'aprender') {
      return (
        <LearnHubScreen
          onSelectSkill={(skill) => setSelectedSkill(skill)}
          onBack={() => setActiveTab('inicio')}
        />
      );
    }

    // 5. Mi Plan (Prácticas pendientes, realizadas e historial)
    if (activeTab === 'plan') {
      return (
        <PlanScreen
          onRegisterPractice={handleStartRegisterPractice}
          onExploreSkills={() => setActiveTab('aprender')}
        />
      );
    }

    // 6. Mi Progreso (Resumen de aprendizajes, detalle y comparativa de prácticas)
    if (activeTab === 'progreso') {
      return (
        <ProgressScreen
          onSelectSkillToLearn={(skill) => setSelectedSkill(skill)}
          onRegisterPractice={handleStartRegisterPractice}
        />
      );
    }

    // 7. Chat con el Coach
    if (activeTab === 'coach') {
      return <CoachChatScreen onBack={() => setActiveTab('inicio')} />;
    }

    // 8. Pantalla de inicio por defecto
    return <HomeDashboard onActionClick={handleActionClick} />;
  };

  const isFullViewScreen = currentScreen === 'helpNow' || 
                           currentScreen === 'registerPractice' || 
                           activeTab === 'coach' || 
                           Boolean(selectedSkill) || 
                           activeTab === 'aprender' || 
                           activeTab === 'plan' || 
                           activeTab === 'progreso';

  const shouldHideBottomNav = Boolean(selectedSkill) || 
                              currentScreen === 'registerPractice' || 
                              currentScreen === 'helpNow';

  const isMainPage = activeTab === 'inicio' && currentScreen === null && selectedSkill === null;

  return (
    <Layout 
      hideHeader={isFullViewScreen} 
      hideBottomNav={shouldHideBottomNav}
      activeTab={activeTab} 
      onTabChange={(tab) => {
        setCurrentScreen(null);
        setSelectedSkill(null);
        setActiveTab(tab);
      }}
      floatingAction={
        isMainPage ? (
          <EmergencyButton onClick={() => handleActionClick('help')} />
        ) : null
      }
    >
      {renderContent()}
    </Layout>
  );
}
