import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import { NavigationBar } from './NavigationBar';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../components/loading/LoadingComponent';
import { useRepository } from '../Repository/Repository';
import ActivenessItems from '../components/activeness/ActivenessItems';

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
        <ActivenessItems />
      </Container >
    </ >
  );
}

export default observer(App);