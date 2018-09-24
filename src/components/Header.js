import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

import {
  Container,
  Header as SemanticUIHeader,
  Image,
  Menu,
} from 'semantic-ui-react'

export const Header = ({ startLogout, user }) => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a'>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item as='a' header>
          Hi {user.displayName}!
        </Menu.Item>
        <Menu.Item
          position="right"
          name='logout'
          onClick={startLogout}
        />
      </Container>
    </Menu>
  </div>
)

const mapStateToProps = (state, props) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
