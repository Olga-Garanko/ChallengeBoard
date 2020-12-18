import './styles.scss';
import {
  Link
} from "react-router-dom";

function Home() {
    return (
        <main className="main">
			<div className="container">
				<header className="header">
					<Link to='/' className="header-logo">HabitOn</Link>
				</header>
				<div className="general-info">
					<p className="motivational-phrase">Build Golden Habits, Unlock your Potential</p>
					<p className="invitation">Hello! Do you want to Improve yourself and track your habits? Let's get acquainted!</p>
					<div className="nav-links">
						<Link to='/login' className="btn">Sign In</Link>
						<Link to='/registration' className="btn">Sign Up</Link>
					</div>

				</div>
			</div>			
		</main>
   	);
}
export default Home;