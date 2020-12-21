import './styles.scss';
import { useState, useEffect } from 'react';
import ChallengeItem from '../../components/ChallengeItem';
import DefaultChallengeItem from '../../components/DefaultChallengeItem';
import { baseUrl, fetchApi } from "../../utils/api";

function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [isDefault, setIsDefault] = useState(false);
  const [activeTab, setActiveTab] = useState('current');
  const token = localStorage.getItem('jwt');
  const currentChallenges = () => {
    fetchApi(`${baseUrl}/api/v1/challenges?archived=false`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(data => setChallenges(data))
    .catch(err => console.log(err.message));
  };

  const archivedChallenges = () => {
    fetchApi(`${baseUrl}/api/v1/challenges?archived=true`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(data => setChallenges(data))
    .catch(err => console.log(err.message));
  };

  const popularChallenges = () => {
    fetchApi(`${baseUrl}/api/v1/default-challenges`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(result => setChallenges(result.data))
    .catch(err => console.log(err.message));
  };

  useEffect(() => {
    if (activeTab === 'current') {
      currentChallenges();
      setIsDefault(false)
    } else if (activeTab === 'archived') {
      archivedChallenges();
      setIsDefault(false)
    } else {
      popularChallenges();
      setIsDefault(true);
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
        isDefault ?
        challenges.map((challenge) => <DefaultChallengeItem key={challenge.id} challenge={challenge} onChange={onChange} />) :
        challenges.map((challenge) => <ChallengeItem key={challenge.id} challenge={challenge} onChange={onChange} />)
      }</div>
    </>
  );
}
export default Challenges;
