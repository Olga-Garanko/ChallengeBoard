import './styles.scss';
import UserInfo from '../../components/UserInfo';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import {Link} from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div className='main-layout'>
      <div className='wrapper'>
        <aside className='aside'>
          <Link to="/" className="logo">ChallengeOn</Link>
          <UserInfo />
          <Navbar />
        </aside>
        <main className='dashboard'>
          <Header />
          <div id='content'>{children}</div>
        </main>
      </div>      
    </div>

  );
};

export default MainLayout;
