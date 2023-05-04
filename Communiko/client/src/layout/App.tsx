import { Container } from 'semantic-ui-react';
import { NavigationBar } from './NavigationBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../components/home/HomePage';

function App() {
  const location = useLocation();

  if (location.pathname === '/') {
    return (<><HomePage /></>);
  } else {
    return (<>
      <NavigationBar />
      <Container style={{ marginTop: '5em' }}>
        <Outlet />
      </Container >
    </>)
  }
}

export default observer(App);