import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { Activeness, ActivenessItem } from './ActivenessItem';
import { Button, Header } from 'semantic-ui-react';

function App() {
  const [activeness, setActiveness] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:11222/api/Activeness/')
      .then(res => {
        setActiveness(res.data);
      })
  }, []);

  return (
    <div>
      <Header as='h1' >
        <img src='images/logo.png' /><label>Communiko project</label>
      </Header>

      {
        activeness.map((e: Activeness) => (
          <div key={e.id}>
            <ActivenessItem activenessItem={e} />
          </div>
        ))
      }

    </div>
  );
}

export default App;