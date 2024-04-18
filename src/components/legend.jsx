import React, { useEffect } from 'react'

const Legend = () => {
  return (
    <div style={{display:'flex', alignContent:'center', alignItems:'end', justifyContent: 'center', gap:'1em', fontSize:'x-small'}} className='bold'>
      <div id='first-legend-element'>
        <p>Члены ядровой ДНФ</p>
        <p style={{backgroundColor:'rgb(200, 180, 0)', border:'2px solid black', borderRadius:'3px'}}>&nbsp;&nbsp;&nbsp;</p>
      </div>
      <div id='second-legend-element'>
        <p>Вычеркнутые строки и столбцы</p>
        <p style={{backgroundColor:'rgb(152, 244, 152)', border:'2px solid black', borderRadius:'3px'}}>&nbsp;&nbsp;&nbsp;</p>

      </div>
      <div id='third-legend-element'>
        <p>Пересечение строк и столбцов</p>
        <p style={{backgroundColor:'rgb(77, 178, 77)', border:'2px solid black', borderRadius:'3px'}}>&nbsp;&nbsp;&nbsp;</p>

      </div>
      <div id='fourth-legend-element'>
        <p>Элементы МДНФ</p>
        <p style={{backgroundColor:'rgb(255,255,255)', border:'2px solid black', borderRadius:'3px'}}>&nbsp;&nbsp;&nbsp;</p>

      </div>
    </div>
  )
}

export default Legend