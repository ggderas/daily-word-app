import UserData from '../firebase/UserData';

export const fetchUserData = () => {
    return {type: "FETCH_USER", user: UserData} // TODO: This should return a function that within will return a promise (redux-thunk). 
  };
  