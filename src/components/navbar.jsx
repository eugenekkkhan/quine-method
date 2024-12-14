import React, { useEffect, useState } from 'react'
import Help from './help';

const Navbar = () => {
	const [help, setHelp] = useState(false);


  useEffect(()=>{
    const bgElement = document.getElementById('help-bg');
    const infoElement = document.getElementById('help-window');
    bgElement.style.display = 'none';
    infoElement.style.display = 'none';
    if (help) {
      bgElement.style.display = 'block';
      infoElement.style.display = 'block';

    } else {
      
    }
  }, [help])

  return (
	<>
		<div id='help-bg'></div>

		<div className='help-wraper'>
			<div id='help-window'>
				<Help/>
			</div>
		</div>
		
    <nav className="nav">
			<div className='left-nav'>
				<p className='bold dark-green'>Quine</p>
				<p className='light-green'>Online</p>
			</div>
			<div className='right-nav'>
				<a className='light-green' onClick={()=>{setHelp(prev=>!prev)}} style={{cursor: "pointer"}}>
					Справка {Number(help)?"(закрыть)":""}
				</a>
			</div>
		</nav>
	</>
  )
}

export default Navbar