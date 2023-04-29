import { Button, Card } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";

interface PropsActiveness {
  activenessItem: Activeness;
}

export function ActivenessItem({ activenessItem }: PropsActiveness) {
  return (
    <Card key={activenessItem.id}>
      <Card.Content>
        <Card.Header>{activenessItem.title}</Card.Header>
        <Card.Meta>{activenessItem.city}</Card.Meta>
        <Card.Description>
          {activenessItem.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'> Details </Button>
          <Button basic color='green'> View </Button>
        </div>
      </Card.Content>
    </Card>
  );
}