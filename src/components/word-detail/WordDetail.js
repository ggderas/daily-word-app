import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import _ from 'underscore';
import WordDetailDefinition from './WordDetailDefinition';
import { learnWord } from '../../datasources/users';
import { saveUser } from '../../actions/user';
import { Tab, Container, Step, Header, Icon, Label, Grid, Segment, Button } from 'semantic-ui-react';

const square = { width: 175, height: 175 }

class WordDetail extends React.Component {
    state = {
        keyDefinitionVisible: 0
    }

    onLearnWord = () => {
        const { user, word, onSaveUser } = this.props;
        learnWord(user, word.word).then((result) => {
            user.words.push(result);
            user.hasAlreadyLearnedAWordToday = true;

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
                <Container>
                    <Grid>
                        <Grid.Column textAlign="center">
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='book' circular color="black" />
                                <Header.Content>{word.word}</Header.Content>
                                <Header.Subheader>{word.pronunciation ? word.pronunciation.all : ""}</Header.Subheader>
                            </Header>    
                        </Grid.Column>
                    </Grid>
                    {
                        this.userAlreadyLearnedThisWord() ? (
                            <Grid>
                                <Grid.Column textAlign="right">
                                    <Label tag color="orange">You learned this word on {moment(learnedWord.learnedDate).format("LL")}</Label>
                                </Grid.Column>
                            </Grid>    
                        ) : (
                            <Grid>
                                <Grid.Column textAlign="right">
                                    <Button onClick={this.onLearnWord.bind(this)} basic color='blue'>I have learned this word!</Button>
                                </Grid.Column>
                            </Grid>                                
                            
                        )
                    }                
                </Container>

                <Tab menu={{ secondary: true, pointing: true }} panes={this.getTabPanes()} />  

            </Container>

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