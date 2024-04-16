import React from 'react'

const Legend = () => {
  return (
    <div style={{display:'flex', alignContent:'center', alignItems: 'center', justifyContent: 'center', gap:'.5em', fontSize:'small'}}>
        <p style={{backgroundColor:'rgb(200, 180, 0)', border:'2px solid black'}}>&nbsp;&nbsp;&nbsp;</p>
        <p>Члены ядровой ДНФ</p>
        <p style={{backgroundColor:'rgb(152, 244, 152)', border:'2px solid black'}}>&nbsp;&nbsp;&nbsp;</p>
        <p>Вычеркнутые строки и столбцы</p>
        <p style={{backgroundColor:'rgb(77, 178, 77)', border:'2px solid black'}}>&nbsp;&nbsp;&nbsp;</p>
        <p>Пересечение строк и столбцов</p>
    </div>
  )
}

export default Legend