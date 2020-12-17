import { useState, useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';

function App() {
  // let [result400, changeResult400] = useState('');
  // let [result200, changeResult200] = useState('');
  // useEffect(() => {
  //   fetch('/api/auth/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json;charset=utf-8'
  //     },
  //     body: JSON.stringify({
  //       "email": "test10@test.ua",
  //       "password": "123",
  //       "role": "SHIPPER"
  //     })
  //   })
  //   .then(result => result.json())
  //   .then(result => changeResult400(result.message));
  //   fetch('/api/auth/test',
  //   {headers: {
  //     'Content-Type': 'application/json;charset=utf-8'
  //   }})
  //   .then(result => result.json())
  //   .then(result => changeResult200(result.message));
  // }, []);
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/chalenges">Challenges</Link>
            </li>
          </ul>
        </nav>
      {/* <p>result200 { result200 }</p>
      <p>result400 { result400 }</p> */}
      <Switch>
          <Route path="/chalenges">
            <Chalenges />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


function Chalenges() {
  return <h2>Chalenges</h2>;
}

export default App;





