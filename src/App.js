import React, {useState} from 'react'
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [nationalityData, setNationalityData] = useState([]);
  const [genderData, setGenderData] = useState('');
  const [ageData, setAgeData] = useState('');
  const [isThinking, setIsThinking] = useState(false);

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

  const Box = (value) => <span style={{color: 'black'}}>{value}, </span>;
  let countries = nationalityData.map(value => Box(value));

  const mainStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }

  const topSectionStyle = {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'lightgrey',
    width: '100vw',
    height: '50vh'
  }
  
  const bottomSectionStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'red',
    width: '100vw',
    height: '44vh',
    textAlign: 'center',
    fontSize: '30px',
    color: 'white'
  }

  const buttonStyle = {
    backgroundColor: 'red',
    marginBottom: '5vh',
    width: '50vw',
    height: '50%',
    border: 'none',
    fontSize: '20px',
    color: 'white'
  }

  const inputStyle = {
    backgroundColor: 'grey',
    width: '90vw',
    height: '60%',
    border: 'none',
    marginBottom: '2.5vh',
    textAlign: 'center',
    fontSize: '30px'
  }

  const dataStyle = {
    color: 'black'
  }

  let answerStyle = {
    display: (nationalityData !== [] && genderData !== '' && ageData !== '') ?
      'initial' : 'none'
  }

  let thinkingStyle = {
    display: (isThinking) ? 'initial' : 'none'
  }

  return (
    <div style={mainStyle}>

      <div style={topSectionStyle}>
        <div>
          <input style={inputStyle} type='text' value={name} 
            placeholder="Your name please"
            onChange={e => {
              setName(e.target.value)}
            }
          />
        </div>

        <div>
          <button style={buttonStyle} onClick={() => {
            setIsThinking(true);
            setNationalityData([]);
            setGenderData('');
            setAgeData('');
            handleNameSubmit();
          }}>Submit</button>
        </div>
      </div>

      <div style={bottomSectionStyle}>
        <p style={answerStyle}>
          I think you are from {(countries.length > 1) ? 
          'any of these countries' : 'this country' } <b>{countries}</b> your 
          gender is <b style={dataStyle}>{genderData}</b> and you are 
          <b style={dataStyle}> {ageData}</b> years old.
        </p>
        <p style={answerStyle}>
          ISO codes Reference <a href="https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes#Current_ISO_3166_country_codes">here</a>
        </p>
        <p style={thinkingStyle}>
          Thinking...
        </p>
      </div>

      <div style={{height: '10%', textAlign: 'center', fontSize: '14px'}}>
         Thanks to |   
          <a href="https://nationalize.io">nationalize.io</a> |
          <a href="https://genderize.io">genderize.io</a> |
          <a href="https://agify.io">agify.io</a> |
      </div>

    </div>
  );
};

export default App;
