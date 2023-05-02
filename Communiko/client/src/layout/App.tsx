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

  function handleEditOrCreateActiveness(item: Activeness) {
    // if (item.id) {
    //   client.Activities.update(item).then(() => {
    //     setActiveness([...activeness.filter(x => x.id !== item.id), item]);
    //   });
    // } else {
    //   item.id = uuidv4();
    //   client.Activities.create(item).then(() => {
    //     setActiveness([...activeness, item]);
    //   });
    // }

    // setEditMode(false);
    // setViewActiveness(item);
  }

  function handleRemoveActiveness(id: string) {
    // client.Activities.remove(id)
    //   .then(() => {
    //     setActiveness([...activeness.filter(x => x.id !== id)]);
    //     setViewActiveness(undefined);
    //   });
  }
  if (repo.loadingInit) {
    return <LoadingComponent text='Please wait...' />;
  }

  return (
    < >
      <NavigationBar />
      <Container style={{ marginTop: '5em' }}>
        <ActivenessItems
          editOrCreate={handleEditOrCreateActiveness}
          removeActiveness={handleRemoveActiveness}
        />
      </Container >
    </ >
  );
}

export default observer(App);