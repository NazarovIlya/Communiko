import { Container } from 'semantic-ui-react';
import { NavigationBar } from './NavigationBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../components/home/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
  const location = useLocation();

  if (location.pathname === '/') {
    return (<><HomePage /></>);
  } else {
    return (<>
      <ToastContainer
        position='top-right'
        autoClose={1000}
      />
      <NavigationBar />
      <Container style={{ marginTop: '5em' }}>
        <Outlet />
      </Container >
    </>)
  }
}

export default observer(App);