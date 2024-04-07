import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react'

const generalAlgorithm = (value, power) => {
  let arrayValues = new Array(); 
  let len = value.length;

  for (let i = 0; i < value.length; i++) {
    arrayValues.push(Number(value[i]));
  }

  function decimalToBinaryArray(N) {
    let localVar = (N >>> 0).toString(2);
    while (localVar.length < power) {
      localVar = '0' + localVar;
    }

    var localArr = [];
    for (let i = 0; i < power; i++) {
      localArr.push(localVar[i]);
    }

    return localArr;
  }

  var xValuesArray = [];

  for (let i = 0; i < len; i++) {
    xValuesArray.push(decimalToBinaryArray(i));
  }

  var topSigns = [];
  for (let i = 0; i < power; i++) {
    topSigns.push(`${i}`)
  }

  var xValuesArrayFOne = []
  for (let i = 0; i < len; i++) {
    if(value[i] == 1) {
      xValuesArrayFOne.push(xValuesArray[i]);
    }
  }

  function SDNF(xValuesArrayFOne) {
    var str = '';
    for (let i = 0; i < xValuesArrayFOne.length; i++) {
      var localStr = ''
      for (let j = 0; j < power; j++) {

        if (xValuesArrayFOne[i][j] == 1) {
          localStr += "x"+ j;
        } else {
          localStr += "¬" + "x" + j;
        }
        if (j < power-1) {
          localStr += "∧"
        }
      }
      str += "("+localStr+")";
      if (i < xValuesArrayFOne.length - 1) {
        str+=" ∨ ";
      }
    }
    return str;
  }

  return (
    <div className='container'>
      <div className='tablewrapper'>
        <div className='table'>
          <tr>
            <td className='cell'>&nbsp;</td>
            {topSigns.map(element => <td className='cell'>x<custom className='lower-index-size'>{element}</custom></td>)}
            <td className='cell'>f</td>
          </tr>
          {xValuesArray.map((innerArray, index) => {
            return <tr><td className='cell'>{index+1}</td>{innerArray.map(element => <td className={(element == 1) ? 'cell green-bg' : 'cell red-bg'}>{element}</td>)} <td className={(value[index]==1) ? 'cell green-bg' : 'cell red-bg'}>{value[index]}</td></tr>
          })}
          
        </div>
      </div>
      <div className='actions'>
          <div className="divSDNF">СДНФ:</div>
          <div className='hidden-1'>Совершенная дизъюнктивная нормальная форма</div>
          F={
            SDNF(xValuesArrayFOne)
          }

      </div>
    </div>
  )
}

export default generalAlgorithm