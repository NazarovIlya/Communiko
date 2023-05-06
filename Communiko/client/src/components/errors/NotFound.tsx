import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
  return (
    <Segment placeholder>
      <Header icon>
        <Icon name='search' />
        404 NotFound
      </Header>
      <Segment.Inline>
        <Button as={Link} to='/activenessItems'>
          Activeness
        </Button>
      </Segment.Inline>
    </Segment>
  )
}