import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface PropsNavigationBar {
  openForm: () => void;
}

export function NavigationBar({ openForm }: PropsNavigationBar) {
  return (
    <Menu fixed='top'>
      <Container>
        <Menu.Item header>
          <img src="/images/logo.png" alt="logo" />
          Communiko project
        </Menu.Item>
        <Menu.Item name='Activeness' />
        < Menu.Item >
          <Button positive content='Append Activeness' onClick={() => openForm()} />
        </ Menu.Item >
      </Container>
    </Menu >
  );
}