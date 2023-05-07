import { Grid, Icon, Segment } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { observer } from "mobx-react-lite";

interface PropsActivenessItem {
  item: Activeness;
}

export default observer(function ActivenessDetailsInfo({ item }: PropsActivenessItem) {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{item.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{item.pointTime}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='marker' size='large' color='grey' />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{item.location}, {item.city}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  )
});