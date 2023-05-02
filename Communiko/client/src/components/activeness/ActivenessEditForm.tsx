import { Button, Form, Icon, Label, Segment } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../Repository/Repository";
import { observer } from "mobx-react-lite";

export default observer(function ActivenessEditForm() {
  const { repo } = useStore();
  const {
    selectedActiveness,
    handleCloseForm,
    handleEditActiveness,
    handleCreateActiveness,
    loading

  } = repo;

  let tempActiveness: Activeness = selectedActiveness ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    city: '',
    pointTime: '',
    location: ''
  }

  const [activeness, setActiveness] = useState(tempActiveness);

  function handleSubmit() {
    console.log("+");

    if (activeness.id) {
      console.log('if (activeness.id) ');
      handleEditActiveness(activeness);
    }
    else {
      console.log('else {');
      handleCreateActiveness(activeness);
    }
  }

  function handleChange(arg: ChangeEvent<HTMLInputElement>) {
    const { name, value } = arg.target;
    setActiveness({ ...activeness, [name]: value })
  }

  return (
    <Segment>
      <Form onSubmit={handleSubmit} onChange={handleChange} >
        <Label>
          <Icon name='id badge' /> {activeness.id}
        </Label>
        <Form.Input placeholder='Title' name="title" value={activeness.title} />
        <Form.Input placeholder='Category' name="category" value={activeness.category} />
        <Form.Input placeholder='Description' name="description" value={activeness.description} />
        <Form.Input placeholder='City' name="city" value={activeness.city} />
        <Form.Input type="date" placeholder='Point Time' name="pointTime" value={activeness.pointTime} />
        <Form.Input placeholder='Location' name='location' value={activeness.location} />
        <div className='ui three buttons'>
          <Button loading={loading} type='submit'>Submit</Button>
          <Button basic color='green' onClick={() => handleCloseForm()}>Close</Button>
        </div>
      </Form>
    </Segment >
  );
})