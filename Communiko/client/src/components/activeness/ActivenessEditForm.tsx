import { Button, Icon, Label, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useRepository } from "../../repository/Repository";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";

export default observer(function ActivenessEditForm() {
  const { repo } = useRepository();
  const {
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

  return (
    <Segment>
      <Formik enableReinitialize initialValues={activeness} onSubmit={v => console.log(v)}>
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit}  >
            <Field placeholder='Title' name="title" />
            <Field placeholder='Category' name="category" />
            <Field placeholder='Description' name="description" />
            <Field placeholder='City' name="city" />
            <Field type="date" placeholder='Point Time' name="pointTime" />
            <Field placeholder='Location' name='location' />
            <div className='ui two buttons'>
              <Button loading={loading} type='submit' content='Submit' />
              <Button basic color='green' as={Link} to={`/activenessItems`} content='Close' />
            </div>
          </Form>
        )}
      </Formik>

    </Segment >
  );
})