import database from '../firebase/firebase';
import moment from 'moment';

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
            let user = snapshot.val();
            user.words  = Object.values(user.words || {});


            resolve(user);
        });
    })
}

export const learnWord = ({uid}, word) => {
    return new Promise((resolve) =>  {
        let wordObject = { name: word, learnedDate: moment().toDate().getTime() };
        database.ref('/users/' + uid + '/words/' + word).set(wordObject);

        resolve(wordObject);
    })    
}