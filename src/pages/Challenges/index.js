import React, { useState, useEffect } from 'react';
import ChallengeItem from '../../components/ChallengeItem';
import './styles.scss';

const testData = [
  {
    id: '1',
    title: 'Drink water',
    startDate: new Date(2020, 11, 12),
    goal: 5,
    archived: false
  },
  {
    id: '2',
    title: 'Walk with a dog',
    startDate: null,
    goal: 16,
    archived: false
  },
  {
    id: '3',
    title: 'Run 5 kilometers everyday',
    startDate: null,
    goal: 24,
    archived: false
  },
  {
    id: '4',
    title: 'Do something else',
    startDate: null,
    goal: 2,
    archived: false
  },
  {
    id: '5',
    title: 'Archieved task 1',
    startDate: null,
    goal: 2,
    archived: true
  },
  {
    id: '6',
    title: 'Archieved task 2',
    startDate: null,
    goal: 2,
    archived: true
  }
];
const popularChallenges = [
  {
    id: '1',
    title: 'Popular 1',
    goal: 10,
    popularity: 1105
  },
  {
    id: '2',
    title: 'Popular 2',
    goal: 5,
    popularity: 220
  },
  {
    id: '3',
    title: 'Popular 3',
    goal: 14,
    popularity: 487
  }
];

function Challenges() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const initialChallenges = testData
      .filter((challenge) => {
        return challenge.archived === false;
      })
      .map((challenge) => {
        return <ChallengeItem key={challenge.id} challenge={challenge} />;
      });
    setChallenges(initialChallenges);
  }, []);

  const filterCurrent = () => {
    const filteredChallenges = testData
      .filter((challenge) => {
        return challenge.archived === false;
      })
      .map((challenge) => {
        return <ChallengeItem key={challenge.id} challenge={challenge} />;
      });
    setChallenges(filteredChallenges);
  };

  const filterArchived = () => {
    const filteredChallenges = testData
      .filter((challenge) => {
        return challenge.archived === true;
      })
      .map((challenge) => {
        return <ChallengeItem key={challenge.id} challenge={challenge} />;
      });
    setChallenges(filteredChallenges);
  };

  const filterPopular = () => {
    const filteredChallenges = popularChallenges
      .sort((prev, curr) => {
        return prev.popularity < curr.popularity ? 1 : -1;
      })
      .map((challenge) => {
        return <ChallengeItem key={challenge.id} challenge={challenge} />;
      });
    setChallenges(filteredChallenges);
  };

  return (
    <>
      <h1>Challenges</h1>
      <div className='filters'>
        <div className='filters__option' onClick={filterCurrent}>
          Current
        </div>
        <div className='filters__option' onClick={filterArchived}>
          Archived
        </div>
        <div className='filters__option' onClick={filterPopular}>
          Popular
        </div>
      </div>
      <hr></hr>
      <div className='challenges'>{challenges}</div>
    </>
  );
}
export default Challenges;
