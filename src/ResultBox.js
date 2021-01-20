import React from 'react'

const ResultBox = (props) => {
  return (
      <div>
        <h1>{props.title}</h1>
        <b>{props.data.value}</b>
        <p>{props.data.prob}</p>
      </div>
  );
};

export default ResultBox;
