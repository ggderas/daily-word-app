import { getUser, getAll } from '../datasources/users';

const fetchUser = (user) => ({
    type: 'FETCH_USER',
    user
})

export const startFetchUser = (uid) => {
    return (dispatch) => {
        return getUser(uid).then((user) => {
            dispatch(fetchUser(user))
        })
    }
}

export const saveUser = (user) => ({
    type: 'SAVE_USER',
    user
})