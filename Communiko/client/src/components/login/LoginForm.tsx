import { ErrorMessage, Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import { useRepository } from "../../repository/Repository";
import { error } from "console";

export default observer(function LoginForm() {
  const { userRepo } = useRepository();
  return (
    <Formik
      initialValues={{ email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) => userRepo.auth(values).catch(e => setErrors({ error: "Данные неверны " }))}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className='ui form' onSubmit={handleSubmit} >
          <Header as='h2' content='Login to Communiko' color="green" textAlign="center" />
          <Field placeholder="Email" name='email' />
          <Field placeholder="Password" name='password' type='password' />
          <ErrorMessage
            name='error'
            render={error => <Label content={error} />}
          />
          <Button fluid positive content='Login' type="submit" />
        </Form>
      )}
    </Formik >
  );
});