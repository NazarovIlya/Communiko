import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import { repository } from "../../repository/Repository";

export default observer(function HomePage() {
  const { userRepo } = repository;

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
        {userRepo.isLoggedIn ?
          (<Button inverted
            content='Welcome! Go to Activeness'
            as={NavLink}
            to='/activenessItems'
            size='huge' />)
          :
          (<Button inverted
            content='Auth'
            as={NavLink}
            to='/auth'
            size='huge' />)
        }
      </Container>
    </Segment>
  )
})