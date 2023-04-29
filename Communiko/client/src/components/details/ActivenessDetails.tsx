import React, { useState } from "react";
import { Button, Card, Icon } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";

interface PropsActivenessDetails {
  item: Activeness;
  cancelViewActiveness: () => void;
}

export function ActivenessDetails({ item, cancelViewActiveness }: PropsActivenessDetails) {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{item.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{item.pointTime}</span>
        </Card.Meta>
        <Card.Description>{item.category}</Card.Description>
        <Card.Description>{item.description}</Card.Description>
        <Card.Description>{item.city}</Card.Description>
        <Card.Description>{item.location}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' />
        <label htmlFor="">{item.id}</label>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => cancelViewActiveness()}>Close</Button>
        </div>
      </Card.Content>
    </Card>
  );
}