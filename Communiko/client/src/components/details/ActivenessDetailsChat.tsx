import React, { useEffect } from "react";
import { Segment, Comment, Form, Button } from "semantic-ui-react";
import { observer } from 'mobx-react-lite'
import { useRepository } from "../../repository/Repository";
import { Field, Formik } from "formik";
import * as YUP from "yup";
import { formatDistanceToNow } from 'date-fns';

interface Props {
  activitiesId: string;
}

export default observer(function ActivenessDetailsChat({ activitiesId }: Props) {
  const { commentRepo } = useRepository();
  useEffect(() => {
    if (activitiesId) {
      commentRepo.createHubConnection(activitiesId);
    }
    return () => {
      commentRepo.clearComments();
    }
  }, [commentRepo, activitiesId]);

  return (
    <>
      <Segment>
        <Formik
          onSubmit={(values, { resetForm }) =>
            commentRepo.addComment(values).then(() => resetForm())}
          initialValues={{ text: '' }}
          validationSchema={YUP.object({
            text: YUP.string().required()
          })}
        >
          {({ isSubmitting, isValid, handleSubmit }) => (
            <Form className='ui form'>
              <Field name='text'>
              </Field>

              <Button
                style={{ marginTop: '10px' }}
                loading={isSubmitting}
                disabled={!isValid}
                content='Send'
                labelPosition='left'
                icon='edit'
                basic color='green'
                onClick={() => { handleSubmit(); }}
              />
            </Form>
          )}
        </Formik>
      </Segment>

      {commentRepo.comments.length > 0 && <Segment attached>
        <Comment.Group>
          {
            commentRepo.comments.map(
              item => (
                <Comment key={item.id}>
                  <Comment.Content>
                    <Comment.Author as='a'>{item.nickName}</Comment.Author>
                    <Comment.Metadata>
                      <div>{formatDistanceToNow(item.create)} ago</div>
                    </Comment.Metadata>
                    <Comment.Text>{item.text}</Comment.Text>
                  </Comment.Content>
                </Comment>
              )
            )
          }
        </Comment.Group>
      </Segment>}
    </>
  )
})