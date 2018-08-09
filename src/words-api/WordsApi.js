import  axios from 'axios';

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


export {
    FetchWordDetails
}