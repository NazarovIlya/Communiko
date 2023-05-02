import { Button, Form, Icon, Label, Segment } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../Repository/Repository";

interface PropsActivenessEditForm {
  editOrCreate: (id: Activeness) => void;
}

export default function ActivenessEditForm(
  {
    editOrCreate
  }: PropsActivenessEditForm) {
  const { repo } = useStore();
  const { selectedActiveness, handleCloseForm } = repo;

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
    editOrCreate(activeness);
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
          <Button type='submit'>Submit</Button>
          <Button basic color='green' onClick={() => handleCloseForm()}>Close</Button>
        </div>
      </Form>
    </Segment >
  );
}