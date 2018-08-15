import { getAll } from '../datasources/users';

const fetchTopFiveUsers = (users) =>({
    type: 'FETCH_TOP_FIVE_USERS',
    users
})

export const startFetchAllUsers = () => {
    return (dispatch) => {
        return getAll().then((users) => {
            dispatch(fetchTopFiveUsers(users))
        })
    }    
};