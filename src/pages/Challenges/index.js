import ChallengeItem from '../../components/ChallengeItem';
import './styles.scss';

const testData = [
  {
    _id: '1',
    name: 'Drink water',
    startDate: new Date(2020, 11, 12),
    goal: 5
  },
  {
    _id: '2',
    name: 'Walk with a dog',
    startDate: null,
    goal: 16
  },
  {
    _id: '3',
    name: 'Run 5 kilometers everyday',
    startDate: null,
    goal: 24
  },
  {
    _id: '4',
    name: 'Do something else',
    startDate: null,
    goal: 2
  }
];

function Challenges() {
  const challenges = testData.map((challenge) => {
    return (
      <ChallengeItem key={challenge._id} challenge={challenge} />
    );
  });
  return (
    <>
    <h1>Challenges</h1>
    <ul>
      <li>my</li>
      <li>archive</li>
      <li>default</li>
    </ul>
    <div className='challenges'>
      {challenges}
    </div>
    </>
  );
}
export default Challenges;
