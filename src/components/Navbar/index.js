import './styles.scss';
import { Link } from 'react-router-dom';

const DashboardNav = () => {
  return (
    <nav className='navbar'>
      <ul className="nav">
        <li className="nav__item"><Link to="/challenges" className="nav__link">My habits</Link></li>
        <li className="nav__item"><Link to="/edit-challenge" className="nav__link">Add new habit</Link></li>
        <li className="nav__item"><Link to="/progress" className="nav__link">My progress</Link></li>
        <li className="nav__item"><Link to="/mentors" className="nav__link">Mentors</Link></li>
      </ul>
    </nav>
  );
};

export default DashboardNav;
