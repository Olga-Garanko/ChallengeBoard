import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ children: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const current = window.localStorage.getItem("jwt");
        if (current) {
            return <Redirect to={{ pathname: '/challenges', state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
);
export default PublicRoute;