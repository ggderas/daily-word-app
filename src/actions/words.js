import { FetchRandomWord } from '../words-api/WordsApi';
import UserData from '../firebase/UserData';

const fetchRandomWord = (randomWord) => ({ type: "FETCH_RANDOM_WORD", randomWord })

const startFetchRandomWord = (user) => {
    const excludeWords = user.words || [];

    return (dispatch) => {

        if (user.hasAlreadyLearnedAWordToday) {
            return new Promise((resolve) => {
                resolve()
            }).then(() => {
                dispatch(fetchRandomWord({}));
            })
        }
        else {
            return FetchRandomWord(excludeWords)
                .then((word) => {
                    dispatch(fetchRandomWord(word));
                })
        }
    }
};

const startFetchUserWords = () => UserData;


export {
    startFetchRandomWord
}