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
      let arr = [];
      for (let j = 0; j < xValuesArray[i].length; j++){
        arr.push(xValuesArray[i][j])
      }
      xValuesArrayFOne.push(arr);
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

  function formatArray(arr) {
    const filtered = arr.filter(item => item != "2");
    return filtered.join("");
  }

  function outputADNF(inputArr) {
    var str = '';
    for (let i = 0; i < inputArr.length; i++) {
      var localStr = '';
      var formatted = formatArray(inputArr[i]);
      let k = 0;
      let cIndex = 0; // conjucnction index
      while (cIndex != formatted.length) {
        if (inputArr[i][k]=="2") {
          k++;
        } else {
          if (inputArr[i][k]=="1") {
            localStr += " x_"+k;
          } else {
            localStr += "\\overline x_"+k;
          }
          k++;
          cIndex++;
        }
        if (cIndex != 0 && cIndex != formatted.length && inputArr[i][k] != "2") {
          localStr += "\\land";
        }
      }    
      
      str += "("+localStr+")";
      if (i < inputArr.length - 1) {
        str+=" \\lor \\newline";
      }
      
    }

    return str;
  }

  function Gluing(a, b) {
    let result = '';
    let found = -1;
    let kol = 0, i = 0;
    while ((kol < 2) && (i < a.length)) {
      if ((a[i] !== b[i])) {
        kol++;
        found = i;
      }
      i++;
    }
    if (kol === 1) {
      result = a;
      result[found] = "2";
    }
    return result;
  }
  
  function Absorption(a, b) {
    let result = [];
    let found = -1;
    let amount = 0, i = 0;
    while ((amount < 2) && (i < a.length)) {
      if (((a[i] == "2") && (b[i] != "2")) || ((b[i] == "2") && (a[i] != "2"))) {
        amount++;
        found = i;
      } else if ((a[i] != "2") && (b[i] != "2") && (a[i] != b[i])) {
        return result;
      }
      i++;
    }
    if (amount === 1) {
      result = a;
      result[found] = "2";
    }
    return result;
  }
  
  // [[[1,0,0], false], [[1,0,0], false]]
  function Abbreviate(data, function_) {
    while (true) {
      let h = [];
      let flag = false;
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (i != j) {
            let buf = function_(data[i][0], data[j][0]);
            if (buf != []) {
              data[i][1] = true;
              data[j][1] = true;
              flag = true;
              let object = [buf, false];
              let X3 = false;
              for (let x of h) {
                if (x[0] === object[0]) {
                  X3 = true;
                  break;
                }
              }
              if (!X3) {
                h.push(object);
              }
            }
          }
        }
        if (!data[i][1]) {
          let X3 = false;
          for (let x of h) {
            if (x[0] === data[i][0]) {
              X3 = true;
              break;
            }
          }
          if (!X3) {
            h.push([data[i][0], data[i][1]]);
          }
        }
      }
      if (!flag) {
        break;
      }
      data = h;
    }
    return data;
  }

  let abbreviatedArray = [];

  for (let i = 0; i < xValuesArrayFOne.length; i++) {
    let localArr = [];
    for (let j = 0; j < xValuesArrayFOne[i].length; j++) {
      localArr.push(xValuesArrayFOne[i][j]);
    }
    abbreviatedArray.push([localArr, false])
  }

  function Abbreviated_dnf(data)
  {

    data = Abbreviate(data, Gluing);
    

    let arr = [];
    for (let i = 0; i < data.length; i++) {
      arr.push(data[i][0]);
    }
    return arr;
  }

  console.log(xValuesArrayFOne);

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
          <Latex>$f={outputADNF(Abbreviated_dnf(abbreviatedArray))}$</Latex>

          <div className='warn'>{}</div>

      </div>
    </div>
  )
}

export default generalAlgorithm