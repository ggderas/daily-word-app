import  axios from 'axios';
import _ from 'underscore';

const X_MASHEP_KEY = "tEfxQpua62msh7psd45rZE1B4Y5Lp1SJDsIjsn0PgnYyntP5Ee";
const X_MASHAPE_HOST = "wordsapiv1.p.mashape.com";

const GetWordsAPIRequiredHeaders = () => ({
    "X-Mashape-Key": X_MASHEP_KEY
}) 


const FetchWordDetails = (word) => {
    return axios({
        method: 'GET',
        url: `https://wordsapiv1.p.mashape.com/words/${word}`,
        headers: GetWordsAPIRequiredHeaders()
    });
}

const FetchRandomWord = (excludeWords, word) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: `https://wordsapiv1.p.mashape.com/words?random=true&partOfSpeech=verb`,
            headers: GetWordsAPIRequiredHeaders()
        }).then(({data}) => {

            if(_.contains(excludeWords, data.word))
                return FetchRandomWord(excludeWords, data.word)
            else
                resolve(data);
                
        })
        .catch((ex) =>  {
            reject(ex);
        })        
    })
}


export {
    FetchWordDetails,
    FetchRandomWord
}