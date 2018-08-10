export default (state = {}, action) => {
    switch (action.type) {
      case 'FETCH_RANDOM_WORD':
        return action.randomWord;
      default:
        return state;
    }
  };
  