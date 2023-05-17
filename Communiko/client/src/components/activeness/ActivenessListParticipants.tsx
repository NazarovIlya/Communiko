import { Icon, List, Popup } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { UserProfile } from "../../model/UserProfile";

interface Props {
  participants: UserProfile[];
}

export default observer(function ActivenessListParticipants({ participants }: Props) {
  return (
    <List horizontal>
      {
        participants?.map((item, idx) => (
          <List.Item key={item.fullName + `${idx}`}>
            <Popup
              trigger={
                <List.Item >
                  <Icon name='user' />
                  <strong>{`${item.nickName}`}</strong>
                </List.Item>
              }
            >
              <Popup.Content>
                <Icon name="user" />
                <strong>{item.nickName}</strong>
              </Popup.Content>
            </Popup>
          </List.Item >
        ))
      }
    </List >
  )
});