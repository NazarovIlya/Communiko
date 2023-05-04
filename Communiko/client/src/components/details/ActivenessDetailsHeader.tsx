import { Activeness } from "../../model/Activeness";
import React from "react";
import { observer } from 'mobx-react-lite'
import { Button, Header, Item, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const textStyle = {
  width: '100%',
  height: 'auto',
  color: 'black',
};

interface PropsActivenessItem {
  item: Activeness
}

export default observer(function ActivenessDetailsHeader({ item }: PropsActivenessItem) {
  return (
    <>
      <Segment.Group>
        <Segment basic attached='top' style={{ background: 'white' }}>
          <Segment style={textStyle}>
            <Item.Group>
              <Item>
                <Item.Content>
                  <Header
                    size='huge'
                    content={item.title}
                  />
                  <p>{item.pointTime}</p>
                  <p>
                    Author <strong>Name</strong>
                  </p>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Segment>
        <Segment clearing attached='bottom'>
          <Button color='green' content='Join' />
          <Button basic color='green'
            content='Close'
            as={Link} to='/activenessItems'
          />
          <Button basic color='orange' floated='right'>
            Update
          </Button>
        </Segment>
      </Segment.Group >
    </>
  )
})