import './styles.scss';
import {
  Link
} from "react-router-dom";

function Home() {
    return (
			<div className="general-info">
				<p className="motivational-phrase">Build Golden Habits, Unlock your Potential</p>
				<p className="invitation">Hello! Do you want to Improve yourself and track your habits? Let's get acquainted!</p>
				<div className="nav-links">
					<Link to='/login' className="btn">Sign In</Link>
					<Link to='/registration' className="btn">Sign Up</Link>
				</div>
			</div>
   	);
}
export default Home;