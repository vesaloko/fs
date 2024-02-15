import { useState } from 'react'

const App = () => {
const feedback = 'give feedback'
const stats = 'statistics'
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <Header feedback={feedback}/>
         <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <Header feedback={stats}/>
      <div><p>good </p>{good}</div>
      <div><p>neutral </p>{neutral}</div>
      <div><p>bad </p>{bad}</div>
    </div>
  )
}

const Header = ({feedback}) => {
  return (
      <h1>{feedback}</h1>
  )
  }
export default App