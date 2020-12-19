import './styles.scss';
import { NavLink } from 'react-router-dom';

const DashboardNav = () => {
  return (
    <nav className='nav'>
      <NavLink to='/challenges' className='nav__link' activeClassName='nav__active'>
        My habits
      </NavLink>
      <NavLink to='/edit-challenge' className='nav__link' activeClassName='nav__active'>
        Add new habit
      </NavLink>
      <NavLink to='/progress' className='nav__link' activeClassName='nav__active'>
        My progress
      </NavLink>
      <NavLink to='/mentors' className='nav__link' activeClassName='nav__active'>
        Mentors
      </NavLink>
    </nav>
  );
};

export default DashboardNav;
