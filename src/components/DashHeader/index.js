import React from 'react';

import './styles.scss';

const DashHeader = (props) => {
  let date = new Date().toDateString();
  return (
    <div className='.dashboard-header'>
      <div className="date">{date}</div>
    </div>
  );
};

export default DashHeader;
