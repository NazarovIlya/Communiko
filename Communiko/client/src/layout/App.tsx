import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { ActivenessItem } from '../components/activeness/ActivenessItem';
import { Activeness } from "../model/Activeness";
import { Button, Header } from 'semantic-ui-react';
import { NavigationBar } from './NavigationBar';

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
      <NavigationBar />
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