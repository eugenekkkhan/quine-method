import React, { useEffect, useState, createContext } from 'react'
import Latex from 'react-latex-next';
import 'katex/dist/katex.min.css';
import ImplicationMatrix from './implicationMatrix';
import Footer from './footer';

const _ = require('lodash');
let context = createContext(null);
export {context};

const GeneralAlgorithm = (props) => {
  let arrayValues = new Array();
  let value = props.value; 
  let len = props.value.length;

  for (let i = 0; i < props.value.length; i++) {
    arrayValues.push(Number(props.value[i]));
  }

  function decimalToBinaryArray(N) {
    let localVar = (N >>> 0).toString(2);
    while (localVar.length < props.power) {
      localVar = '0' + localVar;
    }

    var localArr = [];
    for (let i = 0; i < props.power; i++) {
      localArr.push(localVar[i]);
    }

    return localArr;
  }

  var xValuesArray = [];

  for (let i = 0; i < len; i++) {
    xValuesArray.push(decimalToBinaryArray(i));
  }

  var topSigns1 = [];
  for (let i = 0; i < props.power; i++) {
    topSigns1.push(`${i+1}`)
  }

  let xValuesArrayFOne = []
  for (let i = 0; i < len; i++) {
    if(props.value[i] == 1) {
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
            localStr += " x_"+ Number(j+1);
          } else {
            localStr += "\\overline" + " x_" + Number(j+1);
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
            localStr += " x_"+(k+1);
          } else {
            localStr += "\\overline x_"+(k+1);
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
    let aCopy = _.cloneDeep(a);
    let bCopy = _.cloneDeep(b);
    let result = '';
    let found = -1;
    let amount = 0, i = 0;
    while ((amount < 2) && (i < a.length)) {
      if ((aCopy[i] !== bCopy[i])) {
        amount++;
        found = i;
      }
      i++;
    }
    if (amount === 1) {
      result = aCopy;
      result[found] = "2";
    }
    return result;
  }
  
  function Abbreviate(data, func) {
    let dataCopy = _.cloneDeep(data);
    while (true) {
      
      let h = [];
      let flag = false;
      for (let i = 0; i < dataCopy.length; i++) {
        
        for (let j = i + 1; j < dataCopy.length; j++) {
            let buf = func(dataCopy[i][0], dataCopy[j][0]);
            if (buf != []) {
              dataCopy[i][1] = true;
              dataCopy[j][1] = true;
              flag = true;
              let object = [buf, false];
              let repeats = false;
              for (let x of h) {
                if (JSON.stringify(x[0]) === JSON.stringify(object[0])) {
                  repeats = true;
                }
              }
              if (!repeats) {
                h.push(object);
              }
          }
        }
        if (!dataCopy[i][1]) {
          let repeats = false;
          for (let x of h) {
            if (JSON.stringify(x[0]) === JSON.stringify(dataCopy[i][0])) {
              repeats = true;
              break;
            }
          }
          if (!repeats) {
            h.push([dataCopy[i][0], dataCopy[i][1]]);
          }
        }
      }
      if (!flag) {
        break;
      }
      dataCopy = h;
    }
    return dataCopy;
  }

  let abbreviatedArray = [];

  for (let i = 0; i < xValuesArrayFOne.length; i++) {
    let localArr = [];
    for (let j = 0; j < xValuesArrayFOne[i].length; j++) {
      localArr.push(xValuesArrayFOne[i][j]);
    }
    abbreviatedArray.push([localArr, false])
  }

  function Abbreviated_dnf(data2)
  {

    data2 = Abbreviate(data2, Gluing);

    
    let arr = [];
    for (let i = 0; i < data2.length; i++) {
      arr.push(data2[i][0]);
    }
    return arr;
  }



  let postAbbreviatedArray = Abbreviated_dnf(abbreviatedArray);

  let topSigns2 = [];

  for (let i = 0; i < xValuesArrayFOne.length; i++) {
    let localStr = "";
    for (let j = 0; j < xValuesArrayFOne[i].length; j++) {
      if (xValuesArrayFOne[i][j] == "1") {
        if (j == xValuesArrayFOne[i].length-1) {
          localStr += "x_"+Number(j+1);
        } else {
          localStr += "x_"+Number(j+1) +"\\land ";
        }
      } else {
        if (j == xValuesArrayFOne[i].length-1) {
          localStr += "\\overline x_"+Number(j+1);
        } else {
          localStr += "\\overline x_"+Number(j+1)+"\\land ";
        }
      }

    }
    topSigns2.push(localStr)
  }

  let leftSigns2 = [];

  for (let i = 0; i < postAbbreviatedArray.length; i++) {
    var localStr = '';
    var formatted = formatArray(postAbbreviatedArray[i]);
    let k = 0;
    let cIndex = 0; // conjucnction index
    while (cIndex != formatted.length) {
      if (postAbbreviatedArray[i][k]=="2") {
        k++;
      } else {
        if (postAbbreviatedArray[i][k]=="1") {
          localStr += " x_"+Number(k+1);
        } else {
          localStr += "\\overline x_"+Number(k+1);
        }
        k++;
        cIndex++;
      }
      if (cIndex != 0 && cIndex != formatted.length && postAbbreviatedArray[i][k] != "2") {
        localStr += "\\land";
      }
    } 
    leftSigns2.push(localStr)
  }

  const [ADNFdisplay, setADNFdisplay] = useState(0);

  useEffect(()=>{
    let ADNF = document.getElementById('adnf-out');
    if (ADNFdisplay) {
      ADNF.style.display = 'block';
    } else {
      ADNF.style.display = 'none';
    }
  },[ADNFdisplay])
  
  return (
  <context.Provider value={{topSigns2, leftSigns2, xValuesArrayFOne, postAbbreviatedArray, value}}>
    <div className='container'>
      <h2>
          Таблица истинности:
      </h2>
      <div className='flex-2-div'>
        <div className='tablewrapper'>
          <div className='table'>
            <tr>
              <td className='cell-fixed'>&nbsp;</td>
              {topSigns1?.map(element => <td className='cell'>x<custom className='lower-index-size'>{element}</custom></td>)}
              <td className='cell'>f</td>
            </tr>
            {xValuesArray.map((innerArray, index) => {
              return <tr><td className='cell-fixed'>{index+1}</td>{innerArray.map(element => <td className={(element == 1) ? 'cell green-bg' : 'cell red-bg'}>{element}</td>)} <td className={(props.value[index]==1) ? 'cell green-bg' : 'cell red-bg'}>{props.value[index]}</td></tr>
            })}
            
          </div>
        </div>
        <div className='actions'>
            <div className="divSDNF">СДНФ:</div>
            <div className='hidden-1'>Совершенная дизъюнктивная нормальная форма</div>
            <div className='latexSDNF'>
              <Latex displayMode={true}>
                $f={((outputSDNF(xValuesArrayFOne).length > 0) ? outputSDNF(xValuesArrayFOne) : "0")}$
              </Latex>
            </div>
            <div style={{display:'flex', flexWrap:'nowrap', alignItems:'center', paddingTop:'0.5em', gap:'0.5em'}} className='gluing'>
              <input type="checkbox" name="" id="show-cor2" style={{cursor: "pointer"}} onClick={()=>{setADNFdisplay(prev=>!prev)}}/>
              <label for='show-cor2' style={{cursor: "pointer"}}>
                Показать правильную сокращенную ДНФ:
              </label>
            </div>
            <div className='hidden-2'>Подробнее в справке</div>
            <div id="adnf-out">
              <Latex>
                $f={((outputADNF(postAbbreviatedArray).length > 0) ? outputADNF(postAbbreviatedArray) : "0")}$
              </Latex>
            </div>
            <p>{(outputADNF(postAbbreviatedArray).length > 0) ? '' : 'Это и есть минимальная ДНФ'}</p>

        </div>
      </div>

      <br/>
      {(outputADNF(postAbbreviatedArray).length > 0) ? <ImplicationMatrix/> : ''}
      
      {/* props = { topSigns2: value } 
      props.topSigns2 === value
      */}
      <Footer/>
    </div>
  </context.Provider>

  )
}

export default GeneralAlgorithm