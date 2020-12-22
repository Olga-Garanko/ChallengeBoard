import './styles.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className="date">{new Date().toDateString()}</div>
    </header>
  );
};

export default Header;