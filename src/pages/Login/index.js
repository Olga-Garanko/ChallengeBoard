import './styles.scss';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { baseUrl, fetchApi } from "../../utils/api";

const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({email: 'email3@gmail.com', password: 'DenisPass1'});
  const [errors, setErrors] = useState({email: false, password: false});
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
    setSubmitting(true);
    fetchApi(`${baseUrl}/api/v1/users/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
          username: values.email,
          password: values.password
      })
    })
    .then(async data => {
        await localStorage.setItem('jwt', data.jwt);
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
  
  const { email, password} = values;
    return (
      <div className="login">
        <div className="wrapper">
          <h1>Login</h1>
          {response && 
            <div class="response">{response}</div>
          }
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
export default Login;