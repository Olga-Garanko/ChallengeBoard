import { useState } from 'react';
import './styles.scss';

const ChallengeItem = ({ challenge: { description, date, goal }}) => {
  const [open, setOpen] = useState(false);

  const toggleChallenge = () => {
    setOpen(!open);
  };

  if (!open) {
    return (
      <div className='challenge'>
        <div className='challenge__item'>
          <div className='challenge__item__description'>{description} - {goal} days</div>
          <button onClick={toggleChallenge} className="challenge__item__btn">Show details</button>
        </div>
      </div>
    );
  } else {
    return (
      <div className='challenge'>
        <div className='challenge__item'>
          <div className='challenge__item__description'>{description} - {goal} days</div>
          <button onClick={toggleChallenge} className="challenge__item__btn">Hide details</button>
        </div>
        <div className="challenge__details">
          <p>Goal - {goal} days</p>
          <p>Today is "toBeCalculated" day of challenge</p>
          <p>Left "toBeCalculated" days</p>
          <p>Start Date - {date.toLocaleString()}</p>
        </div>
      </div>
    );
  }
};

export default ChallengeItem;
