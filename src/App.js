import './App.css';
import React from 'react';
import checkValue from './components/checkValue';
import Helmet

function App() {
  const [name, setName] = React.useState('');

  return (
    <div className="App">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      </Helmet>

      <nav className="nav">
        <p className='bold dark-green'>Quine</p>
        <p className='light-green'>Online</p>
      </nav>
      <div className='main'>
        <p>
          Введите вектор функции:
        </p>
        <input 
          placeholder='Например: 11100011'
          value={name}
          onChange={event => {
            setName(event.target.value);
          }}
        />
      </div>
      <p>
        {checkValue(name)}
      </p>
      <p>
        {}
      </p>
    </div>
  );
}

export default App;
