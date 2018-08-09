import React from 'react';
import { connect } from 'react-redux';

import _ from 'underscore';
import WordDetailDefinition from './WordDetailDefinition';

class WordDetail extends React.Component {
    state = {
        currentDefinition: 0
    }

    onDefinitionClick(key) {
        this.setState({ currentDefinition: key });
    }

    getVisibleDefinition = () => {
        let wordDefinition = _.find(this.props.word.results, (item, key) => key === this.state.currentDefinition);
        return <WordDetailDefinition wordDefinition={wordDefinition} />
    }

    render() {
        let { word } = this.props;

        return (
            <div>
                <div>
                    <h1>{word.word}</h1>
                </div>


                {
                    word.results.map((r, key) => (
                        <p><button onClick={this.onDefinitionClick.bind(this, key)}>Definition {(key + 1) + ""}</button></p>
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