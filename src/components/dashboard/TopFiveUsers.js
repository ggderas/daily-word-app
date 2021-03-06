import React from 'react';
import { connect } from 'react-redux';
import LoadingPage from '../../components/LoadingPage';
import _ from 'underscore';

import { startFetchAllUsers } from '../../actions/topUsers'

import { Header, Icon, List, Image, Container } from 'semantic-ui-react';

const getTopFiveUsers = (users) => {
  let topFiveUsers = _.filter(users, (u) => u.words.length > 0);
  topFiveUsers = _.sortBy(topFiveUsers, (u) => (u.words || []).length);
  topFiveUsers = _.first(topFiveUsers, 5).reverse();

  return topFiveUsers.map((t) => {
    const lastLearnedWord = _.first(((_.sortBy(t.words, (w) => (w.learnedDate))).reverse())) || {};

    return { ...t, lastLearnedDate: lastLearnedWord.learnedDate };
  })
}

class TopFiveUsers extends React.Component {
  state = {
    isFetching: true
  }

  render() {
    let { users } = this.props;
    return (
      <div>
        {
          this.state.isFetching ? <LoadingPage /> : (
            <div>

              <div>
                <Header as='h2' icon textAlign='center'>
                  <Icon name='users' circular />
                  <Header.Content>Top Five Users</Header.Content>
                </Header>
              </div>

              {
                users.length === 0 ? (
                  <Container style={{ marginTop: '1em' }} textAlign="center">
                    <h4>You can be the first user here! Start learning now!</h4>
                  </Container>
                ) : (
                    <List ordered>
                      {
                        users.map((u, key) => {
                          return (
                            <List.Item key={key}>
                              <Image avatar src={u.photoURL} />
                              <List.Content>
                                <List.Header>{u.displayName}</List.Header>
                                <List.Description>Learned {u.words.length > 1 ? (u.words.length + " words") : (u.words.length + " word")}</List.Description>
                              </List.Content>
                            </List.Item>
                          )
                        })
                      }
                    </List>
                  )
              }

            </div>
          )
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onFetchingUsers().then(() => {
      this.setState({ isFetching: false });
    })
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    users: getTopFiveUsers(state.topUsers)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchingUsers: () => { return dispatch(startFetchAllUsers()) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(TopFiveUsers);
