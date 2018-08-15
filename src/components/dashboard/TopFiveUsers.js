import React from 'react';
import { connect } from 'react-redux';
import LoadingPage from '../../components/LoadingPage';
import _ from 'underscore';

import { startFetchAllUsers } from '../../actions/topUsers'

const getTopFiveUsers = (users) => {
  let topFiveUsers = _.sortBy(users, (u) => (u.words || []).length);
  topFiveUsers = _.first(topFiveUsers, 5).reverse();

  return  topFiveUsers.map((t) =>{
    const lastLearnedWord = _.first(((_.sortBy(t.words, (w) => (w.learnedDate))).reverse()));

    return {...t, lastLearnedDate: lastLearnedWord.learnedDate};
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
              {
                users.map((u, key) => {
                  return (
                    <p key={key}>{u.displayName}  - {u.words.length}</p>
                  )
                })
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
