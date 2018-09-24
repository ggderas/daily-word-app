import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import $ from "jquery";

import { Container, Header, Icon, List, Image, Button } from 'semantic-ui-react';

class LoginPage extends React.Component {
  render() {
    return (
      <Container text id="LoginContainer">
        <Header
          as='h1'
          content='The Daily Word App'
          style={{
            fontSize: false ? '2em' : '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: false ? '1.5em' : '3em',
          }}
        />
        <Header
          as='h2'
          content='Learn day by day, whenever you want'
          style={{
            fontSize: false ? '1.5em' : '1.7em',
            fontWeight: 'normal',
            marginTop: false ? '0.5em' : '1.5em',
          }}
        />
        <Button onClick={() => startLogin()} primary size='huge'>
          Login with Google
      <Icon name='right arrow' />
        </Button>
      </Container>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);
