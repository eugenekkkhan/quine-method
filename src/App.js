import './App.css';
import React from 'react';
import checkValue from './components/checkValue';

function App() {
  const [name, setName] = React.useState('');

  return (
    <div className="App">

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
        <p className='bold'>
            Введите вектор функции:
          </p>
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
        {checkValue(name)}
      </div>

    </div>
  );
}

export default App;
