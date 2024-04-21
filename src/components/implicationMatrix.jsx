import React, { useEffect, useState } from 'react'
import Latex from 'react-latex-next';
import Legend from './legend';

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
  };


  for (let i = 0; i < aXOneValues.length; i++) {
    matrixData[i] = [];
    for (let j = 0; j < xOneValues.length; j++) {
      matrixData[i][j] = [equalityCheck(xOneValues[j], aXOneValues[i]),0,0];
    }
  };


  const [matrix, setMatrix] = useState(matrixData);
  const [method, setMethod] = useState('vertical');

  const oneInColumn = (element) => {
    let cnt = 0;
    for (let k = 0; k < matrix.length; k++) {
      if (matrix[k][element][0] === 1) {
        cnt++;
      }
      if (cnt > 1) {
        return 0;
      }
    }
    if (cnt < 1) {
      return 0
    }
    return 1;
  }

  useEffect(()=>{
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        let element = document.getElementById(String(i)+j);
        if (method === 'vertical') {
          if (matrix[i][j][1] === 1) {
            
            element.style.backgroundColor = 'rgb(77, 178, 77)';
          }
          else 
            element.style.backgroundColor = 'transparent';
        } 
        if (method === 'horizontal') {
          if (matrix[i][j][2] === 1) {
          
            element.style.backgroundColor = 'rgb(77, 178, 77)';
          }
          if (matrix[i][j][2] === 0) {
            element.style.backgroundColor = 'transparent';
          }
        }

        if (method === 'cross') {
          if (matrix[i][j][2] === 1 && matrix[i][j][1] === 1) {
            if (oneInColumn(j)&&matrix[i][j][0] === 1) {
              element.style.backgroundColor = 'rgb(200, 180, 0)';
            } else {
            element.style.backgroundColor = 'rgb(77, 178, 77)';
            }

          } else if (matrix[i][j][2] === 1 || matrix[i][j][1] === 1) {
            element.style.backgroundColor = 'rgb(152, 244, 152)';
          } else {
            element.style.backgroundColor = 'transparent';
          }
        }
      }
    }
  }, [matrix, method]);

  useEffect(()=>{
    let leftButton = document.getElementById('button-left');
    let centerButton = document.getElementById('button-center');
    let rightButton = document.getElementById('button-right');
    if (method === 'horizontal') {
      leftButton.className = 'button button-pressed left-border';
      centerButton.className = 'button';
      rightButton.className = 'button right-border';
    } else
    if (method === 'vertical') {
      leftButton.className = 'button left-border';
      centerButton.className = 'button button-pressed';
      rightButton.className = 'button right-border';
    } else
    if (method === 'cross') {
      leftButton.className = 'button left-border';
      centerButton.className = 'button';
      rightButton.className = 'button button-pressed right-border';      
    }
  },[method]);

  // setMatrix([...matrix.slice(0,index2), [...matrix[index].slice(0,index), [...matrix[index][index2].slice(0,index2), !matrix[index][index2][1], ...matrix[index][index2].slice(index2+1)], ...matrix.slice(index2+1)], ...matrix.slice(index)])
  const stateHandler = (i, i2, method) => {
    let newMatrix = _.cloneDeep(matrix);
    if (method === 'vertical') {
      for (let k = 0; k < newMatrix.length; k++) {
        if (newMatrix[k][i2][1]===0)
          newMatrix[k][i2][1] = 1;
          
        else
          newMatrix[k][i2][1] = 0;
      }
      setMatrix(newMatrix);
    }
    if (method === 'horizontal') {
      for (let k = 0; k < newMatrix[0].length; k++) {
        if (newMatrix[i][k][2]===0)
          newMatrix[i][k][2] = 1;
          
        else
          newMatrix[i][k][2] = 0;
      }
      setMatrix(newMatrix);
    }
    if (method === 'cross') {
      setMatrix(newMatrix);
    }

  }

  for (let i = 0; i < matrix.length; i++) {
    for (let i = 0; i < matrix.length; i++) {

    }
  }

  return (
    <div className='matrix-outer'>
      <h1>
        Импликантная матрица:
      </h1>
      <p>
        Выберите столбцы, которые содержат всего один <Latex>$"\times"$</Latex>, а затем строки, которые его содержат. Они будут вычеркнуты.
      </p>
      <div style={{paddingTop: '10px'}} className='button-handler'>
        <button id='button-left' className='button left-border' onClick={()=>{setMethod('horizontal')}}>
          Строки
        </button>
        <button id='button-center' className='button' onClick={()=>{setMethod('vertical')}}>
          Столбцы
        </button>
        <button id='button-right' className='button right-border' onClick={()=>{setMethod('cross')}}>
          Пересечение
        </button>
      </div>

      <div className='matrix'>
          
        <tr>
          <td className='cell'>&nbsp;</td>
          {props.topSigns2.map(element => <td className='cell'><Latex>${element}$</Latex></td>)}
        </tr>
          {props.leftSigns2.map((element, index) => {
        return <tr>
          <td className='cell'><Latex>${element}$</Latex></td>
          {matrixData[index].map((elementMatrix, index2) => {
            return <td id={String(index) + index2} className='cell' onClick={()=>stateHandler(index, index2, method)}><Latex>${elementMatrix[0] ? '\\times' : ' '}$</Latex></td>
          })}
          </tr>})}

        </div>

        <div>
          {(method === 'cross') ? <Legend/> : ''}
        </div>
      
        <div>{matrix}</div>
        <div>{method}</div>
        {/* <div>matrix: {matrix.join('|')}</div>
        <div>xOneValues: {xOneValues.join('|')}</div>
        <div>aXOneValues: {aXOneValues.join('|')}</div> */}
              
    </div>

  )
}

export default ImplicationMatrix