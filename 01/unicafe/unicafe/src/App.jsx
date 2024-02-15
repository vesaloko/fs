import { useState } from 'react'

const App = () => {
const feedback = 'give feedback'
const stats = 'statistics'

const [rate, setRate] = useState({
  good: 0, neutral: 0, bad:0, all:0, pos:0, avg:0})

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(Array(anecdotes.length).fill(0))
  const n = Math.max(...voted)
  const index = voted.indexOf(n)

const statsTable = {
  good: {
      text: 'good',
      value: rate.good,
  },
  neutral: {
      text: 'neutral',
      value: rate.neutral,
  },
  bad: {
      text: 'bad',
      value: rate.bad,
  },
  all: {
      text: 'all',
      value: rate.all,
  },
  avg: {
      text: 'average',
      value: rate.avg/rate.all,
  },
  pos: {
      text: 'positive',
      value: rate.good/rate.all *100,
      unit: '%'
      
  },
}

const handleGoodRate = () => {
  setRate({...rate, good: rate.good+1, all: rate.all +1, avg:rate.avg+1})
}

const handleBadRate = () => {
  setRate({...rate, bad: rate.bad+1, all: rate.all +1, avg: rate.avg-1})
}

const handleNeutralRate = () => {
  setRate({...rate, neutral: rate.neutral+1, all: rate.all +1})
}

const handleAnecdote = () => {
  setSelected(Math.floor(Math.random() * anecdotes.length))
}

const handleAnecdoteVote = () => {
  const newVotes = [...voted]
  newVotes[selected] += 1
  setVoted(newVotes)
  }

  return ( 
    <div>
      <Header head ={feedback}/>
        <Button handleClick={handleGoodRate} text='good' />
        <Button handleClick={handleBadRate} text='bad' />
        <Button handleClick={handleNeutralRate} text='neutral' />
      <Header head ={stats}/>
        <History allClicks={rate.all} />
        {rate.all > 0 && (<Statistics statsTable={statsTable}/>) }
      <Header head='Anecdotes'/>
        <Button handleClick={handleAnecdote} text='anecdote' />
        <Button handleClick={handleAnecdoteVote} text='vote this anecdote' />
        <Anecdotes anecdotes={anecdotes[selected]} votes={voted[selected]}/>
      <Header head='the most voted anecdote'/>
        <HighestVoted anecdotes={anecdotes[index]} n={n} />
    </div>
  )
}


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)


const Anecdotes = (props) => {
  return(
    <div>
      <div>{props.anecdotes}</div>
      <div>has {props.votes} votes</div>
    </div>
  )
}


const HighestVoted = (props) => {
  return (
    <div>
      <div>{props.anecdotes}</div>
      <div>has {props.n} votes, which is the most votes at the moment</div>
    </div>
  )
}


const Statistics = ({statsTable}) => {
  return(
    <table>
      <tbody>
  <StatisticsLine stats = {statsTable.good}/>
  <StatisticsLine stats = {statsTable.neutral}/>
  <StatisticsLine stats = {statsTable.bad}/>
  <StatisticsLine stats = {statsTable.all}/>
  <StatisticsLine stats = {statsTable.avg}/>
  <StatisticsLine stats = {statsTable.pos}/>
      </tbody>
    </table>
  )}

  const StatisticsLine = ({stats}) => {
    return (<tr>
        <td>{stats.text} </td>
        <td>{stats.value} </td>
        <td>{stats.unit} </td>
    </tr>)
}


const Header = ({head}) => {
  return ( <h1>{head}</h1>) 
}


const History = ({allClicks }) => {
  if (allClicks === 0) {
    return (<div> press the buttons to see the statistics </div>
);}};


export default App