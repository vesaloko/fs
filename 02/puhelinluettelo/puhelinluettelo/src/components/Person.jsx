import React from 'react';

const Person = ({ person }) => {
  return (
    <div>
      <p>{person.name}</p>
    </div>
  );
};

export default Person;