import React from 'react'
import generalAlgorithm from './generalAlgorithm';


const checkValue = (value) => {
  //empty string error
  let errorType0 = 0;

  // symbols that were used are not 1 or 0
  let errorType1 = 0;

  // length is not equal 2^n
  let errorType2 = 1;
  
  if (String(value).length == 0) {
    errorType0 = 1;
  }

  for (let i = 0; i < String(value).length; i++) {
    if (!(value[i] === "1" || value[i] === "0")) {
      errorType1 = 1;
    }
  }

  let power;
  for (let i = 1; i < 15; i ++) {
    if (Math.pow(2, i) == String(value).length) {
      errorType2 = 0;
      power = i;
    }
  }

  let hasErrors = 0;
  if (errorType1 == 1 || (errorType2 == 1 && errorType0 == 0)) {
    hasErrors = 1;
  }

  return (
    <div className='container'>
      <div className={hasErrors ? 'Error' : 'none'}>
        {errorType1 ? <p>Используйте только 1 или 0 в своей записи</p> : ''}
        {errorType0 ? '' : (errorType2 ? <p>У вас должно быть значений 2&#x207F;, где n>0</p> : '')}    
        {errorType0 ? '' : (hasErrors ? '': generalAlgorithm(value, power))}
      </div>
    </div>
  )
}

export default checkValue