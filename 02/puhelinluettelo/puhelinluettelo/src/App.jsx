import { useState } from 'react'
import Person from './components/Person.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('a new name')
  const [showAll, setShowAll] = useState(true)


  const addName = (event) => {
    event.preventDefault()
  const personObject = {
    name: newName,
    important: Math.random() > .7,
    id: persons.length + 1,
  }

  setPersons(persons.concat(personObject))
  setNewName('')
}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const namesToShow = showAll
  ? persons
  : persons.filter(person => person.important === true)


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <input
          value={newName}
          onChange={handleNameChange}
        />
        <button type="submit">save</button>
      </form>  
      <ul>
        {namesToShow.map(person =>
          <Person key={person.id} person={person} />
        )}
      </ul> 
      <h2>Numbers</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default App