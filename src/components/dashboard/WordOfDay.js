import React from 'react';
import { connect } from 'react-redux';

import { FetchRandomWord } from '../../words-api/WordsApi';
import AppRouter, { history } from '../../routers/AppRouter';
import moment from 'moment';
import _ from 'underscore';

import { Container, Button, Grid, Segment, Image, Label, Header as SemanticHeader, Divider } from 'semantic-ui-react';

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
                <div>
                    <Grid>
                        <Grid.Column>
                            <Label color='red' ribbon><h1>Your daily word</h1></Label>
                            {
                                user.hasAlreadyLearnedAWordToday ? (
                                    <Container style={{ marginTop: '1em' }} textAlign="center">
                                        <h4>It looks you already learned a word today buddy, come back tomorrow!</h4>
                                    </Container>
                                ) : (
                                        <Container style={{ marginTop: '1em' }}>
                                            <h3 style={{ textAlign: "center" }}>{randomWord.word}</h3>
                                            <Divider />
                                            <Container textAlign="center">
                                                <Button basic color='blue' onClick={this.goLearn.bind(this)}>Go learn it!</Button>
                                            </Container>
                                        </Container>
                                    )
                            }
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    randomWord: state.randomWord,
    user: state.user
})

export default connect(mapStateToProps, null)(WordOfDay);