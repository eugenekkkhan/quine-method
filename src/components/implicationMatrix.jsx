import React, { useEffect, useState, useContext } from 'react'
import Latex from 'react-latex-next';
import Legend from './legend';
import FinalMatrix from './finalMatrix';
import { context } from './generalAlgorithm';

const _ = require('lodash');
const ImplicationMatrix = () => {
  const {topSigns2, leftSigns2, xValuesArrayFOne, postAbbreviatedArray, value} = useContext(context);
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

  var matrix = _.cloneDeep(matrixData);

  const autoColoring = () => {
    let autoMatrix = matrix;
    for (let x = 0; x < autoMatrix[0].length; x++) {
      
      let cnt = 0;
      for (let y = 0; y < autoMatrix.length; y++) {

        if (autoMatrix[y][x][0]===1) {
          cnt++;
        }

      }
      if (cnt === 1) {
        for (let y = 0; y < autoMatrix.length; y++) {
          autoMatrix[y][x][1] = 1;
        }
      }

    }

    for (let y = 0; y < autoMatrix.length; y++) {
      let flag = false;
      for (let x = 0; x < autoMatrix[0].length; x++) {
        if (autoMatrix[y][x][0] === 1) {
          let cnt = 0;
          for (let g = 0; g < autoMatrix.length; g++) {
            if (autoMatrix[g][x][0] === 1) {
              cnt++;
            }
          }
          if (cnt === 1) {
            flag = true;
          }
          
        }

      }
      if (flag) {
        for (let x = 0; x < autoMatrix[0].length; x++) {
          if (autoMatrix[y][x][2] === 0) {
            autoMatrix[y][x][2] = 1;
          } else {
            autoMatrix[y][x][2] = 0;
          }
        }
      }
    }

    for (let x = 0; x < autoMatrix[0].length; x++) {
      let flag = false;

      for (let y = 0; y < autoMatrix.length; y++) {

        if (autoMatrix[y][x][0]===1 && autoMatrix[y][x][2]===1) {
          flag = true;
        }

      }

      if (flag)
        for (let p = 0; p < autoMatrix.length; p++) {
          if (autoMatrix[p][x][1]===0) {
            autoMatrix[p][x][1] = 1;
    
          }
        }
    }
    matrix = autoMatrix;
  } 

  autoColoring();

  // const [matrix, setMatrix] = useState(_.cloneDeep(matrixData));
  const [userMatrix, setUserMatrix] = useState(_.cloneDeep(matrixData));
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
      // 
    }
  }

  // const [colorFlag1,setColorFlag1] = useState(false), [colorFlag2,setColorFlag2] = useState(false), [colorFlag3,setColorFlag3] = useState(false);

  const [matrixSwitch /* true - matrix, false - userMatrix */, setMatrixSwitch] = useState(false);
  const [cleaning, setCleaning] = useState(false);

  useEffect(()=>{

    if (cleaning) {
      for (let i = 0; i < userMatrix.length; i++) {
        for (let j = 0; j < userMatrix[i].length; j++) {
          userMatrix[i][j][1] = 0;
          userMatrix[i][j][2] = 0;
        }
      }
      setCleaning(false);
    }

    for (let i = 0; i < (matrixSwitch ? matrix : userMatrix).length; i++) {
      for (let j = 0; j < (matrixSwitch ? matrix : userMatrix)[0].length; j++) {
        let element = document.getElementById("h"+String(i)+"w"+j);
        if (method === 'vertical') {
          if ((matrixSwitch ? matrix : userMatrix)[i][j][1] === 1) {
            
            element.style.backgroundColor = 'rgb(77, 178, 77)';
            
          } else 
          if ((matrixSwitch ? matrix : userMatrix)[i][j][2] === 1) {

            element.style.backgroundColor = 'rgb(152, 244, 152)';

          } else 
            element.style.backgroundColor = 'transparent';
        } 
        if (method === 'horizontal') {
          if ((matrixSwitch ? matrix : userMatrix)[i][j][2] === 1) {
          
            element.style.backgroundColor ='rgb(77, 178, 77)';
          } else
          if ((matrixSwitch ? matrix : userMatrix)[i][j][1] === 1) {
            
            element.style.backgroundColor = 'rgb(152, 244, 152)';
            
          } else {
            element.style.backgroundColor = 'transparent';
          }
        }

        if (method === 'cross') {
          if ((matrixSwitch ? matrix : userMatrix)[i][j][2] === 1 && (matrixSwitch ? matrix : userMatrix)[i][j][1] === 1) {
            if (oneInColumn(j)&&(matrixSwitch ? matrix : userMatrix)[i][j][0] === 1) {
              element.style.backgroundColor = 'rgb(200, 180, 0)';
            } else {
              element.style.backgroundColor = 'rgb(77, 178, 77)';
            }

          } else if ((matrixSwitch ? matrix : userMatrix)[i][j][2] === 1 || (matrixSwitch ? matrix : userMatrix)[i][j][1] === 1) {
            element.style.backgroundColor = 'rgb(152, 244, 152)';
            
          } else {
            element.style.backgroundColor = 'transparent';
          }

        }
      }
    }
  }, [matrix, userMatrix, method, matrixSwitch, cleaning]);

  // let counter = 0;
  const [counter, setCounter] = useState(false);
  const [button, setButton] = useState(false);

  useEffect(()=>{
    let disabledCenterButtonFlag = true;
    let disabledRightButtonFlag = true;
    let partOfRightButtonFlag1 = false;
    let partOfRightButtonFlag2 = false;
    for (let i = 0; i < userMatrix.length; i++) {
      for (let j = 0; j < userMatrix[i].length; j++) {
        if (userMatrix[i][j][1]===1) {
          disabledCenterButtonFlag = false;
          partOfRightButtonFlag1 = true;
        }
        if (userMatrix[i][j][2]===1){
          partOfRightButtonFlag2 = true;
        }
      }
      if (partOfRightButtonFlag1 && partOfRightButtonFlag2) {
        disabledRightButtonFlag = false;
      }
    }

    let guideText = document.getElementById('guide');
    let centerButton = document.getElementById('button-center');
    let leftButton = document.getElementById('button-left');
    let rightButton = document.getElementById('button-right');
    if (method === 'horizontal') {
      centerButton.className = 'button button-pressed';
      leftButton.className = 'button left-border';
      rightButton.className = 'button right-border';
      guideText.textContent = 'Теперь выберите ВСЕ строки из столбцов, где есть всего один "⨯" и возвращайтесь в "Столбцы".';
      setCounter(true);

      if (!disabledRightButtonFlag || matrixSwitch)
      {
        rightButton.className = 'button right-border';
        rightButton.onclick = ()=>{setMethod('cross')};
      } else {
        rightButton.className = 'button-disabled right-border';
        rightButton.onclick = ()=>{};
      }
    } else
    if (method === 'vertical') {
      if ((!disabledCenterButtonFlag) || matrixSwitch) {
        centerButton.className = 'button';
        centerButton.onclick = ()=>{setMethod('horizontal')};
      } else {
        centerButton.className = 'button-disabled';
        centerButton.onclick = ()=>{};
      }
      if (!disabledRightButtonFlag || matrixSwitch)
      {
        rightButton.className = 'button right-border';
        rightButton.onclick = ()=>{setMethod('cross')};
      } else {
        rightButton.className = 'button-disabled right-border';
        rightButton.onclick = ()=>{};
      }
      leftButton.className = 'button button-pressed left-border';

      if (counter === false)
        guideText.textContent = 'Выберите ВСЕ столбцы, которые содержат всего один "⨯" и переходите в раздел "Строки".';
      else
        guideText.textContent = 'Теперь выберите ВСЕ столбцы, которые содержат отмеченные "⨯" в выделенных строках, либо же столбцы, которые содержат всего один "⨯" (если вы забыли про какой-то из столбцов на первом этапе). После того, как закончите свой выбор, переходите во вкладку "Пересечение".';
    } else
    if (method === 'cross') {
      centerButton.className = 'button';
      leftButton.className = 'button left-border';
      rightButton.className = 'button button-pressed right-border';  
      guideText.textContent = 'Итоговое отображение импликантной таблицы';    
    }
  },[method, button, matrixSwitch, userMatrix, cleaning]);

  const stateHandler = (i, i2, method) => {
    let newMatrix = _.cloneDeep(userMatrix);

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
      
      setUserMatrix(newMatrix);
    }
    if (method === 'horizontal') {
      let flag = false;
      let flag2 = false;

      for (let k = 0; k < newMatrix[0].length; k++) {
        if (newMatrix[i][k][1] === 1 && newMatrix[i][k][0] === 1)
        {
          flag2 = true;
        }
      }
      for (let k = 0; k < newMatrix[0].length; k++) {
        if (flag2) {
          if (newMatrix[i][k][2] === 0) {
            newMatrix[i][k][2] = 1;
          } else {
            newMatrix[i][k][2] = 0;
          }
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
        setUserMatrix(newMatrix);
      }
    }
    if (method === 'cross') {
      setUserMatrix(newMatrix);
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
          <button id='button-left' className='button left-border' onClick={()=>{setMethod('vertical')}}>
            Столбцы
          </button>
          <button id='button-center' className='button'>
            Строки
          </button>

          <button id='button-right' className='button right-border'>
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
            {userMatrix[index]?.map((elementMatrix, index2) => {
              return <td id={'h'+String(index) +'w'+index2} className='cell' onClick={()=>{if(!matrixSwitch) {stateHandler(index, index2, method);} }}><Latex>${elementMatrix[0] ? '\\times' : ' '}$</Latex></td>
            })}
          </tr>})}

        </div>
        <div style={{display:'flex', flexWrap:'nowrap', alignItems:'center', paddingTop:'1em', gap:'0.5em'}}>
					<input type="checkbox" name="" id="show-cor2" onClick={()=>{setMatrixSwitch(!matrixSwitch);}}/>
					<label for='show-cor2'>Отметить все строки и столбцы автоматически</label>
          <button className='button-medium' onClick={()=>{setCleaning(prev=>!prev)}}>Сброс</button>
				</div>
        
        <div>
          {(method === 'cross') ? <div><Legend/><FinalMatrix userMatrix={userMatrix} matrixSwitch={matrixSwitch} matrix={matrix}/></div> : ''}            
        </div>
                
      </div>
  )
}

export default ImplicationMatrix