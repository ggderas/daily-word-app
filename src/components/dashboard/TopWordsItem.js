import React from 'react';
import AppRouter, { history } from '../../routers/AppRouter';

import { FetchWordDetails } from '../../words-api/WordsApi';

class TopWordsItem extends React.Component{
    render() {
        let { word } = this.props;

        return (
            <div>
                <button onClick={this.onWordClick.bind(this)}>{word.name}</button>
            </div>
        )
    }

    onWordClick(){
        let {word} = this.props;

        FetchWordDetails(word.name)
        .then((result) => {
            history.push({
                pathname: `/word/${word.name}`,
                state: result.data
            });
        })
    }
}

export default TopWordsItem;