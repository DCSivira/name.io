import React, {useState} from 'react'
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [nationalityData, setNationalityData] = useState([]);
  const [genderData, setGenderData] = useState('');
  const [ageData, setAgeData] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const Box = (value) => <span>{value}, </span>;

  const handleNameSubmit = async () => {
    // Get Nationality Data
    await axios.get('https://api.nationalize.io?name=' + name)
      .then(res => {
        let nationality = [];
        if (res.data.country.length)
          res.data.country.map(id => nationality.push( id.country_id ));
        else
          nationality.push('US');
        setNationalityData(nationality);
      }).catch(e => console.log(e));

    // Get Gender Data
    await axios.get('https://api.genderize.io?name=' + name)
      .then(res => {
        let gender = (res.data.gender === undefined) ?
          ((Math.random() < 0.5) ? 'male' : 'female') : res.data.gender;
        setGenderData(gender);
      }).catch(e => console.log(e));
    
    // Get Age Data
    await axios.get('https://api.agify.io?name=' + name)
      .then(res => {
        let age = (res.data.age === undefined) ? 
          (Math.random() * 100) + 1 : res.data.age;
        setAgeData(age);
      }).catch(e => console.log(e));

    setIsThinking(false);
  };

  let countries = nationalityData.map(value => Box(value));

  const mainStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  let answerStyle = {
    display: (nationalityData !== [] && genderData !== '' && ageData !== '') ?
      'initial' : 'none'
  }

  let thinkingStyle = {
    display: (isThinking) ?
      'initial' : 'none'
  }

  return (
    <div style={mainStyle}>
      <div>
        <input type='text' value={name} onChange={e => {
          setName(e.target.value)}
        } />
      </div>
      <br />
      <div>
        <button onClick={() => {
          setIsThinking(true);
          setNationalityData([]);
          setGenderData('');
          setAgeData('');
          handleNameSubmit();
        }}>Submit</button>
      </div>
      <br />
      <div>
        <p style={answerStyle}>
          I think you are from any of these countries <b>{countries}</b> your 
          gender is <b>{genderData}</b> and you are <b>{ageData}</b> years old.
        </p>
        <p style={thinkingStyle}>
          thinking...
        </p>
      </div>
    </div>
  );
};

export default App;
