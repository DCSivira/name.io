import React, {useState} from 'react'
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');

  const handleGender = (nameString) => {
    axios.get('https://api.genderize.io?name=' + name)
    .then(response => {
      setGender(JSON.stringify(response));
    }).catch(e => setGender(JSON.stringify(e)))
  };

  return (
    <div>
      <input type='text' value={name} onChange={(e) => setName(e.target.value) }/>
      <button onClick={() => handleGender(name)}>Get Gender</button>
      <p>{gender}</p>
    </div>
  );
}

export default App;
