import './styles.scss';
import { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { baseUrl, fetchApi } from "../../utils/api";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({email: 'test10@test.ua', password: '123'});
  const [errors, setErrors] = useState({email: false, password: false});
  const [submitting, setSubmitting] = useState(false);
  
  const onChange = (event) => {
      console.log(values, errors)
      const name = event.target.name;
      const value = event.target.value;
      setValues({...values, [name]: value});
      setErrors({...errors, [name]: null});
      console.log('onChange', values, errors)
  };
  const validateFields = () => {
    const errors = {};
    if (values.email === "") {
      errors.email = "Not empty";
    } 
    if (values.password === "") {
      errors.password = "Not empty";
    }  
    return errors;
  };
  const handleBlur = (event) => {
      const name = event.target.name;
      const errors = validateFields();
      if (errors[name]) {
        setErrors({...errors, [name]: errors[name]});
      }
      console.log('handleBlur', values, errors)
  };
  
  const onSubmit = () => {
    console.log('onSubmit')
    setSubmitting(true);
    fetchApi(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
          email: values.email,
          password: values.password
      })
    })
    .then(data => {
        localStorage.setItem('jwt', data.jwt_token);
        return fetchApi(`${baseUrl}/api/users/me`, {
          headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'Authorization': `Bearer ${data.jwt_token}`
          }
        })
    })
    .then(user => {
      localStorage.setItem('username', user);
      history.push('/challenges')  
    })
    .catch(err => console.log(err))
    .finally(() => setSubmitting(false))
  };
  
  const onLogin = () => {
      const newErrors = validateFields();
      if (Object.keys(newErrors).length > 0) {
        setErrors({...errors, ...newErrors});
        console.log('onLogin', values, errors)
      } else {
        console.log('onLogin', 'values', values, 'errors', errors)
        onSubmit();
      }
  };
  
  const { email, password} = values;
    return (
      <div className="login">
        <div className="wrapper">
          <h1>Login</h1>
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
              labelText="Пароль"
              id="password"
              placeholder="Пароль"
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
            Вход
          </Button>             
        </div>
      </div>
    );
  }
export default Login;