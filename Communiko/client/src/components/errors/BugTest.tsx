import React, { useState } from 'react';
import { Button, Header, Segment } from "semantic-ui-react";
import axios from 'axios';

export default function BugTest() {
  const baseUrl = 'http://localhost:11222/api/';
  const [errors, setErrors] = useState(null);

  function handleStatus400() {
    axios.get(baseUrl + 'bug/status400').catch(err => console.log(err.response));
  }

  function handleStatus404() {
    axios.get(baseUrl + 'bug/status404').catch(err => console.log(err.response));
  }

  function handleStatus500() {
    axios.get(baseUrl + 'bug/status500').catch(err => console.log(err.response));
  }

  return (
    <>
      <Header as='h1' content='Bug component' style={{ color: 'white' }} />
      <Segment>
        <Button.Group widths='10'>
          <Button basic color='green' onClick={() => { handleStatus400(); }} content='400 Bad Request' />
          <Button basic color='green' onClick={() => { handleStatus404(); }} content='404 Not Found' />
          <Button basic color='green' onClick={() => { handleStatus500(); }} content='500 Server Error' />
        </Button.Group>
      </Segment>
    </>
  )
}