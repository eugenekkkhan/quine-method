import './App.css';
import ReactDOM, { useState, useEffect, createElement } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Helmet } from "react-helmet";
import Favicon from "react-favicon"
import CheckValue from './components/checkValue';
import Help from './components/help';


function App() {
  const [text, setText] = useState('');
  const [help, setHelp] = useState(false);

  const handleChange = (event) => {
    var tempText = event.target.value;
    setText(tempText);

  }


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
    <div className="App" id='app'>
      <Favicon url='./qo.png'/>

      <Helmet>

        {document.addEventListener('gesturestart', function(event) {
          event.preventDefault();
        })}

      </Helmet>

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
          <a className='light-green' onClick={()=>{setHelp(prev=>!prev)}}>
            Справка {Number(help)?"(закрыть)":""}
          </a>
        </div>
      </nav>
      <div className='main top-padding'>
        <h1>
            Введите вектор функции:
        </h1>
      </div>
      <div className='main'>
        <p>f = (</p>
        <input 
          placeholder='00101111'
          value={text}
          onChange={handleChange}
        />
        <p>)</p>
        <button className={(text !== "") ? 'button-small' : 'button-small button-off'} onClick={()=>{if(text !== "") setText("")}}>Сброс</button>
      </div>
      <div>
        <CheckValue value={text}/>
      </div>
    </div>
  );
}

export default App;
