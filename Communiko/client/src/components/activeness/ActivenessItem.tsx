import { Button, Card } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";

interface PropsActiveness {
  activenessItem: Activeness;
  selected: (id: string) => void;
}

export function ActivenessItem({ activenessItem, selected }: PropsActiveness) {
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
        <div className='ui two buttons'>
          <Button basic onClick={() => selected(activenessItem.id)} color='green'>Details</Button>
        </div>
      </Card.Content>
    </Card>
  );
}