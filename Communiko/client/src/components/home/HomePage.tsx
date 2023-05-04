import { Link, NavLink } from "react-router-dom";
import { Button, Container } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Container style={{ marginTop: '5em' }}>
      <h1 style={{ color: 'white' }}>HomePage</h1>
      <p>
        <Button positive content='Activeness Items' as={NavLink} to='/activenessItems' />
      </p>

    </Container >
  )
}