import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { NavigationBar } from './NavigationBar';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../components/loading/LoadingComponent';
import { useRepository } from '../repository/Repository';
import ActivenessItems from '../components/activeness/ActivenessItems';
import { Outlet } from 'react-router-dom';

function App() {
  const { repo } = useRepository();
  useEffect(() => { repo.loadActivities(); }, [repo]);

  if (repo.loadingInit) {
    return <LoadingComponent text='Please wait...' />;
  }

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