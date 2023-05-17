import { Button, Container, Dropdown, DropdownMenu, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { repository } from '../repository/Repository';
import { observer } from 'mobx-react-lite';

export default observer(function NavigationBar() {
  const { userRepo } = repository;
  return (
    <Menu fixed='top'>
      <Container>
        <Menu.Item>
          <Dropdown text={userRepo.user?.nickName}>
            <DropdownMenu>
              <Dropdown.Item onClick={() => { }} icon='user' text='Profile' />
              <Dropdown.Item onClick={() => { userRepo.logout(); }} icon='log out' text='Logout' />
            </DropdownMenu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activenessItems' name='Activeness' />
        <Menu.Item as={NavLink} to='/bugs' name='Bugs' />
        < Menu.Item >
          <Button positive content='Append Activeness' as={NavLink} to='/createActiveness' />
        </ Menu.Item >
      </Container>
    </Menu >
  );
})