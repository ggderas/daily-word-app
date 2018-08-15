import React from 'react';
import { connect } from 'react-redux';

import { FetchRandomWord } from '../../words-api/WordsApi';
import AppRouter, { history } from '../../routers/AppRouter';
import moment from 'moment';
import _ from 'underscore';

class WordOfDay extends React.Component {

    goLearn() {
        let { randomWord } = this.props;
        history.push({
            pathname: `/word/${randomWord.word}`,
            state: randomWord
        });
    }    

    render() {
        let { randomWord, user } = this.props

        return (
            <div>
                {
                    user.hasAlreadyLearnedAWordToday ? (
                        <div>
                            <h4>It looks you already learned a word today buddy!</h4>
                        </div>
                    ) : (
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
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    randomWord: state.randomWord,
    user: state.user
})

export default connect(mapStateToProps, null)(WordOfDay);