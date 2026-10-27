import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeDashboard from './components/HomeDashboard';
import CoachChatScreen from './components/CoachChatScreen';
import HelpNowScreen from './components/HelpNowScreen';
import LearnHubScreen from './components/LearnHubScreen';
import SkillExperienceScreen from './components/SkillExperienceScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [currentScreen, setCurrentScreen] = useState(null); // 'helpNow' | null
  const [selectedSkill, setSelectedSkill] = useState(null); // Objeto de habilidad activa en el wizard

  const handleActionClick = (actionId) => {
    if (actionId === 'help') {
      setCurrentScreen('helpNow');
    } else if (actionId === 'learn') {
      setActiveTab('aprender');
      setSelectedSkill(null);
    } else if (actionId === 'plan') {
      setActiveTab('plan');
    }
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

    // 2. Experiencia guiada de habilidad (Wizard de 7 pasos)
    if (selectedSkill) {
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

    // 3. Catálogo "Quiero aprender" (9 Habilidades Kazdin)
    if (activeTab === 'aprender') {
      return (
        <LearnHubScreen
          onSelectSkill={(skill) => setSelectedSkill(skill)}
          onBack={() => setActiveTab('inicio')}
        />
      );
    }

    // 4. Pantalla de inicio
    if (activeTab === 'inicio') {
      return <HomeDashboard onActionClick={handleActionClick} />;
    }

    // 5. Chat con el Coach
    if (activeTab === 'coach') {
      return <CoachChatScreen onBack={() => setActiveTab('inicio')} />;
    }

    return <HomeDashboard onActionClick={handleActionClick} />;
  };

  const isFullViewScreen = currentScreen === 'helpNow' || activeTab === 'coach' || Boolean(selectedSkill) || activeTab === 'aprender';
  const shouldHideBottomNav = Boolean(selectedSkill);

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
    >
      {renderContent()}
    </Layout>
  );
}
