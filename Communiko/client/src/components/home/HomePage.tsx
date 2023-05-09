import { NavLink } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";

export default function HomePage() {
  return (
    <Segment inverted
      textAlign='center'
      vertical
      className='home_page'
    >
      <Container text>
        <Header as='h1' inverted content='Welcome to' />
        <Header as='h1' inverted>
          <img src="/images/logo.png" alt="logo" />
          Communiko
        </Header>
        <Button inverted
          content='Auth'
          as={NavLink}
          to='/auth'
          size='huge'
        />
      </Container>
    </Segment>
  )
}

/* <p>
    
  </p> */