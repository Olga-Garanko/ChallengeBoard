import './styles.scss';
import { useState } from 'react';
import {Link} from "react-router-dom";
import { baseUrl, fetchApi } from "../../utils/api";
import cs from 'classnames';

const ChallengeItem = ({ challenge: { id: _id, name: title, status, startDate, milestone: goal, lastAcceptDate: proofDate }, onChange}) => {
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
  const onProof = () => {
    const token = localStorage.getItem('jwt');
    fetchApi(`${baseUrl}/api/v1/challenges/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        lastAcceptDate: new Date()
      })
    })
    .then(data => {
      console.log(data.message); proofDate = new Date();
      onChange();
    })
    .catch(err => console.log(err.message)); 
  }
  return (
    <div className={cs('challenge', {'challenge_completed': status === 'FINISHED'})}>
      <div className='challenge__item'>
        <Link to={`/challenge/${_id}`} className='challenge__name'>{title} - {goal} days</Link>
        <button onClick={toggleChallenge} className="challenge__btn">{!open ? '+' : '-'}</button>
      </div>
      {
        open &&
        <div className="challenge__details">
          <p>Goal - {goal} days</p>
          {startDate && 
          <>
            <p>Start Date - {formatDate(startDate)}</p>
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
          {!((Date.now() - Date.parse(proofDate)) < 86400000) &&
            <button className="challenge__btn" onClick={onProof}>Proof</button>
          }
          <button className="challenge__btn">Give up</button>
          
        </div>        
      }
    </div>
  );
};

export default ChallengeItem;
