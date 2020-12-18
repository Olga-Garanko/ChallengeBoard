import './styles.scss';
import {Link} from "react-router-dom";

function Home() {
    return (
			<div className="home">
				<div className="wrapper">
					<h1 className="home__title">Build Golden Habits, Unlock your Potential</h1>
					<p className="home__text">Hello! Do you want to Improve yourself and track your habits? Let's get acquainted!</p>
					<div className="home__links">
						<Link to='/login' className="btn">Sign In</Link>
						<Link to='/registration' className="btn">Sign Up</Link>
					</div>
				</div>
			</div>
   	);
}
export default Home;