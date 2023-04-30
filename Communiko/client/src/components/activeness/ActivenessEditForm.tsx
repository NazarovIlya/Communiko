import { Button, Checkbox, Form, Grid, Icon, Label, Segment } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";

interface PropsActivenessEditForm {
  selectItem: Activeness | undefined;
  formClose: () => void;
}
export function ActivenessEditForm({ formClose, selectItem }: PropsActivenessEditForm) {
  return (
    <Segment>
      <Form>
        <Form.Field>
          <Label>
            <Icon name='id badge' /> {selectItem?.id}
          </Label>
        </Form.Field >
        <Form.Field>
          <label>Title</label>
          <input placeholder='Title' value={selectItem?.title} />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <input placeholder='Category' value={selectItem?.category} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input placeholder='Description' value={selectItem?.description} />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input placeholder='City' value={selectItem?.city} />
        </Form.Field>
        <Form.Field>
          <label>Point Time</label>
          <input placeholder='Point Time' value={selectItem?.pointTime} />
        </Form.Field>
        <Form.Field>
          <label>Location</label>
          <input placeholder='Location' value={selectItem?.location} />
        </Form.Field>
        <Form.Field>
          <div className='ui three buttons'>
            <Button type='submit'>Submit</Button>
            <Button basic color='green' onClick={() => formClose()}>Close</Button>
          </div>
        </Form.Field>
      </Form>
    </Segment >
  );
}