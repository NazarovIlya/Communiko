import React, { useContext, useEffect, useState } from 'react';

import { Activeness } from "../model/Activeness";
import { Button, Container } from 'semantic-ui-react';
import { NavigationBar } from './NavigationBar';
import { ActivenessItems } from '../components/activeness/ActivenessItems';

import { v4 as uuidv4 } from 'uuid';
import client from '../api/requestClient';
import { useStore } from '../Repository/CurrentRepository';
import { observer } from 'mobx-react-lite';

function App() {

  const { repo } = useStore();

  const [activeness, setActiveness] = useState<Activeness[]>([]);
  const [selectedActiveness, setViewActiveness] = useState<Activeness | undefined>(undefined);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    client.Activities.items()
      .then(res => setActiveness(res))
  }, []);

  function handleViewActiveness(id: string) {
    setViewActiveness(activeness.find(e => e.id === id));
  }
  function handleCancelViewActiveness() {
    setViewActiveness(undefined);
    handleCloseForm();
  }

  function handleOpenForm(id?: string) {
    if (id) { handleViewActiveness(id); }
    else { handleCancelViewActiveness(); }
    setEditMode(true);
  }

  function handleCloseForm() {
    setEditMode(false);
  }

  function handleEditOrCreateActiveness(item: Activeness) {
    if (item.id) {
      client.Activities.update(item).then(() => {
        setActiveness([...activeness.filter(x => x.id !== item.id), item]);
      });
    } else {
      item.id = uuidv4();
      client.Activities.create(item).then(() => {
        setActiveness([...activeness, item]);
      });
    }

    setEditMode(false);
    setViewActiveness(item);
  }

  function handleRemoveActiveness(id: string) {
    client.Activities.remove(id)
      .then(() => {
        setActiveness([...activeness.filter(x => x.id !== id)]);
        setViewActiveness(undefined);
      });
  }

  return (
    <div>
      <NavigationBar openForm={handleOpenForm} />
      <Container style={{ marginTop: '5em' }}>
        <ActivenessItems items={activeness}
          selectItem={selectedActiveness}
          viewActiveness={handleViewActiveness}
          cancelViewActiveness={handleCancelViewActiveness}
          editMode={editMode}
          formOpen={handleOpenForm}
          formClose={handleCloseForm}
          editOrCreate={handleEditOrCreateActiveness}
          removeActiveness={handleRemoveActiveness}
        />
      </Container >
    </div >
  );
}

export default observer(App);