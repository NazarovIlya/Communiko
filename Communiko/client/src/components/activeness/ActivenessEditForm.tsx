import { Button, Icon, Label, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useRepository } from "../../repository/Repository";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field } from "formik";

export default observer(function ActivenessEditForm() {
  const { repo } = useRepository();
  const {
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
  const navigate = useNavigate();

  useEffect(() => {
    if (id) loadActiveness(id).then(e => setActiveness(e!));
  }, [id, loadActiveness]);

  // function handleSubmit() {
  //   if (activeness.id) {
  //     updateActiveness(activeness).then(
  //       () => navigate(`/activenessItems/${activeness.id}`)
  //     );
  //   } else {
  //     activeness.id = uuidv4();
  //     createActiveness(activeness).then(
  //       () => navigate(`/activenessItems/${activeness.id}`)
  //     );
  //   }
  // }

  // function handleChange(arg: ChangeEvent<HTMLInputElement>) {
  //   const { name, value } = arg.target;
  //   setActiveness({ ...activeness, [name]: value })
  // }

  return (
    <Segment>
      <Formik enableReinitialize initialValues={activeness} onSubmit={v => console.log(v)}>
        {({ values: activeness, handleChange, handleSubmit }) => (

          <Form onSubmit={handleSubmit} onChange={handleChange} >
            <Label>
              <Icon name='id badge' /> {activeness.id}
            </Label>
            <Field placeholder='Title' name="title" value={activeness.title} />
            <Field placeholder='Category' name="category" value={activeness.category} />
            <Field placeholder='Description' name="description" value={activeness.description} />
            <Field placeholder='City' name="city" value={activeness.city} />
            <Field type="date" placeholder='Point Time' name="pointTime" value={activeness.pointTime} />
            <Field placeholder='Location' name='location' value={activeness.location} />
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
        )}
      </Formik>

    </Segment >
  );
})