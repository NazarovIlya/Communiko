import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import Calendar from 'react-calendar';
import { useRepository } from '../../repository/Repository';
import { observer } from 'mobx-react-lite';
import { FilterMode } from '../../model/FilterMode';

export default observer(function ActivityFilters() {
  const { repo } = useRepository();
  return (
    <>
      <Menu vertical size='large' style={{ width: '100%', marginTop: 0 }}>
        <Header icon='filter' attached color='teal' content='Filters' />
        <Menu.Item content='All' onClick={() => { repo.setFilterMode(FilterMode.All); }} />
        <Menu.Item content="Join" onClick={() => { repo.setFilterMode(FilterMode.Join); }} />
        <Menu.Item content="Author" onClick={() => { repo.setFilterMode(FilterMode.Author); }} />
      </Menu>
      <Header icon='calendar' attached color='grey' content='Date' />
      <Calendar
        onChange={(date: any) => {
          repo.setFilterMode(FilterMode.AfterDate);
          repo.selectedDate = date;
        }}
      />
    </>
  );
})