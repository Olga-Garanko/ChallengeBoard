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
import CreateChallenge from './pages/CreateChallenge';
import Mentors from './pages/Mentors';
import Progress from './pages/Progress';

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
          <MainLayoutRoutes exact path="/profile" component={Profile} />       
          <MainLayoutRoutes exact path="/challenges" component={Challenges} />
          <MainLayoutRoutes path="/challenge/:id" component={ChallengeItem} />
          <MainLayoutRoutes path="/create-challenge" component={CreateChallenge} />
          <MainLayoutRoutes path="/progress" component={Progress} />
          <MainLayoutRoutes path="/mentors" component={Mentors} />
        </Switch>
    </Router>
  );
}

export default App;
