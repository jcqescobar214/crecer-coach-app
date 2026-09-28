import React, { useState } from 'react';
import Layout from './components/Layout';
import HomeDashboard from './components/HomeDashboard';
import CoachChatScreen from './components/CoachChatScreen';
import HelpNowScreen from './components/HelpNowScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [currentScreen, setCurrentScreen] = useState(null); // 'helpNow' | null

  const handleActionClick = (actionId) => {
    if (actionId === 'help') {
      setCurrentScreen('helpNow');
    } else if (actionId === 'learn') {
      setActiveTab('aprender');
    } else if (actionId === 'plan') {
      setActiveTab('plan');
    }
  };

  const renderContent = () => {
    if (currentScreen === 'helpNow') {
      return (
        <HelpNowScreen 
          onBack={() => setCurrentScreen(null)} 
        />
      );
    }

    if (activeTab === 'inicio') {
      return <HomeDashboard onActionClick={handleActionClick} />;
    }
    if (activeTab === 'coach') {
      return <CoachChatScreen onBack={() => setActiveTab('inicio')} />;
    }
    return <HomeDashboard onActionClick={handleActionClick} />;
  };

  const isFullViewScreen = currentScreen === 'helpNow' || activeTab === 'coach';

  return (
    <Layout 
      hideHeader={isFullViewScreen} 
      activeTab={activeTab} 
      onTabChange={(tab) => {
        setCurrentScreen(null);
        setActiveTab(tab);
      }}
    >
      {renderContent()}
    </Layout>
  );
}
