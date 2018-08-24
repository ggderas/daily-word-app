import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import _ from 'underscore';
import WordDetailDefinition from './WordDetailDefinition';

import { learnWord } from '../../datasources/users';
import { saveUser } from '../../actions/user';

import { Tab, Container, Step, Header, Icon, Label, Grid } from 'semantic-ui-react';

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

    getTabPanes(){
        let panes = [];
        this.props.word.results.map((r, key) => {
            let pane = { menuItem: `Definition # ${key + 1}`, render: () => 
                <Tab.Pane attached={false}>
                    <WordDetailDefinition wordDefinition={r}/>
                </Tab.Pane>
            };

            panes.push(pane);
        });

        return panes;
    }

    render() {
        let { word, user } = this.props;
        let learnedWord  = _.find(user.words || [], (w) => w.name === word.word);


        return (
            <Container style={{marginTop: "5em"}}>
                <Container textAlign="center">
                    <Grid>
                        <Grid.Column>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='book' circular color="black" />
                                <Header.Content>{word.word}</Header.Content>
                                <Header.Subheader>{word.pronunciation ? word.pronunciation.all : ""}</Header.Subheader>
                            </Header>    
                        </Grid.Column>
                    </Grid>
                </Container>

                <Tab menu={{ secondary: true, pointing: true }} panes={this.getTabPanes()} />  

            </Container>

                // <div>
                //     <h1>{word.word}</h1>
                //     <h5></h5>
                // </div>

                // {
                //     this.userAlreadyLearnedThisWord() && (
                //         <div>
                //             <h3>You learned this word on {moment(learnedWord.learnedDate).format("LL")}</h3>
                //         </div>
                //     )
                // }

                // {
                //     !this.userAlreadyLearnedThisWord() && (
                //         <button onClick={this.onLearnWord.bind(this)}>I have learned this word!</button>
                //     )
                // }
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