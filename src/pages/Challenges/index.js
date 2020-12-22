import './styles.scss';
import { useState, useEffect } from 'react';
import ChallengeItem from '../../components/ChallengeItem';
import DefaultChallengeItem from '../../components/DefaultChallengeItem';
import { baseUrl, fetchApi } from "../../utils/api";
import cs from 'classnames';

function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [isDefault, setIsDefault] = useState(false);
  const [activeTab, setActiveTab] = useState('current');
  const token = localStorage.getItem('jwt');

  const customChallenges = (archived) => {
    fetchApi(`${baseUrl}/api/v1/challenges?archived=${archived}`, {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(data => setChallenges(data))
    .catch(err => console.log(err.message));
  };

  const popularChallenges = () => {
    fetchApi(`${baseUrl}/api/v1/default-challenges?sort=popularity,desc`, {
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
      customChallenges(false);
      setIsDefault(false)
    } else if (activeTab === 'archived') {
      customChallenges(true);
      setIsDefault(false)
    } else {
      popularChallenges();
      setIsDefault(true);
    }
  }, [activeTab]);

  const onItemChange = () => {
    setActiveTab('current');
    customChallenges(false);
  }

  return (
    <>
      <h1>Challenges</h1>
      <div className="search">Search</div>
      <div className='filters'>
        <div className={cs('filters__option', {'active': activeTab === 'current'})} onClick={() => setActiveTab('current')}>
          Current
        </div>
        <div className={cs('filters__option', {'active': activeTab === 'archived'})} onClick={() => setActiveTab('archived')}>
          Archived
        </div>
        <div className={cs('filters__option', {'active': activeTab === 'popular'})} onClick={() => setActiveTab('popular')}>
          Popular
        </div>
      </div>
      <hr></hr>
      <div className='challenges'>{
        isDefault ?
        challenges.map((challenge) => <DefaultChallengeItem key={challenge.id} challenge={challenge} onItemChange={onItemChange} />) :
        challenges.map((challenge) => <ChallengeItem key={challenge.id} challenge={challenge} onItemChange={onItemChange} />)
      }</div>
    </>
  );
}
export default Challenges;
