import './styles.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className="date">{new Date().toDateString()}</div>
      <div className="search">Search</div>
    </header>
  );
};

export default Header;