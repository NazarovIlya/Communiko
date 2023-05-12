import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Icon, Item, Label, List, Segment } from "semantic-ui-react";
import { UserProfile } from "../../model/UserProfile";

interface Props {
  participants: UserProfile[] | undefined;
}

export default observer(function ActivenessDetailsSidebar({ participants }: Props) {
  const items = participants!;
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
        {items.length} involved
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {items.map((item) => (
            <Item style={{ position: 'relative' }} key={item.userName}>
              <Label
                style={{ position: 'absolute' }}
                color='green'
                ribbon='right'
              >
                <Icon name='user secret' />
              </Label>
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3'>
                  <Link to={`#`}>{`${item.fullName}`}</Link>
                </Item.Header>
                <Item.Extra style={{ color: 'grey' }}>Text</Item.Extra>
              </Item.Content>
            </Item>
          ))}
        </List>
      </Segment>
    </>
  )
});