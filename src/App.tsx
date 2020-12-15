import './App.css';

function App() {
  fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-type': 'text/json'
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
