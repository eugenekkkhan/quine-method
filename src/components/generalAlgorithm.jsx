import React from 'react'

const generalAlgorithm = (value) => {
  let arrayValues = new Array(); 
 
  for (let i = 0; i < value.length; i++) {
    arrayValues.push(Number(value[i]));
  }

  return (
    <div>
      {arrayValues[0]}
    </div>
  )
}

export default generalAlgorithm