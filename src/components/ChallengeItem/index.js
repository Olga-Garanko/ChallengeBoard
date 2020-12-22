import './styles.scss';
import { useState } from 'react';
import { baseUrl, fetchApi } from "../../utils/api";
import cs from 'classnames';
import {Link} from "react-router-dom";

const ChallengeItem = ({
  challenge: { id, name: title, startDate, milestone: goal, status, lastAcceptDate: proofDate, archived },
  onItemChange
}) => {
  const [open, setOpen] = useState(false);

  const toggleChallenge = () => {
    setOpen(!open);
  }

  const formatDate = (date) => {
    const formatedDate = new Date(date);
    return `${formatedDate.getDate()}.${formatedDate.getMonth() + 1}.${formatedDate.getFullYear()}`
  }

  const lastDays = () => {
    if (!proofDate) return;
    let days = Math.floor((Date.now() - Date.parse(proofDate))/86400000);
    return days
  }

  const isProofButton = () => {
    const today = new Date().getDay();
    const proofDay = new Date(proofDate).getDay();
    return today !== proofDay ? true : false;
  }
  
  const onPatch = (type) => {
    const token = localStorage.getItem('jwt');
    let body;
    switch (type) {
      case 'archive':
        body = {archived: true}  
        break;
      case 'fail':
        body = {status: 'FAILED'}  
        break;
      default:
          body = {lastAcceptDate: new Date()}
    }
    fetchApi(`${baseUrl}/api/v1/challenges/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
    .then(() => onItemChange())
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
      .then(() => onItemChange())
      .catch((err) => console.log(err));
  };

  const onStart = () => {
    console.log('my challenge started')
  }

  return (
    <div className={cs('challenge', {'challenge_completed': status === 'FINISHED', 'challenge_failed': status === 'FAILED'})}>
      <div className='challenge__item' onClick={toggleChallenge}>
        <div className='challenge__name'>{title} - {goal} days</div>
        <button className="challenge__btn">{!open ? '+' : '-'}</button>
      </div>
      {open &&
        <div className='challenge__details'>
          <div className="challenge__header">
            <Link to={`/challenge/${id}`} className='details-link'>Details</Link>
            <button className='delete' onClick={deleteChallenge}>x</button>            
          </div>

          <p>Goal - {goal} days</p>
          {startDate && <p>Start Date - {formatDate(startDate)}</p>}
          <p>Proofed {lastDays()} day</p>
          <p>Left {goal - lastDays()} days</p>

          {
            status !== 'STARTED' &&
            <div className="challenge__footer">
              {!archived && <button className="challenge__btn" onClick={() => onPatch('archive')}>Archivate</button>}
              {archived && <button className="challenge__btn" onClick={onStart}>Start</button>}
              <div className={cs('status', {'success': status === 'SUCCESS', 'failed': status === 'FAILED'})}>{status}</div>
            </div>
          }

          {status === 'STARTED' &&
            <div className='challenge__buttons'>
              {isProofButton() && (
                <button className='challenge__btn' onClick={() => onPatch('proof')}>Proof</button>
              )}
              <button className='challenge__btn' onClick={() => onPatch('fail')}>Give up</button>              
            </div>
          }
        </div>
      }
    </div>
  );
};

export default ChallengeItem;
