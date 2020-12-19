import ChallengeItem from '../../components/ChallengeItem';
import './styles.scss';

const testData = [
  {
    description: 'Drink water',
    date: new Date(2020, 11, 12),
    goal: 5
  },
  {
    description: 'Walk with a dog',
    date: "5.12.2020",
    goal: 16
  },
  {
    description: 'Run 5 kilometers everyday',
    date: "14.12.2020",
    goal: 24
  },
  {
    description: 'Do something else',
    date: "2.12.2020",
    goal: 2
  }
];

function Challenges() {
  const challenges = testData.map((challenge) => {
    return (
      <ChallengeItem key={challenge.description} description={challenge.description} date={challenge.date} goal={challenge.goal}></ChallengeItem>
    );
  });
  return <div className='challenges'>{challenges}</div>;
}
export default Challenges;
