import './App.css';
import { useState, useEffect } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Helmet } from "react-helmet";
import Favicon from "react-favicon"
import CheckValue from './components/checkValue';
import Navbar from './components/navbar';

function App() {
  const [text, setText] = useState('');

  const handleChange = (event) => {
    var tempText = event.target.value;
    setText(tempText);

  }

  return (
    <div className="App" id='app'>
      <Favicon url='./qo.png'/>

      <Helmet>

        {document.addEventListener('gesturestart', function(event) {
          event.preventDefault();
        })}

      </Helmet>

      <Navbar/>
      
      <div className='main top-padding'>
        <h2>
            Введите вектор функции:
        </h2>
      </div>
      <div className='main'>
        <p>f = (</p>
        <input 
          placeholder='00101111'
          value={text}
          onChange={handleChange}
        />
        <p>)</p>
        <button className={(text !== "") ? 'button-small' : 'button-small button-off'} style={{cursor: "pointer"}} onClick={()=>{if(text !== "") setText("")}}>Сброс</button>
      </div>
      <div>
        <CheckValue value={text}/>
      </div>
    </div>
  );
}

export default App;
