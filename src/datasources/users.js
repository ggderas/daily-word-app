import database from '../firebase/firebase';
import moment from 'moment';
import _ from 'underscore';

const userHasLearnedAWordToday = (user) => {
    const today = moment().format("L");

    return _.find(user.words || [], (w) => today === moment(w.learnedDate).format("L")) ? true : false;    
}

export const userAlreadyExists = (uid) => {
    return new Promise((resolve) =>{
        getUser(uid).then((user) => {
            resolve(user  ? true :  false);
        })
    })
}

export const addNewUser = (user) => {
    return database.ref('/users/' +  user.uid).set({
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

            if(user){
                user.words  = Object.values(user.words || {});
                user.hasAlreadyLearnedAWordToday = userHasLearnedAWordToday(user);
            }

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