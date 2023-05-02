import { useEffect } from 'react';

import { Activeness } from "../model/Activeness";
import { Container } from 'semantic-ui-react';
import { NavigationBar } from './NavigationBar';
import { observer } from 'mobx-react-lite';
import LoadingComponent from '../components/loading/LoadingComponent';
import { useStore } from '../Repository/Repository';
import ActivenessItems from '../components/activeness/ActivenessItems';

function App() {

  const { repo } = useStore();

  useEffect(() => {
    repo.loadActivities();
  }, [repo]);

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