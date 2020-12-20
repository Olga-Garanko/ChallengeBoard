import './styles.scss';
import { useState, useEffect } from 'react';
import { baseUrl, fetchApi } from "../../utils/api";
//import { useHistory } from "react-router-dom";
import avatar from '../../assets/images/default-avatar.png';
import {Link} from "react-router-dom";

const UserInfo = () => {
  const [user, setUser] = useState({});
  //const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('jwt');
      fetchApi(`${baseUrl}/api/users/me`, {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(data => setUser(data.user))
      .catch(() => {
        // localStorage.removeItem('jwt');
        // history.push('/');
      });
  }, []);
  return (
    <div className='user'>
      <div className='user__logo'>
        {
          user.avatar ?
          <img src={user.avatar} alt={user.username} /> :
          <img src={avatar} alt={user.username} />
        }
      </div>
      <div className='user__data'>
        <Link to='/profile' className='user__name'>
          {user.username}
        </Link>
      </div>
    </div>
  );
};

export default UserInfo;
