import React, { useEffect, useState, useContext } from 'react'
import Latex from 'react-latex-next';
import Legend from './legend';
import FinalMatrix from './finalMatrix';
import { context } from './generalAlgorithm';

const _ = require('lodash');
const ImplicationMatrix = () => {
  const {topSigns2, leftSigns2, xValuesArrayFOne, postAbbreviatedArray} = useContext(context);
  let xOneValues = xValuesArrayFOne;
  let aXOneValues = postAbbreviatedArray;

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

  const oneInColumn = (element, localMethod = 'vertical') => {
    if (localMethod === 'vertical') {
      let cnt = 0;
      for (let k = 0; k < matrix.length; k++) {
        if (matrix[k][element][0] === 1) {
          cnt++;
        }
        if (cnt > 1) {
          return 0;
        }
      }
      
      if (cnt === 1) {
        return 1;
      }
    }

    if (localMethod === 'horizontal') {   
      
    }
    
  }

  // const [colorFlag1,setColorFlag1] = useState(false), [colorFlag2,setColorFlag2] = useState(false), [colorFlag3,setColorFlag3] = useState(false);

  useEffect(()=>{
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        let element = document.getElementById("h"+String(i)+"w"+j);
        if (method === 'vertical') {
          if (matrix[i][j][1] === 1) {
            
            element.style.backgroundColor = 'rgb(77, 178, 77)';
            
          } else 
          if (matrix[i][j][2] === 1) {

            element.style.backgroundColor = 'rgb(152, 244, 152)';

          } else 
            element.style.backgroundColor = 'transparent';
        } 
        if (method === 'horizontal') {
          if (matrix[i][j][2] === 1) {
          
            element.style.backgroundColor ='rgb(77, 178, 77)';
          } else
          if (matrix[i][j][1] === 1) {
            
            element.style.backgroundColor = 'rgb(152, 244, 152)';
            
          } else {
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

  // let counter = 0;
  const [counter, setCounter] = useState(false);
  const [button, setButton] = useState(false);

  const autoColoring = () => {

    let newMatrix = _.cloneDeep(matrix);
    for (let x = 0; x < newMatrix[0].length; x++) {
      
      let cnt = 0;
      for (let y = 0; y < newMatrix.length; y++) {

        if (newMatrix[y][x][0]===1) {
          cnt++;
        }

      }
      if (cnt === 1) {
        for (let y = 0; y < newMatrix.length; y++) {
          newMatrix[y][x][1] = 1;
        }
      }

      setButton(true);
    }

    for (let y = 0; y < newMatrix.length; y++) {
      let flag = false;
      for (let x = 0; x < newMatrix[0].length; x++) {
        if (newMatrix[y][x][0] === 1) {
          let cnt = 0;
          for (let g = 0; g < newMatrix.length; g++) {
            if (newMatrix[g][x][0] === 1) {
              cnt++;
            }
          }
          if (cnt === 1) {
            flag = true;
          }
          
        }

      }
      if (flag) {
        for (let x = 0; x < newMatrix[0].length; x++) {
          if (newMatrix[y][x][2] === 0) {
            newMatrix[y][x][2] = 1;
          } else {
            newMatrix[y][x][2] = 0;
          }
        }
      }
    }

    for (let x = 0; x < newMatrix[0].length; x++) {
      let flag = false;

      for (let y = 0; y < newMatrix.length; y++) {

        if (newMatrix[y][x][0]===1 && newMatrix[y][x][2]===1) {
          flag = true;
        }

      }

      if (flag)
        for (let p = 0; p < newMatrix.length; p++) {
          if (newMatrix[p][x][1]===0) {
            newMatrix[p][x][1] = 1;
    
          }
        }
    }
    setMatrix(newMatrix);
  } 
  
  

  useEffect(()=>{
    
    let guideText = document.getElementById('guide');
    let leftButton = document.getElementById('button-left');
    let centerButton = document.getElementById('button-center');
    let rightButton = document.getElementById('button-right');
    if (method === 'horizontal') {
      leftButton.className = 'button button-pressed left-border';
      centerButton.className = 'button';
      rightButton.className = 'button right-border';
      guideText.textContent = 'Теперь выберите ВСЕ строки из столбцов, где есть всего один "⨯" и возвращайтесь в "Столбцы".';
      setCounter(true);
      console.log(counter);
    } else
    if (method === 'vertical') {
      if (button)
        leftButton.className = 'button left-border';
      else {
        leftButton.className = 'button-disabled left-border';
      }
      centerButton.className = 'button button-pressed';
      rightButton.className = 'button right-border';

      if (counter === false)
        guideText.textContent = 'Выберите ВСЕ столбцы, которые содержат всего один "⨯" и переходите в раздел "Строки".';
      else
        guideText.textContent = 'Теперь выберите ВСЕ столбцы, на отмеченных строках которых есть "⨯" или оставшиеся столбцы, которые содержат всего один "⨯" (если вы забыли про какой-то из столбцов на первом этапе). После того, как закончите свой выбор, переходите во вкладку "Пересечение".';
    } else
    if (method === 'cross') {
      leftButton.className = 'button left-border';
      centerButton.className = 'button';
      rightButton.className = 'button button-pressed right-border';  
      guideText.textContent = 'Итоговое отображение импликантной таблицы';    
    }
  },[method, button]);

  const stateHandler = (i, i2, method) => {
    
    let newMatrix = _.cloneDeep(matrix);

    if (method === 'vertical') {
      let flag = false;
      let flag2 = false;
      let add = true;
      let cnt = 0;
      for (let k = 0; k < newMatrix.length; k++) {
        if (newMatrix[k][i2][1]===0) {
          newMatrix[k][i2][1] = 1;

        }
        else {
          add = false;
          if (newMatrix[k][i2][2]===1 && newMatrix[k][i2][1]===1) {
            flag2 = true
          }

        }
        if (newMatrix[k][i2][0]===1) {
          cnt++;
        }
        if (newMatrix[k][i2][0]===1 && newMatrix[k][i2][2]===1) {
          flag = true;
        }
      }
      for (let k = 0; k < newMatrix.length; k++) {
        if (!flag2 && !add) {
          newMatrix[k][i2][1] = 0;
        }
      }
      if (cnt>1 && !flag) {
        if (counter === 0)
          return alert('Ошибка! В данном столбце больше одного "⨯"')
        else
          return alert('Ошибка! В данном столбце больше одного "⨯" или столбец не имеет ни одного "⨯" на отмеченных строках')
      }
      let localFlag = false;
      for (let k = 0; k < newMatrix.length; k++) {
        for (let p = 0; p < newMatrix[0].length; p++) {
          if (newMatrix[k][p][1]===1) {
            localFlag = true;
          }
        }
      }
      setButton(localFlag);
      
      setMatrix(newMatrix);
    }
    if (method === 'horizontal') {
      let flag = false;
      for (let k = 0; k < newMatrix[0].length; k++) {
        if (newMatrix[i][k][2] === 0) {
          newMatrix[i][k][2] = 1;
        } else {
          newMatrix[i][k][2] = 0;
        }

        if (newMatrix[i][k][0] === 1) {
          let cnt = 0;
          for (let g = 0; g < newMatrix.length; g++) {
            if (newMatrix[g][k][0] === 1) {
              cnt++;
            }
          }
          if (cnt === 1) {
            flag = true;
          }
          
        }
      }
      if (!flag) {
        return alert('Ошибка! В данной строке все столбцы имеют больше одного "⨯"')
      } else {
        setMatrix(newMatrix);
      }
    }
    if (method === 'cross') {
      setMatrix(newMatrix);
    }

  }



  return (
      <div className='matrix-outer'>
        <h1>
          Импликантная матрица:
        </h1>
        <p id='guide'>

        </p>
        <div style={{paddingTop: '10px'}} className='button-handler'>
          <button id='button-left' className='button left-border' onClick={()=>{if (button) setMethod('horizontal')}}>
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
            {topSigns2.map(element => <td className='cell'><Latex>${element}$</Latex></td>)}
          </tr>
            {leftSigns2.map((element, index) => {
          return <tr>
            <td className='cell'><Latex>${element}$</Latex></td>
            {matrixData[index].map((elementMatrix, index2) => {
              return <td id={'h'+String(index) +'w'+index2} className='cell' onClick={()=>stateHandler(index, index2, method)}><Latex>${elementMatrix[0] ? '\\times' : ' '}$</Latex></td>
            })}
          </tr>})}

        </div>
        <div style={{display:'flex', flexWrap:'nowrap', alignItems:'center', paddingTop:'1em', gap:'0.5em'}}>
					<input type="checkbox" name="" id="show-cor2" onClick={()=>{autoColoring()}}/>
					<label for='show-cor2'>Отметить все строки и столбцы автоматически</label>
				</div>
        
        <div>
            {(method === 'cross') ? <div><Legend/><FinalMatrix matrix={matrix}/></div> : ''}
            
        </div>
        
        {/* <div>matrix: {matrix.join('|')}</div>
        <div>xOneValues: {xOneValues.join('|')}</div>
        <div>aXOneValues: {aXOneValues.join('|')}</div> */}
                
      </div>
  )
}

export default ImplicationMatrix
//1010111001010100