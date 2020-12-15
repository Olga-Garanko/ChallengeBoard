import './App.css';

function App() {
  fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      "email": "test@test.ua",
      "password": "123",
      "role": "SHIPPER"
    })
  })
  .then(result => console.log(result));
  return (
    <div className="App">Hello</div>
  );
}

export default App;
