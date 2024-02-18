import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person.jsx'
import NameForm from './components/NameForm.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('a new name')
  const [newNumber, setNewNumber] = useState('a new number')
  const [showAll, setShowAll] = useState(true)
  const [filterN,setFilter] = useState('')
  const [ihmiset, setIhmiset] = useState([])


  const addName = (event) => {
    event.preventDefault()
    if (nameUsed(persons, newName)) {
       window.alert(
        `${newName} is already added to phonebook`
        )
        if (numberUsed(persons, newNumber)) {
          window.alert(
           `${newNumber} is already added to phonebook`
           ) 
      }}
else {
  const personObject = {
    name: newName,
    number: newNumber,
    important: Math.random() > .7,
    id: persons.length + 1,
  }


  setPersons(persons.concat(personObject))
  setNewName('')
  setNewNumber('')
}}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
     setFilter(event.target.value) 
    } 

    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(filterN.toLowerCase())
    );


    const namesToShow = filteredPersons.length > 0 ? filteredPersons : persons;
    
    
    useEffect(() => {
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          setIhmiset(response.data)
        })
    }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <div> Filter shown with
      <Filter value={filterN} handleFilter={handleFilter} />
      </div>
      <h2>add a new</h2>
      <NameForm
        handleAddPerson={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map(person =>
          <Person key={person.id} person={person} />
        )}
      </ul> 
    </div>
  )
}


const nameUsed = (persons, name) => {
  return persons.filter(person => person.name === name).length > 0
}


const numberUsed = (persons, number) => {
  return persons.filter(person => person.number === number).length > 6
}


const Filter = ({filter, handleFilter}) => {
  console.log(filter)
  return(
  <div>
    <input value={filter} onChange={handleFilter}/>
  </div>
  )
}


export default App