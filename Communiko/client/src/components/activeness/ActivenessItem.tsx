import { Button, Card } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { useStore } from "../../Repository/Repository";

interface PropsActiveness {
  activenessItem: Activeness;
  removeActiveness: (id: string) => void;
}

export default function ActivenessItem(
  {
    activenessItem,
    removeActiveness
  }: PropsActiveness) {
  const { repo } = useStore();
  const { handleViewActiveness, selectedActiveness } = repo;

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
          <Button basic onClick={() => removeActiveness(activenessItem.id)} color='green'>Remove</Button>
          <Button basic onClick={() => handleViewActiveness(activenessItem.id)} color='green'>Details</Button>
        </div>
      </Card.Content>
    </Card>
  );
}