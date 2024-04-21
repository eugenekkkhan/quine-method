import React, { useEffect, useState, useContext } from 'react'
import Latex from 'react-latex-next';
import { context } from './generalAlgorithm';

const FinalMatrix = ({matrix}) => {
	const {topSigns2, leftSigns2} = useContext(context);
	const coreDNF = [];
	let minDNFMatrix = [];
	let leftSigns3 = [];
	let topSigns3 = [];

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

	for (let i = 0; i < matrix.length; i++) {
		let row = [];
		for (let j = 0; j < matrix[0].length; j++) {
			if (matrix[i][j][0] === 1 && matrix[i][j][1] === 1 && matrix[i][j][2] === 1 && oneInColumn(j)&&matrix[i][j][0]) {

				if (!coreDNF.includes(leftSigns2[i])) 
					coreDNF.push(leftSigns2[i]);
			}
			if (matrix[i][j][1] === 0 && matrix[i][j][2] === 0) {
				if (!leftSigns3.includes(leftSigns2[i]))
					leftSigns3.push(leftSigns2[i])
				if (!topSigns3.includes(topSigns2[j]))
					topSigns3.push(topSigns2[j])
				row.push(matrix[i][j]);

			}
		}
		if (row.length > 0) {
			minDNFMatrix.push(row);
		}
	}

	const mapWithBraces = (array) => array.map(element=>`(${element})`);

	let limitedMinDNFMatrix = minDNFMatrix.map(e1=>e1.map(e2 => e2[0]));

	function allCovered(covered) {
		return covered.every(element => element);
	}

	function setCover(Matrix) {
		if (Matrix.length !== 0) {
			const numSets = Matrix.length;
			const numElements = Matrix[0].length;
			const selectedSets = [];
			const covered = new Array(numElements).fill(0);

			while (!allCovered(covered)) {
				let bestSet = -1;
				let maxUncovered = -1;

				for (let i = 0; i < numSets; i++) {
						let countUncovered = 0;
						for (let j = 0; j < numElements; j++) {
								if (Matrix[i][j] === 1 && !covered[j]) {
										countUncovered++;
								}
						}
						if (countUncovered > maxUncovered) {
								maxUncovered = countUncovered;
								bestSet = i;
						}
				}

				if (bestSet === -1) {
						break;
				}

				selectedSets.push(bestSet);
				for (let j = 0; j < numElements; j++) {
						if (Matrix[bestSet][j] === 1) {
								covered[j] = true;
						}
				}
			}

			return selectedSets;
		}
		return ''
	}

	const [colored, setColored] = useState(0);

	let coveredArray = setCover(limitedMinDNFMatrix);
	let mapWithBr = mapWithBraces(coreDNF).join('\\lor \\newline');

	useEffect ( () => {
		let getElement1 = document.getElementById('table-wrapper');
		console.log(getElement1);
		if (minDNFMatrix.length === 0) {
			getElement1.style.display = 'none';
		} else {
			getElement1.style.display = 'block';
		}

		let getElement2 = document.getElementById('show-correct-checkbox');
		if (minDNFMatrix.length === 0) {
			getElement2.style.display = 'none';
		} else {
			getElement2.style.display = 'block';
		}

		for (let i = 0; i < coveredArray.length; i++) {
			let localI = coveredArray[i];
			for (let j = 0; j < minDNFMatrix[0].length; j++) {
				let element = document.getElementById(`second-h${localI}w${j}`);
				if (element.style.backgroundColor!=='rgb(77, 178, 77)' && colored)
					element.style.backgroundColor = 'rgb(77, 178, 77)';
				else if (element.style.backgroundColor==='rgb(77, 178, 77)')
					element.style.backgroundColor = 'transparent';
			}
		}
	}, [colored])

	let fCore = 'f_{core}';
	let fMin = 'f_{min}';
  return (
		<div>
			<div></div>
			<br />
			<h2>Ядровая ДНФ:</h2>
			<Latex> ${fCore} = {mapWithBr}$</Latex>
			<br /><br /><br />

			<h1>Матрица из непокрытых областей</h1>
			<p>Выбери минимальное количество строк так, чтобы в каждом столбце стоял хотя бы один "⨯".</p>
			<div id='table-wrapper'className='matrix'>
				<tr>
					<td className='cell'>&nbsp;</td>
					{topSigns3.map(element => <td className='cell'><Latex>${element}$</Latex></td>)}
				</tr>
				{leftSigns3.map((element, index) => {
					return <tr>
						<td className='cell'><Latex>${element}$</Latex></td>
						{minDNFMatrix[index].map((elementMatrix, index2) => {
							return <td id={"second-h"+String(index) + "w"+index2} className='cell'><Latex>${elementMatrix[0] ? '\\times' : ' '}$</Latex></td>
						})}
				</tr>})}
			</div>
			<div id='show-correct-checkbox'>
				<div style={{display:'flex', flexWrap:'nowrap', alignItems:'center', paddingTop:'1em', gap:'0.5em'}}>
					<input type="checkbox" name="" id="show-cor" onClick={()=>{setColored(prev=>!prev)}}/>
					<label for='show-cor'>Отметить правильные строки</label>
				</div>

				
			</div>
			<h2>Минимальная ДНФ:</h2>
			<Latex>${fMin}= {(mapWithBr.length > 0)? mapWithBr : ''} {(mapWithBr.length > 0 && coveredArray.length > 0 && colored) ? '\\lor \\newline' : ''} {(coveredArray.length > 0 && colored) ? `${coveredArray.map((_e, i)=>`(${leftSigns3[i]})`).join('\\lor \\newline')}` : ''}$</Latex>
		</div>
		
  )
}

export default FinalMatrix

//1010111001010100
