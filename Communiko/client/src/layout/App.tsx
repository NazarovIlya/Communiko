import { Container } from 'semantic-ui-react';
import { NavigationBar } from './NavigationBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    < >
      <NavigationBar />
      <Container style={{ marginTop: '5em' }}>
        <Outlet />
      </Container >
    </ >
  );
}

export default observer(App);