import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios'

import { Activeness } from "../model/Activeness";
import { Button, Container, Header } from 'semantic-ui-react';
import { NavigationBar } from './NavigationBar';
import { ActivenessItems } from '../components/activeness/ActivenessItems';

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
      <Container style={{ marginTop: '5em' }}>
        <ActivenessItems items={activeness} />
      </Container>
    </div >
  );
}

export default App;