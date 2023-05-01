import { Grid } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { ActivenessItem } from "./ActivenessItem";
import { ActivenessDetails } from "../details/ActivenessDetails";
import { ActivenessEditForm } from "./ActivenessEditForm";

interface PropsActivenessItems {
  items: Activeness[];
  selectItem: Activeness | undefined;
  viewActiveness: (id: string) => void;
  cancelViewActiveness: () => void;
  editMode: boolean;
  formOpen: (id: string) => void;
  formClose: () => void;
  editOrCreate: (id: Activeness) => void;
}

export function ActivenessItems(
  { items,
    selectItem,
    viewActiveness,
    cancelViewActiveness,
    editMode,
    formOpen,
    formClose,
    editOrCreate
  }: PropsActivenessItems) {
  return (
    <div>
      <Grid style={{ color: 'white' }}>
        <Grid.Column width='10'>
          {
            items.map(e => (
              <div key={e.id}>
                <ActivenessItem activenessItem={e} selected={viewActiveness} />
              </div>
            ))
          }
        </Grid.Column>
        <Grid.Column width='6'>
          {selectItem && !editMode && < ActivenessDetails
            item={selectItem}
            cancelViewActiveness={cancelViewActiveness}
            formOpen={formOpen}
          />}
          {editMode && <ActivenessEditForm
            formClose={formClose}
            selectItem={selectItem}
            editOrCreate={editOrCreate}
          />}
        </Grid.Column>
      </Grid>
    </div>
  );
}