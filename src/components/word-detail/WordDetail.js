import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import _ from 'underscore';
import WordDetailDefinition from './WordDetailDefinition';

import { learnWord } from '../../datasources/users';
import { saveUser } from '../../actions/user';

class WordDetail extends React.Component {
    state = {
        keyDefinitionVisible: 0
    }

    onDefinitionClick(key) {
        this.setState({ keyDefinitionVisible: key });
    }

    getVisibleDefinition = () => {
        let wordDefinition = _.find(this.props.word.results, (item, key) => key === this.state.keyDefinitionVisible);
        return <WordDetailDefinition wordDefinition={wordDefinition} />
    }

    onLearnWord = () => {
        const { user, word, onSaveUser } = this.props;
        learnWord(user, word.word).then((result) => {
            user.words.push(result);
            onSaveUser(user);
        })
    }

    userAlreadyLearnedThisWord() {
        let { user, word } = this.props;
        return _.find((user.words || []), (w) => word.word === w.name) ? true : false;
    }

    render() {
        let { word, user } = this.props;
        let learnedWord  = _.find(user.words || [], (w) => w.name === word.word);


        return (
            <div>

                <Link className="" to="/">
                    <h1>Home</h1>
                </Link>

                <div>
                    <h1>{word.word}</h1>
                    <h5>{word.pronunciation ? word.pronunciation.all : ""}</h5>
                </div>

                {
                    this.userAlreadyLearnedThisWord() && (
                        <div>
                            <h3>You learned this word on {moment(learnedWord.learnedDate).format("LL")}</h3>
                        </div>
                    )
                }


                {
                    word.results.map((r, key) => (
                        <p style={{ display: "inline" }} key={key}><button onClick={this.onDefinitionClick.bind(this, key)}>Definition {(key + 1) + ""}</button></p>
                    ))
                }

                {this.getVisibleDefinition()}

                {
                    !this.userAlreadyLearnedThisWord() && (
                        <button onClick={this.onLearnWord.bind(this)}>I have learned this word!</button>
                    )
                }



            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    word: props.location ? props.location.state : {},
    user: state.user
});

const mapDispatchToProps = (dispatch) => {
    return {
        onSaveUser: (user) => { dispatch(saveUser(user)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WordDetail);