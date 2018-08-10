import React from 'react';
import { connect } from 'react-redux';

import { FetchRandomWord } from '../../words-api/WordsApi';
import AppRouter, { history } from '../../routers/AppRouter';

class WordOfDay extends React.Component{
    render() {
        let { randomWord } = this.props

        return (
            <div>
                <div>
                    <h1>{randomWord.word}</h1>
                    <h3>Frequency {randomWord.frequency}</h3>
                </div>            

                <div>
                    <button onClick={this.goLearn.bind(this)}>Go learn it!</button>
                </div>
            </div>
        )
    }

    goLearn(){
        let { randomWord } = this.props;
        history.push({
            pathname: `/word/${randomWord.word}`,
            state: randomWord
        });        
    }
}

const mapStateToProps = (state, props) => ({
    randomWord: state.randomWord
})

export default connect(mapStateToProps, null)(WordOfDay);