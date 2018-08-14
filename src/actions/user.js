export const fetchUser  = (user) => ({
    type: 'FETCH_USER',
    user
})

export const saveUser = (user) => ({
    type: 'SAVE_USER',
    user
})