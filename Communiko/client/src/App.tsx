import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  const [activeness, setActiveness] = useState();
  useEffect(() => {
    axios.get('http://localhost:11222/api/Activeness/')
      .then(res => {
        console.log(res);
        setActiveness(res.data);
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;
