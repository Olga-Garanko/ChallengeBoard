import './styles.scss';
import { Component } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { baseUrl, fetchApi } from "../../utils/api";

class Registration extends Component {

    constructor() {
      super();
  
      this.state = {
        values: {
          username: "",
          email: '',
          password: '',            
        },
        errors: {
          username: false,
          email: false,
          password: false
        },
        submitting: false
      };
    };
  
    onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({
            values: {
                ...prevState.values,
                [name]: value
            },
            errors: {
                ...prevState.errors,
                [name]: null
            }
        }));
    };

    handleBlur = (event) => {
        const name = event.target.name;
        const errors = this.validateFields();
        if (errors[name]) {
          this.setState(prevState => ({
            errors: {
              ...prevState.errors,
              [name]: errors[name]
            }
          }));
        }
    };
    
    validateFields = () => {
        const errors = {};
        if (this.state.values.username === "") {
          errors.username = "Not empty";
        }
        if (this.state.values.email === "") {
          errors.email = "Not empty";
        } 
        if (this.state.values.password === "") {
          errors.password = "Not empty";
        }  
        return errors;
    };

    onSubmit = () => {
        this.setState({
          submitting: true
        });
        fetchApi(`${baseUrl}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email: this.state.values.email,
                password: this.state.values.password
            })
        })
        .then(data => data.json())
        .then(data => console.log(data))
        .catch(data => console.log(data))
        //   .then(data => {
        //     return fetchApi("/api/auth", {

        //     });
        //   })
        //   .then(user => {
        //     console.log('user', user);
        //     this.setState({
        //       submitting: false
        //     });
        //   })
        //   .catch(error => {
        //     console.log("error", error);
        //     this.setState({
        //       submitting: false,
        //       errors: {
        //         base: error.status_message
        //       }
        //     });
        //   });
    };
    
    onLogin = () => {
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
          this.setState(prevState => ({
            errors: {
              ...prevState.errors,
              ...errors
            }
          }));
        } else {
          this.onSubmit();
        }
    };
  
    render() {
        const { values: {username, email, password}, errors, submitting } = this.state;
        return (
          <div className="registration">
            <div className="wrapper">
              <h1>Registration</h1>
              <div className="form-group">
                <Input
                  type="text"
                  className="input"
                  labelText="Username"
                  id="username"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={this.onChange}
                  onBlur={this.handleBlur}
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
                  onChange={this.onChange}
                  onBlur={this.handleBlur}
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
                  onChange={this.onChange}
                  onBlur={this.handleBlur}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              <Button
                type="button"
                className="btn"
                onClick={this.onLogin}
                disabled={submitting}
              >
                Вход
              </Button>
              {errors.base && (
                <div className="invalid-feedback text-center">{errors.base}</div>
              )}              
            </div>
          </div>
        );
      }
  }
export default Registration;