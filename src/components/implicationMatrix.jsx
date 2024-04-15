import React, { useEffect, useState } from 'react'
import Latex from 'react-latex-next';

const _ = require('lodash');

const ImplicationMatrix = (props) => {
  let xOneValues = props.xValuesArrayFOne;
  let aXOneValues = props.postAbbreviatedArray;
  // const [active, setActive] = useState(0);

  // const colored = {
  //   backgroundColor: active ? 'white' : 'red'
  // }
  const matrixData = [];

  function equalityCheck(firstArr, secondArr) {
    let cnt1 = 0, cnt2 = 0;
    for (let i = 0; i < firstArr.length; i++) {
      cnt2++;
      if (firstArr[i] === secondArr[i]) {
        cnt1++;
      }
      if (secondArr[i] === '2') {
        cnt2--;
      }
    }
    if (cnt1 === cnt2) {
      return 1;
    } else {
      return 0;
    }
  }


  for (let i = 0; i < aXOneValues.length; i++) {
    matrixData[i] = [];
    for (let j = 0; j < xOneValues.length; j++) {
      matrixData[i][j] = [equalityCheck(xOneValues[j], aXOneValues[i]),0,0];
    }
  }


  const [matrix, setMatrix] = useState(matrixData);

  useEffect(()=>{
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        let element = document.getElementById(String(i)+j);
        if (matrix[i][j][1] === 1) {
          
          element.style.backgroundColor = 'red';
        }
        else 
          element.style.backgroundColor = 'transparent';
      }
    }
  }, [matrix])

  // setMatrix([...matrix.slice(0,index2), [...matrix[index].slice(0,index), [...matrix[index][index2].slice(0,index2), !matrix[index][index2][1], ...matrix[index][index2].slice(index2+1)], ...matrix.slice(index2+1)], ...matrix.slice(index)])
  const stateHandler = (i, i2) => {
    let newMatrix = _.cloneDeep(matrix);
    if (newMatrix[i][i2][1]===0)
      newMatrix[i][i2][1] = 1;
    else
      newMatrix[i][i2][1] = 0;
    setMatrix(newMatrix);
  };


  return (
    <div className='matrix-outer'>

      <div className='matrix'>
          <tr>
            <td className='cell'>&nbsp;</td>
            {props.topSigns2.map(element => <td className='cell'><Latex>${element}$</Latex></td>)}
          </tr>
            {props.leftSigns2.map((element, index) => {
            return <tr>
              <td className='cell'><Latex>${element}$</Latex></td>
              {matrixData[index].map((elementMatrix, index2) => {
                return <td id={String(index) + index2} className='cell' onClick={()=>stateHandler(index, index2)}><Latex>${elementMatrix[0] ? '\\times' : ' '}$</Latex></td>
              })}
              </tr>})}
        </div>
        <div>{matrix}</div>
        <div>matrix: {matrix.join('|')}</div>
        <div>xOneValues: {xOneValues.join('|')}</div>
        <div>aXOneValues: {aXOneValues.join('|')}</div>
              
    </div>

  )
}

export default ImplicationMatrix