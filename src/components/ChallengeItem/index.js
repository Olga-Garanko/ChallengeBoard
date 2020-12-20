import './styles.scss';
import { useState } from 'react';
import {Link} from "react-router-dom";

const ChallengeItem = ({ challenge: { id, name, startDate, goal }}) => {
  const [open, setOpen] = useState(false);

  const toggleChallenge = () => {
    setOpen(!open);
  };

  return (
    <div className='challenge'>
      <div className='challenge__item'>
        <Link to={`/challenge/${id}`} className='challenge__name'>{name} - {goal} days</Link>
        <button onClick={toggleChallenge} className="challenge__btn">{!open ? '+' : '-'}</button>
      </div>
      {
        open &&
        <div className="challenge__details">
          <p>Goal - {goal} days</p>


          {startDate && 
          <>
            <p>Start Date - {startDate.toLocaleString()}</p>
            <p>Today is "toBeCalculated" day of challenge</p>
            <p>Left "toBeCalculated" days</p>
          </>
          }
          {!startDate ?
            <button className="challenge__btn">Start</button> :
            <button className="challenge__btn">Give up</button>
          }
          
        </div>        
      }
    </div>
  );
};

export default ChallengeItem;
