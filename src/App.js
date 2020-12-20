import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainLayoutRoutes from './layouts/MainLayout/routes';
import PublicLayoutRoutes from './layouts/PublicLayout/routes';
import PrivateRoute from './routes/PrivateRoute';
//import PublicRoute from './routes/PublicRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import Challenges from './pages/Challenges';
import ChallengeItem from './pages/ChallengeItem';
import EditChallengeItem from './pages/EditChallengeItem'

const App = () => {
  return (
    <Router>
      <Switch>
          <Route exact path="/">
            <PublicLayoutRoutes exact path="/" component={Home} />
          </Route>
          <Route path="/login">
            <PublicLayoutRoutes exact path="/login" component={Login} />
          </Route>
          <Route path="/registration">
            <PublicLayoutRoutes exact path="/registration" component={Registration} />
          </Route>
          <Route path="/profile">
            <MainLayoutRoutes exact path="/profile" component={Profile} />
          </Route>          
          <Route path="/challenges">
            <MainLayoutRoutes exact path="/challenges" component={Challenges} />
          </Route>
          <Route path="/challenge/:id">
            <MainLayoutRoutes path="/challenge/:id" component={ChallengeItem} />
          </Route>
          <PrivateRoute path="/edit-challenge/:id?">
            <MainLayoutRoutes path="/edit-challenge/:id?" component={EditChallengeItem} />
          </PrivateRoute>
        </Switch>
    </Router>
  );
}

export default App;
