import './styles.scss';
import { useState } from 'react';
import { baseUrl, fetchApi } from '../../utils/api';

const DefaultChallengeItem = ({
  challenge: { id, name, milestone, popularity }, onChange}) => {
  const [open, setOpen] = useState(false);

  const toggleChallenge = () => {
    setOpen(!open);
  };

  const onStart = () => {
    const token = localStorage.getItem('jwt');
    fetchApi(`${baseUrl}/api/v1/default-challenges/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => onChange())
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={'challenge'}>
      <div className='challenge__item' onClick={toggleChallenge}>
        <div className='challenge__name'>
          {name} - {milestone} days
        </div>
        <button className='challenge__btn'>{!open ? '+' : '-'}</button>
      </div>
      {open && (
        <div className='challenge__details'>
          <div className="challenge__header">
            <div>Goal - {milestone} days</div>
            <div className="challenge__popularity">Popularity: {popularity}</div>
          </div>
          <button className='challenge__btn' onClick={onStart}>Start</button>
        </div>
      )}
    </div>
  );
};

export default DefaultChallengeItem;
