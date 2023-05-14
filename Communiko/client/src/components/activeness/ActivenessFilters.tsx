import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import Calendar from 'react-calendar';

export default function ActivityFilters() {
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 0 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item content='All' />
        <Menu.Item content="Join" />
        <Menu.Item content="Main" />
      </Menu>
      <Header icon='calendar' attached color='grey' content='Date' />
      <Calendar />
    </>
  );
}