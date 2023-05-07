import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Icon, Item, Label, List, Segment } from "semantic-ui-react";

export default observer(function ActivenessDetailsSidebar() {
  return (
    <>
      <Segment
        textAlign='center'
        style={{ border: 'none' }}
        attached='top'
        secondary
        inverted
        color='grey'
      >
        2 involved
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{ position: 'relative' }}>
            <Label
              style={{ position: 'absolute' }}
              color='green'
              ribbon='right'
            >
              <Icon name='user secret' />
            </Label>
            <Item.Content verticalAlign='middle'>
              <Item.Header as='h3'>
                <Link to={`#`}>User Name</Link>
              </Item.Header>
              <Item.Extra style={{ color: 'grey' }}>Text</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: 'relative' }}>
            <Item.Content>
              <Item.Header as='h3' >
                <Link to={`#`}>User Name</Link>
              </Item.Header>
              <Item.Extra style={{ color: 'grey' }}>Text</Item.Extra>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </>
  )
});