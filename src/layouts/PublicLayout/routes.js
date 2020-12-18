import { Route } from 'react-router-dom';

import PublicLayout from './index';

const PublicLayoutRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            <PublicLayout>
                <Component {...props} />
            </PublicLayout>
        )} />
    )
}

export default PublicLayoutRoutes;