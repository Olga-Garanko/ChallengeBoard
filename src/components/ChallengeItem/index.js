import './styles.scss';
import { useState } from 'react';
import { baseUrl, fetchApi } from "../../utils/api";
import cs from 'classnames';
import {Link} from "react-router-dom";

const ChallengeItem = ({
  challenge: { id, name: title, startDate, milestone: goal, status, lastAcceptDate: proofDate },
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
    const days = Math.ceil((Date.now() - Date.parse(proofDate))/86400000);
    return days
  }
  
  const onPatch = (type) => {
    const token = localStorage.getItem('jwt');
    let body;
    switch (type) {
      case 'proof':
        body = {lastAcceptDate: new Date()}  
        break;
        case 'archive':
          body = {archived: true}  
          break;
        case 'fail':
          body = {status: 'FAILED'}  
          break;
    }
    fetchApi(`${baseUrl}/api/v1/challenges/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    .then(() => onChange())
    .catch(err => console.log(err.message)); 
  }

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
      <div className='challenge__item' onClick={toggleChallenge}>
        <div className='challenge__name'>{title} - {goal} days</div>
        <button className="challenge__btn">{!open ? '+' : '-'}</button>
      </div>
      {open &&
        <div className='challenge__details'>
          <p>Goal - {goal} days</p>
          {startDate && <p>Start Date - {formatDate(startDate)}</p>}
          {
          <>
            {status === 'FINISHED' && <button className="challenge__btn" onClick={() => onPatch('archive')}>Archivate</button>}
            {
              proofDate &&
              <>
              <p>Proofed {lastDays()} day</p>
              <p>Left {goal - lastDays()} days</p>                
              </>
            }
            {
              !proofDate &&
              <p>There is no proofed days</p>
            }
          </>
          }
          <div className='btn-group'>
            {!(Date.now() - Date.parse(proofDate) < 86400000) && (
              <button className='challenge__btn' onClick={() => onPatch('proof')}>
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
      }
    </div>
  );
};

export default ChallengeItem;
