import './styles.scss';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { baseUrl, fetchApi } from "../../utils/api";

const CreateChallenge = () => {
const history = useHistory();
const [values, setValues] = useState({title: '', goal: ''});
const [errors, setErrors] = useState({title: false, goal: false});
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
    if (values.title === "") {
        errors.title = "Not empty";
    } 
    if (values.goal === "") {
        errors.goal = "Not empty";
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
    const token = localStorage.getItem('jwt');
    setSubmitting(true);
    fetchApi(`${baseUrl}/api/challenges`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        title: values.title,
        goal: values.goal
    })
    })
    .then(data => {
        console.log(data)
        history.push('/challenges')
    })
    .catch(err => {
        setResponse(err.message);
    })
    .finally(() => setSubmitting(false))
};

const onLogin = () => {
    console.log(values, errors)
    setResponse('');
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
        setErrors({...errors, ...newErrors});
    } else {
        onSubmit();
    }
};

const { title, goal } = values;
    return (
    <div className="login">
        <div className="wrapper">
        <h1>Create Challenge</h1>
        {response && 
            <div class="response">{response}</div>
        }
        <div className="form-group">
            <Input
            type="text"
            className="input"
            labelText="Title"
            id="title"
            placeholder="Title"
            name="title"
            value={title}
            onChange={onChange}
            onBlur={handleBlur}
            />
            {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
            )}
        </div>
        <div className="form-group">
            <Input
            type="number"
            className="input"
            labelText="Goal (days)"
            id="goal"
            placeholder="Goal (days)"
            name="goal"
            value={goal}
            onChange={onChange}
            onBlur={handleBlur}
            />
            {errors.goal && (
            <div className="invalid-feedback">{errors.goal}</div>
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
export default CreateChallenge;