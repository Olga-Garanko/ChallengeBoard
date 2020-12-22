import './styles.scss';
import {
    Link
  } from "react-router-dom";

const PublicLayout = ({children}) => {
    return (
      <div className="public-layout theme-is-white">
        <main className="main">
          <header className="header">
            <Link to='/' className="logo">ChallengeOn</Link>
          </header>
          <div className="content">
            {children}
          </div>
        </main>        
      </div>
    )
}

export default PublicLayout;