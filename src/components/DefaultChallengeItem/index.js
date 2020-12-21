import './styles.scss';
import { useState } from 'react';
import { baseUrl, fetchApi } from '../../utils/api';

const DefaultChallengeItem = ({
  challenge: { id, name: title, startDate, milestone: goal, popularity },
  onChange
}) => {
  const [open, setOpen] = useState(false);

  const toggleChallenge = () => {
    setOpen(!open);
  };

  return (
    <div className={'challenge'}>
      <div className='challenge__item' onClick={toggleChallenge}>
        <div className='challenge__name'>
          {title} - {goal} days
        </div>
        <button className='challenge__btn'>{!open ? '+' : '-'}</button>
      </div>
      {open && (
        <div className='challenge__details'>
          <p>Goal - {goal} days</p>

          <div className='btn-group'>
            <button className='challenge__btn'>Start</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultChallengeItem;
