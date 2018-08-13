import database from '../firebase/firebase';

export const userAlreadyExists = (uid) => {
    return new Promise((resolve) =>{
        getUser(uid).then((user) => {
            resolve(user  ? true :  false);
        })
    })
}

export const addNewUser = (user) => {
    database.ref('/users/' +  user.uid).set({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
    })
}

export const getUser = (uid) =>  {
    return new Promise((resolve) =>  {
        database.ref('/users/' + uid).once('value').then((snapshot) => { 
            resolve(snapshot.val());
        });
    })
}
