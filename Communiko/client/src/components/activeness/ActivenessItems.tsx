import { Grid } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { ActivenessItem } from "./ActivenessItem";
import { ActivenessDetails } from "../details/ActivenessDetails";

interface PropsActivenessItems {
  items: Activeness[];
  selectItem: Activeness | undefined;
  viewActiveness: (id: string) => void;
  cancelViewActiveness: () => void;
}

export function ActivenessItems({ items, selectItem, viewActiveness, cancelViewActiveness }
  : PropsActivenessItems) {
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
          {selectItem && <ActivenessDetails item={selectItem} cancelViewActiveness={cancelViewActiveness} />}
        </Grid.Column>
      </Grid>
    </div>
  );
}