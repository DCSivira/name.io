import React from 'react'

const MultipleResultsBox = (props) => {

  const Box = (value, prob) => {
    return (
      <div>
        <b>{value}</b>
        <p>{prob}</p>
      </div>
    );
  };

  console.log(props.data);
  let multipleDataArray = props.data.map(id => {
    return Box(id.country, id.prob);
  });

  return (
    <div>
        <h1>{props.title}</h1>
        <div style={{display: 'flex' , justifyContent: 'space-evenly'}}>
          {multipleDataArray}
        </div>
      </div>
  );
};

export default MultipleResultsBox;
