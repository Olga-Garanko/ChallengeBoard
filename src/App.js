import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import MainLayoutRoutes from './layouts/MainLayout/routes.js';
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
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/challenges">
            <MainLayoutRoutes exact path="/challenges" component={Challenges} />
          </Route>
          <Route path="/edit-challenge/:id">
            <MainLayoutRoutes path="/edit-challenge/:id" component={EditChallengeItem} />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
