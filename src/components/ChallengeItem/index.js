import './styles.scss';
import { useState } from 'react';
import {Link} from "react-router-dom";
import { baseUrl, fetchApi } from "../../utils/api";

const ChallengeItem = ({ challenge: { _id, title, startDate, goal, proofDate }}) => {
  const [open, setOpen] = useState(false);

  const toggleChallenge = () => {
    setOpen(!open);
  };
  const formatDate = (date) => {
    const formatedDate = new Date(date);
    return `${formatedDate.getDate() + 1}.${formatedDate.getMonth() + 1}.${formatedDate.getFullYear()}`
  }
  const lastDays = () => {
    if (!proofDate) return;
    const days = Math.ceil((Date.now() - Date.parse(proofDate))/86400000);
    return days
  }
  const onProof = () => {
    const token = localStorage.getItem('jwt');
    fetchApi(`${baseUrl}/api/challenges/${_id}/proof`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(data => {console.log(data.message); proofDate = new Date();})
    .catch(err => console.log(err.message)); 
  }
  return (
    <div className='challenge'>
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
