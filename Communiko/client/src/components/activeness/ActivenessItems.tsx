import { Grid } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { useStore } from "../../Repository/Repository";
import { observer } from "mobx-react-lite";
import ActivenessItem from "./ActivenessItem";
import ActivenessDetails from "../details/ActivenessDetails";
import ActivenessEditForm from "./ActivenessEditForm";

export default observer(function ActivenessItems() {
  const { repo } = useStore();
  const {
    editMode,
    activities,
    selectedActiveness
  } = repo;

  return (
    <div>
      <Grid style={{ color: 'white' }}>
        <Grid.Column width='10'>
          {activities.map(e => <ActivenessItem activenessItem={e} />)}
        </Grid.Column>
        <Grid.Column width='6'>
          {selectedActiveness && !editMode && < ActivenessDetails />}
          {editMode && <ActivenessEditForm />}
        </Grid.Column>
      </Grid>
    </div >
  );
})