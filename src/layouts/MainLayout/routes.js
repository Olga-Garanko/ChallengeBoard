import { Route, Redirect } from 'react-router-dom';

import MainLayout from './index';

const MainLayoutRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            if (!localStorage.getItem('jwt')) {
            
                return <Redirect to={{ pathname: '/login' }} />
            }
            return (<MainLayout>
                <Component {...props} />
            </MainLayout>)
        }} />
    )
}

export default MainLayoutRoutes;