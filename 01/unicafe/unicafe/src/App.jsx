import { useState } from 'react'

const App = () => {
const feedback = 'give feedback'
const stats = 'statistics'
  // tallenna napit omaan tilaansa

  const [rate, setRate] = useState({
    good: 0, neutral: 0, bad:0, all:0, pos:0, avg:0})

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
      <Header feedback={feedback}/>
        <Button handleClick={handleGoodRate} text='good' />
        <Button handleClick={handleBadRate} text='bad' />
        <Button handleClick={handleNeutralRate} text='neutral' />
      <Header feedback={stats}/>
     <p>good {rate.good}</p> 
       <p>neutral {rate.neutral}</p>
       <p>bad {rate.bad}</p>
       <p>all {rate.all}</p> 
      <p>average {rate.avg/rate.all} </p>
      <p>positive {rate.good/rate.all * 100} %</p>
    
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Header = ({feedback}) => {
  return (
      <h1>{feedback}</h1>
  )
  }
export default App