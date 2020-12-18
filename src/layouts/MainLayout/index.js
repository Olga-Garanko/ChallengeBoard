import React from 'react';
import UserInfo from '../../components/UserInfo';
import DashboardNav from '../../components/DashboardNav';
import DashHeader from '../../components/DashHeader';

import './styles.scss';

const MainLayout = ({ children }) => {
  return (
    <div className='wrapper'>
      <aside className='aside'>
        <UserInfo></UserInfo>
        <DashboardNav></DashboardNav>
      </aside>

      <main className='dashboard'>
        <DashHeader date={new Date().toDateString()}></DashHeader>
        <div className="dashboard__content" id='content'>{children}</div>
      </main>
    </div>
  );
};

export default MainLayout;
