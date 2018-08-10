import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import _ from 'underscore';
import WordDetailDefinition from './WordDetailDefinition';

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

    render() {
        let { word } = this.props;

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
                    word.results.map((r, key) => (
                        <p style={{display: "inline"}} key={key}><button onClick={this.onDefinitionClick.bind(this, key)}>Definition {(key + 1) + ""}</button></p>
                    ))
                }

                {this.getVisibleDefinition()}


            </div>
        )
    }
}

const mapStateToProps = (state, props) => ({
    word: props.location ? props.location.state : {}
})

export default connect(mapStateToProps, null)(WordDetail);