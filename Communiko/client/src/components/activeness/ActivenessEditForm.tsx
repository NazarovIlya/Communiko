import { Button, Form, Icon, Label, Segment } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { ChangeEvent, useEffect, useState } from "react";
import { useRepository } from "../../repository/Repository";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

export default observer(function ActivenessEditForm() {
  const { repo } = useRepository();
  const {
    selectedActiveness,
    updateActiveness,
    createActiveness,
    loadActiveness,
    loading
  } = repo;

  const [activeness, setActiveness] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    city: '',
    pointTime: '',
    location: ''
  });
  const { id } = useParams();

  useEffect(() => {
    if (id) loadActiveness(id).then(e => setActiveness(e!));
  }, [id, loadActiveness]);

  function handleSubmit() {
    if (activeness.id) {
      updateActiveness(activeness);
    }
    else {
      createActiveness(activeness);
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
          <Button loading={loading} type='submit'

          >
            Submit
          </Button>
          <Button basic color='green'
            as={Link} to={`/activenessItems`}
          >
            Close
          </Button>
        </div>
      </Form>
    </Segment >
  );
})