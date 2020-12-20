import './styles.scss';
import UserInfo from '../../components/UserInfo';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';

const MainLayout = ({ children }) => {
  return (
    <div className='main-layout'>
      <div className='wrapper'>
        <aside className='aside'>
          <div className="logo">ChallengeOn</div>
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
