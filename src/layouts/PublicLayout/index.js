import './styles.scss';
import {
    Link
  } from "react-router-dom";

const PublicLayout = ({children}) => {
    return (
        <main className="main">
			<div className="container">
				<header className="header">
					<Link to='/' className="header-logo">HabitOn</Link>
				</header>
                {children}
			</div>			
		</main>
    )
}

export default PublicLayout;