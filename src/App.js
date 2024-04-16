import './App.css';
import React from 'react';
import { Helmet } from "react-helmet";
import CheckValue from './components/checkValue';


function App() {
  const [name, setName] = React.useState('');

  return (
    <div className="App">
      
      <Helmet>

      {document.addEventListener('gesturestart', function(event) {
        event.preventDefault();
      })}

      </Helmet>


      <nav className="nav">
        <div className='left-nav'>
          <p className='bold dark-green'>Quine</p>
          <p className='light-green'>Online</p>
        </div>
        <div className='right-nav'>
          <p className='light-green'>
            Справка
          </p>
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
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
        />
        <p>)</p>
      </div>
      <div>
        <CheckValue value={name}/>
      </div>

    </div>
  );
}

export default App;
