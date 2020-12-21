import './styles.scss';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import ChallengeItem from '../../components/ChallengeItem'
import { baseUrl, fetchApi } from '../../utils/api';

const CreateChallenge = () => {
  const history = useHistory();
  const token = localStorage.getItem('jwt');
  const [values, setValues] = useState({ title: '', goal: '' });
  const [challenges, setChallenges] = useState([]);
  const [errors, setErrors] = useState({ title: false, goal: false });
  const [submitting, setSubmitting] = useState(false);
  const [response, setResponse] = useState('');

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: null });
  };

  useEffect(() => {
    getPopularChallenges();
  }, []);

  const validateFields = () => {
    const errors = {};
    if (values.title === '') {
      errors.title = 'Not empty';
    }
    if (values.goal === '') {
      errors.goal = 'Not empty';
    }
    return errors;
  };

  const handleBlur = (event) => {
    const name = event.target.name;
    const errors = validateFields();
    if (errors[name]) {
      setErrors({ ...errors, [name]: errors[name] });
    }
  };

  const getPopularChallenges = () => {
    fetchApi(`${baseUrl}/api/v1/default-challenges`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(result => setChallenges(result.data))
    .catch(err => console.log(err.message));
  };

  const onSubmit = () => {
    const token = localStorage.getItem('jwt');
    setSubmitting(true);
    fetchApi(`${baseUrl}/api/v1/challenges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: values.title,
        milestone: values.goal
      })
    })
      .then((data) => {
        console.log(data);
        history.push('/challenges');
      })
      .catch((err) => {
        setResponse(err.message);
      })
      .finally(() => setSubmitting(false));
  };

  const onLogin = () => {
    console.log(values, errors);
    setResponse('');
    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...errors, ...newErrors });
    } else {
      onSubmit();
    }
  };

  const { title, goal } = values;
  return (
    <>
      <h1>Create Challenge</h1>
      <div className='form'>
        {response && <div class='response'>{response}</div>}
        <div className='form-group'>
          <Input
            type='text'
            className='input'
            labelText='Title'
            id='title'
            placeholder='Title'
            name='title'
            value={title}
            onChange={onChange}
            onBlur={handleBlur}
          />
          {errors.title && <div className='invalid-feedback'>{errors.title}</div>}
        </div>
        <div className='form-group'>
          <Input
            type='number'
            className='input'
            labelText='Goal (days)'
            id='goal'
            placeholder='Goal (days)'
            name='goal'
            value={goal}
            onChange={onChange}
            onBlur={handleBlur}
          />
          {errors.goal && <div className='invalid-feedback'>{errors.goal}</div>}
        </div>
        <Button type='button' className='btn' onClick={onLogin} disabled={submitting}>
          Submit
        </Button>
      </div>
      <div className='deafault-challenges'>
          {challenges.map((challenge) => <ChallengeItem key={challenge._id} challenge={challenge} onChange={onChange} />)}
      </div>
    </>
  );
};
export default CreateChallenge;
