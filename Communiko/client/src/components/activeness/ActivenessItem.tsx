import { Button, Card } from "semantic-ui-react";
import { Activeness } from "../../model/Activeness";
import { useStore } from "../../Repository/Repository";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../loading/LoadingComponent";

interface Props {
  activenessItem: Activeness
}

export default observer(function ActivenessItem({ activenessItem }: Props) {
  const { repo } = useStore();
  const
    {
      handleViewActiveness,
      handleRemoveActiveness,
      loading
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
          <Button loading={loading} basic onClick={() => handleRemoveActiveness(activenessItem.id)} color='green'>Remove</Button>
          <Button basic onClick={() => handleViewActiveness(activenessItem.id)} color='green'>Details</Button>
        </div>
      </Card.Content>
    </Card>
  );
})