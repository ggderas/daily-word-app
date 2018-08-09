import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

const getLastFiveWordsLearned = (words) => {
    return 
        _.chain(words)
        .sortBy((w) => w.learnedDate)
        .first(5)
        .value();
}

const TopWords = ({words}) => (
  <div>
      {
        words.map((w) => {
          return (
            <li key={w.name}>{w.name}</li>
          )  
        })
      }
  </div>
);

const mapStateToProps = (state, props) => ({
  words: getLastFiveWordsLearned(state.user.words)
})

export default connect(mapStateToProps, null)(TopWords)


