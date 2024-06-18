import React, { useEffect, useState, useContext } from 'react'
import Latex from 'react-latex-next';
import { context } from './generalAlgorithm';

const _ = require('lodash');

const FinalMatrix = ({userMatrix, matrixSwitch, matrix}) => {
	const {topSigns2, leftSigns2} = useContext(context);
	const coreDNF = [];
	const coreDNFm = [];
	let minDNFMatrix = [];
	let minDNFMatrix2 = [];
	let leftSigns3 = [];
	let leftSigns3M = [];
	let topSigns3 = [];
	let topSigns3M = [];

  	const oneInColumn = (element, localMethod = 'vertical') => {
		if (localMethod === 'vertical') {
		let cnt = 0;
		for (let k = 0; k < userMatrix.length; k++) {
			if (userMatrix[k][element][0] === 1) {
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
	
	for (let i = 0; i < userMatrix.length; i++) {
		let row = [];
		for (let j = 0; j < userMatrix[0].length; j++) {
			if (userMatrix[i][j][0] === 1 && userMatrix[i][j][1] === 1 && userMatrix[i][j][2] === 1 && oneInColumn(j)) {

				if (!coreDNF.includes(leftSigns2[i])) 
					coreDNF.push(leftSigns2[i]);
			}
			if (userMatrix[i][j][1] === 0 && userMatrix[i][j][2] === 0) {
				if (!leftSigns3.includes(leftSigns2[i]))
					leftSigns3.push(leftSigns2[i])
				if (!topSigns3.includes(topSigns2[j]))
					topSigns3.push(topSigns2[j])
				row.push(userMatrix[i][j]);

			}
		}
		if (row.length > 0) {
			minDNFMatrix.push(row);
		}
	}

	const [userMinDNFMatrix, setUserMinDNFMatrix] = useState(_.cloneDeep(minDNFMatrix));

	for (let i = 0; i < matrix.length; i++) {
		let row = [];
		for (let j = 0; j < matrix[0].length; j++) {
			if (matrix[i][j][0] === 1 && matrix[i][j][1] === 1 && matrix[i][j][2] === 1 && oneInColumn(j)) {

				if (!coreDNFm.includes(leftSigns2[i])) 
					coreDNFm.push(leftSigns2[i]);
			}
			if (matrix[i][j][1] === 0 && matrix[i][j][2] === 0) {
				if (!leftSigns3M.includes(leftSigns2[i]))
					leftSigns3M.push(leftSigns2[i])
				if (!topSigns3M.includes(topSigns2[j]))
					topSigns3M.push(topSigns2[j])
				var el = _.cloneDeep(matrix[i][j]);
				row.push(el);

			}
		}
		if (row.length > 0) {
			minDNFMatrix2.push(row);
		}
	}

	const stateHandler = (h, w) => {
		let UM = _.cloneDeep(userMinDNFMatrix);
		if (!UM[h][0][2]) {
			for (let i = 0; i < UM[h].length; i++) {
				UM[h][i][2] = 1;
			}
		} else if (UM[h][0][2]){
			for (let i = 0; i < UM[h].length; i++) {
				UM[h][i][2] = 0;
			}
		}
		setUserMinDNFMatrix(UM);
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
		return [];
	}

	const [rightAnswer, setRightAnswer] = useState(0);

	let mapWithBrUM = mapWithBraces(coreDNF).join('\\lor \\newline');
	let mapWithBrM = mapWithBraces(coreDNFm).join('\\lor \\newline');

	let coveredArray = [];

	if (JSON.stringify(matrix) === JSON.stringify(userMatrix))
		coveredArray = setCover(limitedMinDNFMatrix);

	for (let i = 0; i < minDNFMatrix2.length; i++) {
		if (coveredArray.includes(i)) {
			for (let j = 0; j < minDNFMatrix2[0].length; j++) {
				minDNFMatrix2[i][j][2] = 1;
			}
		}
	}

	// покраска строк матрицы готовой
	useEffect ( () => {
		if (coveredArray.length!==0) {
			let getElement1 = document.getElementById('table-wrapper');
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

			for (let i = 0; i < minDNFMatrix.length; i++) {
				for (let j = 0; j < minDNFMatrix[0].length; j++) {
					if (rightAnswer) {
						let element = document.getElementById(`second-h${i}w${j}`);
						if (minDNFMatrix2[i][j][2]) {
							element.style.backgroundColor = 'rgb(77, 178, 77)';
						} else {
							element.style.backgroundColor = 'transparent';
						}
					} else {
						let element = document.getElementById(`second-h${i}w${j}`);
						if (userMinDNFMatrix[i][j][2]) {
							element.style.backgroundColor = 'rgb(77, 178, 77)';
						} else {
							element.style.backgroundColor = 'transparent';
						}
					}
				}
			}

		}
	}, [rightAnswer, userMinDNFMatrix])

	let fCore = 'f_{core}';
	let fMin = 'f_{min}';
	const count = (string, symbol) => {
		let counter = 0;
		for (let i = 0; i < string.length; i++) {
			if (string[i] === symbol) {
				counter++;
			}
		}
		return counter;
	}

	let stringIfUserAnswer = '';
	let complexityOfUsersAnswer = count(mapWithBrUM, 'x');

	let stringIfComputedAnswer = '';
	let complexityOfComputedAnswer = count(mapWithBrUM, 'x');;




	let emptyMatrixFlag = false;

	if (userMinDNFMatrix.length === 0) {
		emptyMatrixFlag = true;
		if (rightAnswer !== 1)
			setRightAnswer(1);
	}

	let fullyCoveredFlag = true;

	if (userMinDNFMatrix.length !== 0) {
		for (let i = 0; i < userMinDNFMatrix.length; i++) {
			if (userMinDNFMatrix[i][0][2]) {
				stringIfUserAnswer += `(${leftSigns3[i]})`;

				if (i !== (userMinDNFMatrix.length-2))
					stringIfUserAnswer += '\\lor \\newline';
				else
					stringIfUserAnswer += '\\newline';

				complexityOfUsersAnswer += count(leftSigns3[i], "x");
			}
		}

		for (let j = 0; j<userMinDNFMatrix[0].length; j++) {
			let isCovering = false;
			for (let i = 0; i<userMinDNFMatrix.length; i++) {
				if (userMinDNFMatrix[i][j][2] && userMinDNFMatrix[i][j][0]) {
					isCovering = true;
					break;
				}
			}
			if (!isCovering) {
				fullyCoveredFlag = false;
				break;
			}
		}

	}

	for (let i = 0; i < minDNFMatrix2.length; i++) {
		if (minDNFMatrix2[i][0][2]) {
			stringIfComputedAnswer += `(${leftSigns3[i]})`;

			if (i !== (minDNFMatrix2.length-2))
				stringIfComputedAnswer += '\\lor \\newline';
			else
				stringIfComputedAnswer += '\\newline';

			complexityOfComputedAnswer += count(leftSigns3[i], "x");
		}
	}

    return (
		<div>
			<div></div>
			<br />
			<h2>Ядровая ДНФ пользователя:</h2>
			<Latex> ${fCore} = {mapWithBrUM}$</Latex>
			<br />
			<br />

			<div style={{display: matrixSwitch ? "block" :"none"}}> 
				<h2>Правильная ядровая ДНФ:</h2>
				<Latex> ${fCore} = {mapWithBrM}$</Latex>
			</div>
			<br />
			{JSON.stringify(matrix) !== JSON.stringify(userMatrix) ?
			<div className='Error'>

				<b>Вы выбрали не все области на импликантной матрице!</b>
			</div> :
			<div>

	
				<h1>Матрица из непокрытых областей</h1>

				{!emptyMatrixFlag ?
					<div>
						<p>Выберите минимальное количество строк так, чтобы в каждом столбце стоял хотя бы один "⨯".</p>
						<div id='table-wrapper'className='matrix'>
							<tr>
								<td className='cell'>{' '}</td>
								{topSigns3.map(element => <td className='cell'><Latex>${element}$</Latex></td>)}
							</tr>
							{leftSigns3.map((element, index) => {
								return <tr>
									<td className='cell'><Latex>${element}$</Latex></td>
									{userMinDNFMatrix[index].map((elementMatrix, index2) => {
										return <td id={"second-h"+String(index) + "w"+index2} className='cell' onClick={()=>{if(!rightAnswer) {stateHandler(index, index2);} }}><Latex>${elementMatrix[0] ? '\\times' : ' '}$</Latex></td>
									})}
							</tr>})}
						</div>
					</div>

				:
					<div>
						Упрощенная матрица непокрытых областей <b>не существует</b>, так как все области покрыты
					</div>
				}	
				<br/>
				<div style={{display:(fullyCoveredFlag ? 'none' :'block')}} className='Warn'>
					{fullyCoveredFlag ? '' : 'Предупреждение: Вы выбрали не все строки таким образом, чтобы в каждом столбце стоял хотя бы один "⨯"'}
				</div>
				<div id='show-correct-checkbox'>
					<div style={{display:(emptyMatrixFlag ? 'none' :'flex'), flexWrap:'nowrap', alignItems:'center', paddingTop:'1em', gap:'0.5em'}}>
						<input type="checkbox" name="" id="show-cor" onClick={()=>{setRightAnswer(prev=>!prev)}}/>
						<label for='show-cor'>Отметить строки автоматически</label>
					</div>
					
				</div>
				<h2>Минимальная ДНФ пользователя:</h2>
				<Latex>${fMin}= {(mapWithBrUM.length > 0) ? mapWithBrUM : ''} {(stringIfUserAnswer.length > 0) ? '\\lor \\newline' : ''} {stringIfUserAnswer}$</Latex>
				<p>Сложность ответа пользователя: {complexityOfUsersAnswer}</p>
				
				<p>Сложность правильного ответа: {rightAnswer ? complexityOfComputedAnswer : "?"}</p>
				{(rightAnswer) ?
				(<div>
					{ (complexityOfComputedAnswer === complexityOfUsersAnswer) ? <h2 style={{color: 'rgb(77, 178, 77)'}}> Ваш ответ верный!</h2> : <h2 style={{color: 'darkred'}}> Ваш ответ неверный!</h2>}
					<h2>Найденная автоматически минимальная ДНФ:</h2>
					<Latex>${fMin}= {(mapWithBrUM.length > 0) ? mapWithBrUM : ''} {(stringIfComputedAnswer.length > 0) ? '\\lor \\newline' : ''} {stringIfComputedAnswer}$</Latex>
				</div>) 
				: ''
				}
			</div>}
		</div>
		
	)
}

export default FinalMatrix

//1010111001010100
//11011101