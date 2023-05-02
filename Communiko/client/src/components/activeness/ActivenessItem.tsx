import { Button, Card } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { useRepository } from "../../Repository/Repository";
import { observer } from "mobx-react-lite";

interface PropsActivenessItem {
  activenessItem: Activeness
}

export default observer(function ActivenessItem(
  { activenessItem }: PropsActivenessItem) {
  const { repo } = useRepository();
  const
    {
      viewActiveness,
      deleteActiveness,
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
            onClick={(arg) => deleteActiveness(arg, activenessItem.id)}
            color='green'>
            Remove
          </Button>
          <Button basic
            onClick={() => viewActiveness(activenessItem.id)}
            color='green'>
            Details
          </Button>
        </div>
      </Card.Content>
    </Card >
  );
})