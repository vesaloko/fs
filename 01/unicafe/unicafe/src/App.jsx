import { useState } from 'react'

const App = () => {
const feedback = 'give feedback'
const stats = 'statistics'

const [rate, setRate] = useState({
  good: 0, neutral: 0, bad:0, all:0, pos:0, avg:0})

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

  return (
    <div>
      <Header head ={feedback}/>
        <Button handleClick={handleGoodRate} text='good' />
        <Button handleClick={handleBadRate} text='bad' />
        <Button handleClick={handleNeutralRate} text='neutral' />
      <Header head ={stats}/>
      <History allClicks={rate.all} />
      {rate.all > 0 && (<Statistics statsTable={statsTable}/>)}
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}> {text} </button>
)

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
  )
  }


  const StatisticsLine = ({stats}) => {
    return (<tr>
        <td>{stats.text} </td>
        <td>{stats.value} </td>
    </tr>)
}


const Header = ({head}) => {
  return ( <h1>{head}</h1>) }

  
  const History = ({allClicks }) => {
    if (allClicks === 0) {
      return (<div> press the buttons to see the statistics </div>
      );}};


export default App