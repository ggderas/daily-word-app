export default (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_TOP_FIVE_USERS':
        return action.users;
      default:
        return state;
    }
  };
  