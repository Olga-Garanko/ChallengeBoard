import { useState, useEffect } from 'react';
import './App.css';

function App() {
  let [result400, changeResult400] = useState('');
  let [result200, changeResult200] = useState('');
  useEffect(() => {
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        "email": "test10@test.ua",
        "password": "123",
        "role": "SHIPPER"
      })
    })
    .then(result => result.json())
    .then(result => changeResult400(result.message));
    fetch('/api/auth/test',
    {headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }})
    .then(result => result.json())
    .then(result => changeResult200(result.message));
  }, []);
  return (
    <div className="App">
      <p>Hello</p>
      <p>result200 { result200 }</p>
      <p>result400 { result400 }</p>
    </div>
  );
}

export default App;





