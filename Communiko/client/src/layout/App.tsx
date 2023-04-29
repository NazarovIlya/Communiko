import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios'

import { Activeness } from "../model/Activeness";
import { Button, Container, Header } from 'semantic-ui-react';
import { NavigationBar } from './NavigationBar';
import { ActivenessItems } from '../components/activeness/ActivenessItems';

function App() {
  const [activeness, setActiveness] = useState<Activeness[]>([]);
  const [selectedActiveness, setViewActiveness] = useState<Activeness | undefined>(undefined);

  useEffect(() => {
    axios.get<Activeness[]>('http://localhost:11222/api/Activeness/')
      .then(res => {
        setActiveness(res.data);
      })
  }, []);

  function handleViewActiveness(id: string) {
    setViewActiveness(activeness.find(e => e.id === id));
  }
  function handleCancelViewActiveness() {
    setViewActiveness(undefined);
  }

  return (
    <div>
      <NavigationBar />
      <Container style={{ marginTop: '5em' }}>
        <ActivenessItems items={activeness}
          selectItem={selectedActiveness}
          viewActiveness={handleViewActiveness}
          cancelViewActiveness={handleCancelViewActiveness}
        />
      </Container>
    </div >
  );
}

export default App;