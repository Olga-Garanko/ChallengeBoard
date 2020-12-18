import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainLayoutRoutes from './layouts/MainLayout/routes';
import PublicLayoutRoutes from './layouts/PublicLayout/routes';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Challenges from './pages/Challenges';
import EditChallengeItem from './pages/EditChallengeItem'

function App() {
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
          <PrivateRoute path="/challenges">
            <MainLayoutRoutes exact path="/challenges" component={Challenges} />
          </PrivateRoute>
          <PrivateRoute path="/edit-challenge/:id">
            <MainLayoutRoutes path="/edit-challenge/:id?" component={EditChallengeItem} />
          </PrivateRoute>
        </Switch>
    </Router>
  );
}

export default App;
