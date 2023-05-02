import { Button, Card, Icon } from "semantic-ui-react";
import { useStore } from "../../Repository/Repository";
import LoadingComponent from "../loading/LoadingComponent";

export default function ActivenessDetails() {
  const { repo } = useStore();
  const {
    handleCancelViewActiveness,
    handleOpenForm,
    selectedActiveness: item,
    loading,
    handleRemoveActiveness
  } = repo;
  if (!item) return <LoadingComponent />;
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
        <div className='ui three buttons'>
          <Button basic color='green' onClick={() => handleOpenForm(item.id)}>Edit</Button>
          <Button loading={loading} basic color='green' onClick={() => handleRemoveActiveness(item.id)}>Remove</Button>
          <Button basic color='green' onClick={() => handleCancelViewActiveness()}>Close</Button>
        </div>
      </Card.Content>
    </Card>
  );
}