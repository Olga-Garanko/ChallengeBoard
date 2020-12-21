import './styles.scss';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { baseUrl, fetchApi } from "../../utils/api";

const Registration = () => {
  const history = useHistory();
  const [values, setValues] = useState({username: '', email: '', password: ''});
  const [errors, setErrors] = useState({username: false, email: false, password: false});
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState('');
  
  const onChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: null});
  };
  const validateFields = () => {
    const errors = {};
    if (values.username === "") {
      errors.username = "Not empty";
    } 
    if (values.email === "") {
      errors.email = "Not empty";
    }
    const emailRegExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
    if (!emailRegExp.test(values.email)) {
      errors.email = 'Must be symbol @ and 2 symbol after dot';
    }
    if (values.password === "") {
      errors.password = "Not empty";
    }
    if (values.password.length < 8) {
      errors.password = "At least 8 symbols";
    } 
    return errors;
  };
  const handleBlur = (event) => {
      const name = event.target.name;
      const errors = validateFields();
      if (errors[name]) {
        setErrors({...errors, [name]: errors[name]});
      }
  };
  
  const onSubmit = () => {
    console.log('onSubmit')
    setSubmitting(true);
    fetchApi(`${baseUrl}/api/v1/users/registration`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password
      })
    })
    .then(() => {
      return fetchApi(`${baseUrl}/api/v1/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            username: values.email,
            password: values.password
        })
      })
    })
    .then(data => {
        localStorage.setItem('jwt', data.jwt);
        return fetchApi(`${baseUrl}/api/v1/users/me`, {
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${data.jwt}`
          }
        })
    })
    .then(user => {
      localStorage.setItem('user', user);
      history.push('/challenges')  
    })
    .catch(err => {
      setResponse(err.message);
    })
    .finally(() => setSubmitting(false))
  };
  
  const onLogin = () => {
      setResponse('');
      const newErrors = validateFields();
      if (Object.keys(newErrors).length > 0) {
        setErrors({...errors, ...newErrors});
      } else {
        onSubmit();
      }
  };
  
  const { username, email, password} = values;
    return (
      <div className="login">
        <div className="wrapper">
          <h1>Registration</h1>
          {response && 
            <div class="response">{response}</div>
          }
          <div className="form-group">
            <Input
              type="text"
              className="input"
              labelText="Username"
              id="username"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              onBlur={handleBlur}
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>
          <div className="form-group">
            <Input
              type="text"
              className="input"
              labelText="Email"
              id="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              onBlur={handleBlur}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
          <div className="form-group">
            <Input
              type="password"
              className="input"
              labelText="Password"
              id="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              onBlur={handleBlur}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <Button
            type="button"
            className="btn"
            onClick={onLogin}
            disabled={submitting}
          >
            Submit
          </Button>             
        </div>
      </div>
    );
  }
export default Registration;