import { Button, Card, Icon } from "semantic-ui-react";
import { useStore } from "../../Repository/Repository";
import LoadingComponent from "../loading/LoadingComponent";
import { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";

export default observer(function ActivenessDetails() {
  const { repo } = useStore();
  const {
    handleCancelViewActiveness,
    handleOpenForm,
    selectedActiveness,
    loading,
    handleDeleteActivity,
    btnId
  } = repo;
  const item = selectedActiveness!;
  return (
    <Card fluid key={item.id}>
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
        <div className='ui three buttons'>
          <Button basic
            color='green'
            disabled={loading}
            onClick={() => handleOpenForm(item.id)}>
            Edit
          </Button>
          <Button basic
            name={`${item.id}details`}
            disabled={loading}
            loading={loading && btnId === `${item!.id}details`}
            onClick={(e) => handleDeleteActivity(e, item!.id)}
            color='green'>
            Remove
          </Button>
          <Button basic
            color='green'
            onClick={() => handleCancelViewActiveness()}>
            Close
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
})