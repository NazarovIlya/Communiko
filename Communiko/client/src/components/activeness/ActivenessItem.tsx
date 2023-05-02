import { Button, Card } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { useStore } from "../../Repository/Repository";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";

interface Props {
  activenessItem: Activeness
}

export default observer(function ActivenessItem({ activenessItem }: Props) {
  const { repo } = useStore();
  const
    {
      handleViewActiveness,
      handleDeleteActivity,
      loading,
      btnId
    } = repo;

  return (
    <Card key={activenessItem.id} fluid>
      <Card.Content>
        <Card.Header>{activenessItem.title}</Card.Header>
        <Card.Meta>{activenessItem.city}</Card.Meta>
        <Card.Description>
          {activenessItem.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui three buttons'>
          <Button basic
            name={`${activenessItem.id}items`}
            loading={loading && btnId === `${activenessItem.id}items`}
            disabled={loading}
            onClick={(arg) => handleDeleteActivity(arg, activenessItem.id)}
            color='green'>
            Remove
          </Button>
          <Button basic
            onClick={() => handleViewActiveness(activenessItem.id)}
            color='green'>
            Details
          </Button>
        </div>
      </Card.Content>
    </Card >
  );
})