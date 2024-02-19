import React from 'react';

const Person = ({ person , handleDeletePerson}) => {
  return (
    <div>
      <p>{person.name}, {person.number}</p>
      <button id={person.name} onClick={() => handleDeletePerson(person)}>delete</button>
    </div>
  );
};

export default Person;