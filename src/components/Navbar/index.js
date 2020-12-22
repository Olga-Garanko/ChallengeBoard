import './styles.scss';
import { NavLink } from 'react-router-dom';
import Button from '../../components/common/Button';
import { useHistory } from "react-router-dom";

const DashboardNav = () => {
  const history = useHistory();
  const onLogout = () => {
    localStorage.removeItem('jwt');
    history.push('/');
  };

  return (
    <nav className='nav'>
      <NavLink to='/challenges' className='nav__link' activeClassName='nav__link_active'>
        My challenges
      </NavLink>
      <NavLink to='/create-challenge' className='nav__link' activeClassName='nav__link_active'>
        New challenge
      </NavLink>
      <NavLink to='/progress' className='nav__link' activeClassName='nav__link_active'>
        My progress
      </NavLink>
      <NavLink to='/mentors' className='nav__link' activeClassName='nav__link_active'>
        Mentors
      </NavLink>
      <Button
            type="button"
            className="nav__link"
            onClick={onLogout}
          >
            Exit
        </Button> 
    </nav>
  );
};

export default DashboardNav;
