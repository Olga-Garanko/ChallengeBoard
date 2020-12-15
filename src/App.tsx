import './App.css';

function App() {
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
  // fetch('/api/auth/test',
  // {headers: {
  //   'Content-Type': 'application/json;charset=utf-8'
  // }})
  // .then(result => result.json())
  // .then(result => console.log(result));
  return (
    <div className="App">Hello</div>
  );
}

export default App;
