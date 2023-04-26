import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Activeness, ActivenessItem } from './ActivenessItem';

function App() {
  const [activeness, setActiveness] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:11222/api/Activeness/')
      .then(res => {
        setActiveness(res.data);
      })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {
          activeness.map((e: Activeness) => (
            <div key={e.id}>
              <label htmlFor="cdc"></label>
              <ActivenessItem activenessItem={e} />
            </div>
          ))
        }
      </header>
    </div>
  );
}

export default App;