'use strict';
import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react'
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';

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

  let xValuesArrayFOne = []
  for (let i = 0; i < len; i++) {
    if(value[i] == 1) {
      xValuesArrayFOne.push(xValuesArray[i]);
    }
  }
  function outputSDNF(inputArr) {
    var str = '';
    for (let i = 0; i < inputArr.length; i++) {
      var localStr = ''
      for (let j = 0; j < inputArr[i].length; j++) {
        
        if (inputArr[i] != -1) {
          if (inputArr[i][j] == 1) {
            localStr += " x_"+ j;
          } else {
            localStr += "\\overline" + " x_" + j;
          }
          if (j < inputArr[i].length-1) {
            localStr += "\\land"
          }
        }

      }
      str += "("+localStr+")";
      if (i < inputArr.length - 1) {
        str+=" \\lor \\newline";
      }
    }
    return str;
  }

  function outputADNF(inputArr) {
    var str = '';
    for (let i = 0; i < inputArr.length; i++) {
      var localStr = '';
      for (let j = 0; j < inputArr[i].length; j++) {

        if (inputArr[i][j] != '2') {
            if (inputArr[i][j] == '1') {
              localStr += " x_"+ j;
            } else {
              localStr += "\\overline" + " x_" + j;
            }
        }

      }
      str += "("+localStr+")";
      if (i < inputArr.length - 1) {
        str+=" \\lor \\newline";
      }
      console.log(str);
    }
    return str;
  }

  function bracketing(a, b) {
    let counter = 0
    let index = -1;
    let newValue;
    for (let i = 0; i < a.length; i++) {
      if (a[i] != b[i]) {
        counter++;
        index = i;
      }
    }
    if (counter == 1) {
      newValue = a;
      newValue[index] = '2';
      return newValue;
    } else {
      return -1;
    }
  }

  let newArray = []
  for (let i = 0; i < xValuesArrayFOne.length-1; i++) {
    for (let j = i+1; j < xValuesArrayFOne.length; j++) {
      let arrayElement = bracketing(xValuesArrayFOne[i],xValuesArrayFOne[j]);
      if (arrayElement !== -1) {
        newArray.push(arrayElement);
      }
    } 
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
          <div className='latexSDNF'>
            <Latex displayMode={true}>
              $f={outputSDNF(xValuesArrayFOne)}$
            </Latex>
          </div>

          <div className='gluing'>Склеивание:</div>
          <div className='hidden-2'>Мы выносим за скобки элементарные конъюнкции, которые отличаются всего на одно значение, чтобы сократить этот отличный элемент. Данный процесс называется склеиванием</div>
          <Latex>$f={outputADNF(newArray)}$</Latex>
      </div>
    </div>
  )
}

export default generalAlgorithm