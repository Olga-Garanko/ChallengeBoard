import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const DashboardNav = () => {
  return (
    <div className='.navigation'>
      <ul className="navigation__list">
        <li><Link to="/" className="nav-link">Add new habit</Link></li>
        <li><Link to="/" className="nav-link">My progress</Link></li>
        <li><Link to="/" className="nav-link">Mentors</Link></li>
      </ul>
    </div>
  );
};

export default DashboardNav;
