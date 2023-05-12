import { Icon, List, Popup } from "semantic-ui-react";
import { observer } from "mobx-react-lite";


export default observer(function ActivenessListParticipants() {
  return (
    <List horizontal>
      <List.Item>
        <Popup
          trigger={
            <List.Item >
              <a onClick={() => { alert('user 1'); }}>
                <Icon name='user' />
                <strong>User 1</strong>
              </a>
            </List.Item>
          }
        >
          <Popup.Content>
            <Icon name="user" />
            <strong>User 1 Popup</strong>
          </Popup.Content>
        </Popup>
      </List.Item>

      <List.Item>
        <Popup
          trigger={
            <List.Item >
              <a onClick={() => { alert('user 2'); }}>
                <Icon name='user' />
                <strong>User 2</strong>
              </a>
            </List.Item>
          }
        >
          <Popup.Content>
            <Icon name="user" />
            <strong>User 2 Popup</strong>
          </Popup.Content>
        </Popup>
      </List.Item>
    </List >
  )
});