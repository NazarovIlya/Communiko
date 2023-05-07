import { Button, Container, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export function NavigationBar() {
  return (
    <Menu fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img src="/images/logo.png" alt="logo" />
          Communiko project
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activenessItems' name='Activeness' />
        <Menu.Item as={NavLink} to='/bugs' name='Bugs' />
        < Menu.Item >
          <Button positive content='Append Activeness' as={NavLink} to='/createActiveness' />
        </ Menu.Item >
      </Container>
    </Menu >
  );
}