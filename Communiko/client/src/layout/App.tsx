import { Container } from 'semantic-ui-react';
import NavigationBar from './NavigationBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../components/home/HomePage';
import { ToastContainer } from 'react-toastify';
import { repository } from '../repository/Repository';
import { useEffect } from 'react';
import LoadingComponent from '../components/loading/LoadingComponent';
import ModalForm from '../components/modals/ModalForm';

function App() {
  const location = useLocation();
  const { authRepo, userRepo } = repository;

  useEffect(() => {
    if (authRepo.token) {
      userRepo.getCurrentUser().finally(() => authRepo.setAppLoaded())
    } else {
      authRepo.setAppLoaded()
    }
  }, [authRepo, userRepo])

  if (!authRepo.appLoaded) return <LoadingComponent text='Loading app...' />

  if (location.pathname === '/') {
    return (
      <>
        <ModalForm />
        <HomePage />
      </>);
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