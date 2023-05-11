import { Button, Label, Segment } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useRepository } from "../../repository/Repository";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from 'yup';
import { Activeness } from "../../model/Activeness";

export default observer(function ActivenessEditForm() {
  const { repo } = useRepository();
  const navigate = useNavigate();

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

  let activenessSchema = object({
    title: string().required('Буквы'),
    city: string().nonNullable().required('Не может быть пустым'),
  });

  const { id } = useParams();

  useEffect(() => {
    if (id) loadActiveness(id).then(e => setActiveness(e!));
  }, [id, loadActiveness]);

  function handleFormSubmit(activeness: Activeness) {
    if (activeness.id) {
      updateActiveness(activeness).then(
        () => navigate(`/activenessItems/${activeness.id}`)
      );
    } else {
      activeness.id = uuidv4();
      createActiveness(activeness).then(
        () => navigate(`/activenessItems/${activeness.id}`)
      );
    }
  }

  return (
    <Segment>
      <Formik
        enableReinitialize
        validationSchema={activenessSchema}
        initialValues={activeness}
        onSubmit={v => handleFormSubmit(v)}
      >
        {({ handleSubmit, isSubmitting, isValid, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit}  >
            <Field placeholder='Title' name="title" />
            <ErrorMessage
              name='title'
              render={error => <Label content={error} />}
            />
            <Field placeholder='Category' name="category" />
            <Field placeholder='Description' name="description" />
            <Field placeholder='City' name="city" />
            <ErrorMessage
              name='city'
              render={error => <Label content={error} />}
            />
            <Field type="date" placeholder='Point Time' name="pointTime" />
            <Field placeholder='Location' name='location' />
            <div className='ui two buttons'>
              <Button loading={loading}
                disabled={isSubmitting || !dirty || !isValid}
                type='submit' content='Submit' />
              <Button basic color='green' as={Link} to={`/activenessItems`} content='Close' />
            </div>
          </Form>
        )}
      </Formik>

    </Segment >
  );
})