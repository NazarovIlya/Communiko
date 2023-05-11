import { ErrorMessage, Field, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Label } from "semantic-ui-react";
import { useRepository } from "../../repository/Repository";
import * as YOP from "yup";

export default observer(function SignUpForm() {
  const { userRepo } = useRepository();
  let userRegistrationSchema = YOP.object({
    nickname: YOP.string().required('Не может быть пустым'),
    username: YOP.string().required('Не может быть пустым'),
    email: YOP.string().email().required('Не может быть пустым'),
    password: YOP.string().required('Не может быть пустым'),
  });

  return (
    <Formik
      initialValues={{ nickname: '', username: '', email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) => {
        userRepo.signUp(values).catch(e => setErrors({ error: "Ошибка регистрации" }));
      }}
      validationSchema={userRegistrationSchema}
    >
      {({ handleSubmit, isValid, dirty }) => (
        <Form className='ui form' onSubmit={handleSubmit} >
          <Header as='h2' content='Login to Communiko' color="green" textAlign="center" />
          <Field placeholder="nickname" name='nickname' />
          <Field placeholder="username" name='username' />
          <Field placeholder="email" name='email' />
          <Field placeholder="Password" name='password' type='password' />
          <ErrorMessage
            name='error'
            render={error => <Label content={error} />}
          />
          <Button fluid positive
            disabled={!isValid || !dirty}
            content='Create Account'
            type="submit" />
        </Form>
      )}
    </Formik >
  );
});