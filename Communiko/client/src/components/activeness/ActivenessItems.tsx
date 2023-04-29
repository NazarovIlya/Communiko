import { Grid } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { ActivenessItem } from "./ActivenessItem";

interface PropsActivenessItems {
  items: Activeness[];
}

export function ActivenessItems({ items }: PropsActivenessItems) {
  return (
    <div>
      <Grid style={{ color: 'white' }}>
        <Grid.Column width='6'>
          {
            items.map(e => (
              <div key={e.id}>
                <ActivenessItem activenessItem={e} />
              </div>
            ))
          }
        </Grid.Column>
      </Grid>
    </div>
  );
}