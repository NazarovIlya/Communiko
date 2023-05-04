import { Button, Card, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { useRepository } from "../../repository/Repository";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface PropsActivenessItem {
  activenessItem: Activeness
}

export default observer(function ActivenessItem(
  { activenessItem }: PropsActivenessItem) {
  let activity = activenessItem;
  return (
    <Segment.Group color={{ color: 'red' }}>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header
                as={Link}
                to={`/activenessItems/${activenessItem.id}`}>
                {activity.title}
              </Item.Header>
              <Item.Description>Author</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Label>
          <Icon name='clock' />
          {activity.pointTime}
        </Label>
        <Label>
          <Icon name='marker' />
          {activity.location}
        </Label>
      </Segment>
      <Segment secondary>
        List
      </Segment>
      <Segment clearing>
        <Label style={{ marginBottom: '10px' }}>
          <Icon name='info' />
          {activity.description}
        </Label>
        <Button basic
          as={Link}
          to={`/activenessItems/${activenessItem.id}`}
          color='green'
          floated='right'
          content='Details' />
      </Segment>
    </Segment.Group>
  );
})