import './styles.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { baseUrl, fetchApi } from '../../utils/api';

const ChallengeItem = ({
  challenge: { id, name: title, startDate, milestone: goal, lastAcceptDate: proofDate },
  onChange
}) => {
  const [open, setOpen] = useState(false);

  const toggleChallenge = () => {
    setOpen(!open);
  };
  const formatDate = (date) => {
    const formatedDate = new Date(date);
    return `${formatedDate.getDate()}.${formatedDate.getMonth() + 1}.${formatedDate.getFullYear()}`
  }
  const lastDays = () => {
    if (!proofDate) return;
    const days = Math.ceil((Date.now() - Date.parse(proofDate)) / 86400000);
    return days;
  };
  const onProof = () => {
    const token = localStorage.getItem('jwt');
    fetchApi(`${baseUrl}/api/v1/challenges/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        lastAcceptDate: new Date()
      })
    })
      .then((data) => {
        console.log(data.message);
        proofDate = new Date();
        onChange();
      })
      .catch((err) => console.log(err.message));
  };

  const deleteChallenge = () => {
    const token = localStorage.getItem('jwt');
    fetchApi(`${baseUrl}/api/v1/challenges/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setOpen(!open);
        onChange();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={cs('challenge', {'challenge_completed': status === 'FINISHED'})}>
      <div className='challenge__item'>
        <div onClick={toggleChallenge} className='challenge__name'>
          {title} - {goal} days
        </div>
        <button onClick={toggleChallenge} className='challenge__btn'>
          {!open ? '+' : '-'}
        </button>
      </div>
      {open && (
        <div className='challenge__details'>
          <p>Goal - {goal} days</p>
          {startDate && (
            <>
              <p>Start Date - {formatDate(startDate)}</p>
              {proofDate && (
                <>
                  <p>Proofed {lastDays()} day</p>
                  <p>Left {goal - lastDays()} days</p>
                </>
              )}
              {!proofDate && <p>There is no proofed days</p>}
            </>
          )}

          <div className='btn-group'>
            {!(Date.now() - Date.parse(proofDate) < 86400000) && (
              <button className='challenge__btn' onClick={onProof}>
                Proof
              </button>
            )}
            <Link to={`/challenge/${id}`} className='details-link'>
              Details
            </Link>
            <button className='challenge__btn'>Give up</button>
            <button className='delete__btn' onClick={deleteChallenge}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeItem;
