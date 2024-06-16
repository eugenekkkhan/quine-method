import React, { useEffect, useState } from 'react'
import GeneralAlgorithm from './generalAlgorithm';


const CheckValue = (props) => {
  const [text, setText] = useState(props.value);

  // re-rendering depending on prop change
  useEffect(()=>{
    setText(props.value)
  }, [props.value])

  //empty string error
  let errorType0 = 0;

  // symbols that were used are not 1 or 0
  let errorType1 = 0;

  // length is not equal 2^n
  let errorType2 = 1;
  
  
  if (String(text).length === 0) {
    errorType0 = 1;
  }

  for (let i = 0; i < String(text).length; i++) {
    if (!(props.value[i] === "1" || props.value[i] === "0")) {
      errorType1 = 1;
    }
  }

  let power;
  for (let i = 1; i < 15; i ++) {
    if (Math.pow(2, i) === String(text).length) {
      errorType2 = 0;
      power = i;
    }
  }

  let hasErrors = 0;
  if (errorType1 === 1 || (errorType2 === 1 && errorType0 === 0)) {
    hasErrors = 1;
  }

  return (
    <div className='container'>
      <div className={hasErrors ? 'Error' : 'none'}>
        {errorType1 ? <p>Используйте только 1 или 0 в своей записи</p> : ''}
        {errorType0 ? '' : (errorType2 ? <p>У вас должно быть значений 2&#x207F;, где n&gt;0</p> : '')}    
        {errorType0 ? '' : (hasErrors ? '': <GeneralAlgorithm value={text} power={power}/>)}
      </div>
    </div>
  )
}

export default CheckValue