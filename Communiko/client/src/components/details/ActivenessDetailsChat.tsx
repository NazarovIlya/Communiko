import React from "react";
import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'


export default observer(function ActivenessDetailsChat() {
  let currentDate = new Date().toLocaleDateString();
  let currentTime = new Date().toLocaleTimeString();
  let date = `${currentDate} [${currentTime}]`;
  return (
    <>
      <Segment
        textAlign='center'
        attached='top'
        inverted
        color='grey'
        style={{ border: 'none' }}
      >
        <Header>Messages</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>Author</Comment.Author>
              <Comment.Metadata>
                <div>{date}</div>
              </Comment.Metadata>
              <Comment.Text>Text</Comment.Text>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Content>
              <Comment.Author as='a'>Author</Comment.Author>
              <Comment.Metadata>
                <div>{date}</div>
              </Comment.Metadata>
              <Comment.Text>Text</Comment.Text>
            </Comment.Content>
          </Comment>
          <Form>
            <Form.TextArea />
            <div>
              {/* <Button /> */}
              <Button
                content='Send'
                labelPosition='left'
                icon='edit'
                basic color='green'
              />
            </div>
          </Form>
        </Comment.Group>
      </Segment>
    </>
  )
})