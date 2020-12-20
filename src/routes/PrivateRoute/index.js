import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ children: Component, ...rest }) => (
    <Route {...rest} render={props => {
        if (!localStorage.getItem('jwt')) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }
        return <Component {...props} />
    }} />
);
export default PrivateRoute;