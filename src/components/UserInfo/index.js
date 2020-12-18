import React from 'react';

import './styles.scss';

const UserInfo = () => {
  return (
    <div className='user'>
      <div className='user__logo'>Image</div>
      <div className='user__data'>
        <div className='user__data_name'>Name Secondname</div>
        <div className='user__data_additional'>Additional information</div>
      </div>
    </div>
  );
};

export default UserInfo;
