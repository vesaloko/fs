import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person.jsx'
import NameForm from './components/NameForm.jsx'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('a new name')
  const [newNumber, setNewNumber] = useState('a new number')
  //const [showAll, setShowAll] = useState(true)
  const [filterN,setFilter] = useState('')
  const [notification, setNotification] = useState(null)


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

  personService.create(personObject)
  .then(addedPerson => {
    setPersons(persons.concat(addedPerson));
    setNewName('');
    setNewNumber('');
    setNotification({ type: 'success', content: `Added ${addedPerson.name}.` });
  })


  axios
  .post('http://localhost:3001/persons', personObject)
  .then(response => {addName(persons.concat(response.data))
    setNewName('')
  })}}

  const handleNameChange = (event) => {console.log(event.target.value)
    setNewName(event.target.value)}

  const handleNumberChange = (event) => { console.log(event.target.value)
    setNewNumber(event.target.value) }

  const handleFilter = (event) => {setFilter(event.target.value) } 

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterN.toLowerCase()));
  
  const namesToShow = filteredPersons.length > 0 ? filteredPersons : persons;
    

  useEffect(() => {
    personService.getAll()
      .then(allPersons => {
        setPersons(allPersons);
      })
      .catch(error => {
        console.error('Failed to find persons:', error);
        setNotification({ type: 'error', content: 'Failed to find persons.' });
      });
  }, []);


  const handleDeletePerson = (deletedPerson) => {
    const accepted = window.confirm(`Delete ${deletedPerson.name}?`);
    if (accepted) {
      personService.remove(deletedPerson.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id));
          setNotification({ type: 'success', content: `Deleted ${deletedPerson.name}.` });
        })
        .catch(error => {
          console.error('Failed to delete person:', error);
          setNotification({ type: 'error', content: 'Failed to delete person.' });
        });
    }
  };
  
  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification notification={notification} />}
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
          <Person key={person.id} person={person} handleDeletePerson={handleDeletePerson}/>
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

const Notification = ({ notification }) => {
  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    border: `2px solid ${notification.type === 'error' ? 'red' : 'green'}`,
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return (
    <div style={style}>
      {notification.content}
    </div>
  );
};


export default App