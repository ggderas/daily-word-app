import { FetchRandomWord } from '../words-api/WordsApi';

const fetchRandomWord = (randomWord) => ({ type: "FETCH_RANDOM_WORD", randomWord})

const startFetchRandomWord = (excludeWords) => {
    return (dispatch) => {
        return FetchRandomWord(excludeWords)
            .then((word) => {
                // console.log("word", word);
                // console.log("fetchRandomWord(word)", fetchRandomWord(word));    
                dispatch(fetchRandomWord(word));
            })
    }
};  
  

export  { 
    startFetchRandomWord
}