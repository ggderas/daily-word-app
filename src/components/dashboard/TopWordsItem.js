import React from 'react';
import AppRouter, { history } from '../../routers/AppRouter';

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
        let {word} = this.props
        this.APICALL()
        .then((result) => {
            console.log("result", result);
            history.push({
                pathname: `/word/${word.name}`,
                state: result
            });
        })
    }

    APICALL(){
        // TODO: Make actual API call
        return new Promise((resolve) => {
            resolve({
                name: "Somethig",
                synonyms: [],
                definitions: []
            })
        })
    }
}

export default TopWordsItem;