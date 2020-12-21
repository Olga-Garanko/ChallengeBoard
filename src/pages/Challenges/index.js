import './styles.scss';
import { useState, useEffect } from 'react';
import ChallengeItem from '../../components/ChallengeItem';
import { baseUrl, fetchApi } from "../../utils/api";

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
  const [activeTab, setActiveTab] = useState('current');
  const token = localStorage.getItem('jwt');
  const currentChallenges = () => {
    fetchApi(`${baseUrl}/api/challenges/?status=created`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(data => setChallenges(data.challenges))
    .catch(err => console.log(err.message));
  };

  const archivedChallenges = () => {
    fetchApi(`${baseUrl}/api/challenges/?status=archived`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(data => setChallenges(data.challenges))
    .catch(err => console.log(err.message));
  };

  const popularChallenges = () => {
    fetchApi(`${baseUrl}/api/challenges/popular`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(data => setChallenges(data.challenges))
    .catch(err => console.log(err.message));
  };

  useEffect(() => {
    if (activeTab === 'current') {
      currentChallenges();
    } else if (activeTab === 'archived') {
      archivedChallenges();
    } else {
      popularChallenges()
    }
  }, [activeTab]);
  const onChange = () => {
    currentChallenges();
  }

  return (
    <>
      <h1>Challenges</h1>
      <div className='filters'>
        <div className='filters__option' onClick={() => setActiveTab('current')}>
          Current
        </div>
        <div className='filters__option' onClick={() => setActiveTab('archived')}>
          Archived
        </div>
        <div className='filters__option' onClick={() => setActiveTab('popular')}>
          Popular
        </div>
      </div>
      <hr></hr>
      <div className='challenges'>{
        challenges.map((challenge) => <ChallengeItem key={challenge._id} challenge={challenge} onChange={onChange} />)
      }</div>
    </>
  );
}
export default Challenges;
