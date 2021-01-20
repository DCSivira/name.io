import React, {useState} from 'react'
import axios from 'axios';

import ResultBox from './ResultBox';
import MultipleResultsBox from './MultipleResultsBox';

const dataN = {
  data: {
    name: 'carlos',
    country: [
      {country_id: 'US', probability: 0.1},
      {country_id: 'NZ', probability: 0.3},
      {country_id: 'FR', probability: 0.7}
    ]
  }
};

const dataG = {
  data: {
    name: 'carlos',
    gender: 'male',
    probability: 0.5
  }
};

const dataA = {
  data: {
    name: 'carlos',
    age: 22,
    probability: 0.5
  }
};

const App = () => {
  const [name, setName] = useState('');
  const [nationalityData, setNationalityData] = useState([]);
  const [genderData, setGenderData] = useState({value: '', prob: 0});
  const [ageData, setAgeData] = useState({value: '', prob: 0});

  const getData = (nameString, url) => {
    let response = null;
    axios.get(url + nameString)
    .then(res => {
      response = res;
    }).catch(e => console.log(e));
    return response;
  };

  const handleNameSubmit = (nameString) => {
    let responseN = getData(nameString, 'https://api.nationalize.io?name=');
    let responseG = getData(nameString, 'https://genderize.io/?name=');
    let responseA = getData(nameString, 'https://api.agify.io?name=');

    let nationality = [];
    responseN.country.map(id => {
      nationality.push({
        country: id.country_id,
        prob: id.probability
      });
    });

    let gender = {
      value: responseG.data.gender,
      prob: responseG.data.probability
    };

    let age = {
      value: responseA.data.age,
      prob: responseA.data.probability
    };

    setNationalityData(nationality);
    setGenderData(gender);
    setAgeData(age);
  };

  return (
    <div>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)}/>
      <button onClick={() => handleNameSubmit(name)}>Get Gender</button>
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <MultipleResultsBox title="Nationality" data={nationalityData} />
        <ResultBox title="Gender" data={genderData} />
        <ResultBox title="Age" data={ageData} />
      </div>
    </div>
  );
};

export default App;
