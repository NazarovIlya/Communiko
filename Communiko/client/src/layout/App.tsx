import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { ActivenessItem } from '../components/activeness/ActivenessItem';
import { Activeness } from "../model/Activeness";
import { Button, Header } from 'semantic-ui-react';

function App() {
  const [activeness, setActiveness] = useState<Activeness[]>([]);
  useEffect(() => {
    axios.get<Activeness[]>('http://localhost:11222/api/Activeness/')
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
        activeness.map(e => (
          <div key={e.id}>
            <ActivenessItem activenessItem={e} />
          </div>
        ))
      }
    </div>
  );
}

export default App;