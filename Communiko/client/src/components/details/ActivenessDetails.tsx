import { Button, Card, Icon } from "semantic-ui-react";
import { useRepository } from "../../repository/Repository";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../loading/LoadingComponent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default observer(function ActivenessDetails() {
  const { repo } = useRepository();
  const {
    loadActiveness,
    selectedActiveness,
    loading,
    loadingInit,
    deleteActiveness,
    btnId
  } = repo;
  const { id } = useParams();
  useEffect(() => {
    if (id) loadActiveness(id);
  }, [id, loadActiveness]);
  const item = selectedActiveness!;

  if (loadingInit || !item) return <LoadingComponent />;
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
            disabled={loading}>
            Edit
          </Button>
          <Button basic
            name={`${item.id}details`}
            disabled={loading}
            loading={loading && btnId === `${item!.id}details`}
            onClick={(e) => deleteActiveness(e, item!.id)}
            color='green'>
            Remove
          </Button>
          <Button basic
            color='green'>
            Close
          </Button>
        </div>
      </Card.Content>
    </Card >
  );
})