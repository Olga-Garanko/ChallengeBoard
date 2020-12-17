import './styles.scss';
import {
  Link
} from "react-router-dom";

function Home() {
    return (
    	<div>
	    	<h2>Home</h2>
	        <nav>
	          <ul>
	            <li>
	              <Link to="/login">Login</Link>
	            </li>
	            <li>
	              <Link to="/registration">Registration</Link>
	            </li>
	          </ul>
	        </nav>
        </div>
   	);
}
export default Home;