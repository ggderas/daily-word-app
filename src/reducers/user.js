export default (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_USER':
        return action.user;
      case 'LEARN_WORD':{
        console.log("action", action);
        return state;
      }
      default:
        return state;
    }
  };
  