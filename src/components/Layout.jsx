import React from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

const Layout = ({ children, hideHeader = false, hideBottomNav = false, activeTab = 'inicio', onTabChange, floatingAction = null }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col relative shadow-sm overflow-hidden h-[100dvh]">
        {!hideHeader && <Header />}

        <main className={`flex-1 overflow-y-auto w-full ${hideHeader ? 'p-0 pb-24' : 'p-4 pb-24'} flex flex-col gap-4`}>
          {children}
        </main>

        {floatingAction}

        {!hideBottomNav && <BottomNav activeTab={activeTab} onTabChange={onTabChange} />}
      </div>
  );
};

export default Layout;
