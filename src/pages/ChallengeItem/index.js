import './styles.scss';
import { useEffect, useState } from 'react';
import { baseUrl, fetchApi } from '../../utils/api';

const ChallengeItem = (props) => {
  const [challenge, setChallenge] = useState({});

  useEffect(() => {
    const id = props.match.params.id;
    const token = localStorage.getItem('jwt');
    fetchApi(`${baseUrl}/api/v1/challenges/${id}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`
      }
    })
    .then(data => setChallenge(data))
    .catch(err => console.log(err.message));
  }, []);

  const generateDays = () => {
    const generatedDays = [];
    for (let i = 0; i < challenge.milestone; i++) {
      const element = (
        <div key={i} className='day-item'>
          {i + 1}
        </div>
      );
      generatedDays.push(element);
    }
    return generatedDays;
  };

  const formatDate = (date) => {
    const formatedDate = new Date(date);
    return `${formatedDate.getDate()}.${formatedDate.getMonth() + 1}.${formatedDate.getFullYear()}`;
  };

  return (
    <div>    
    {challenge.id &&
      <>
      <h2>{challenge.name}</h2>
      <div>
        <p>Goal - {challenge.milestone} days</p>
        <p>Start date: {formatDate(challenge.startDate)}</p>
        <div className='days-container'>{generateDays()}</div>
      </div>
      </>    
    }
  </div>
  );
}
export default ChallengeItem;
