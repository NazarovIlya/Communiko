import { Grid } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { useStore } from "../../Repository/Repository";
import { observer } from "mobx-react-lite";
import ActivenessItem from "./ActivenessItem";
import ActivenessDetails from "../details/ActivenessDetails";
import ActivenessEditForm from "./ActivenessEditForm";

interface PropsActivenessItems {
  editOrCreate: (id: Activeness) => void;
  removeActiveness: (id: string) => void;
}

export default observer(function ActivenessItems(
  {
    editOrCreate,
    removeActiveness
  }: PropsActivenessItems) {
  const { repo } = useStore();
  const {
    editMode,
    activities,
    selectedActiveness,
  } = repo;

  return (
    <div>
      <Grid style={{ color: 'white' }}>
        <Grid.Column width='10'>
          {
            activities.map(e => (
              <div key={e.id}>
                <ActivenessItem activenessItem={e}
                  removeActiveness={removeActiveness} />
              </div>
            ))
          }
        </Grid.Column>
        <Grid.Column width='6'>
          {selectedActiveness && !editMode && < ActivenessDetails
            removeActiveness={removeActiveness}
          />}
          {editMode && <ActivenessEditForm
            editOrCreate={editOrCreate}
          />}
        </Grid.Column>
      </Grid>
    </div >
  );
})