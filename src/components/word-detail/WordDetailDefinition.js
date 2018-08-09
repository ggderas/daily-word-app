import React from 'react';

const WordDetailDefinition = ({ wordDefinition }) => (
    <div >
        <div>
            <h1>Definition</h1>
            <p>{wordDefinition.definition}</p>
        </div>

        <div>
            <h1>Synonyms</h1>
            {(wordDefinition.synonyms || []).map((s, key) => <span key={key}>{s}</span>)}
        </div>

        <div>
            <h1>Examples</h1>
            {(wordDefinition.examples || []).map((s, key) => <p key={key}>{s}</p>)}
        </div>        

    </div>
);

export default WordDetailDefinition;