import React from 'react';
import {connect} from 'react-redux';
import _ from 'underscore';

import TopWordsItem from './TopWordsItem';

const getLastFiveWordsLearned = (words) => {
  return words;
    // return 
    //     _.chain(words)
    //     .sortBy((w) => w.learnedDate)
    //     .first(5)
    //     .value();
}

const TopWords = ({words}) => (
  <div>
      {
        words.map((w) => { 
          return (
            <TopWordsItem key={w.name} word={w}/>
          )
        })
      }
  </div>
);

const mapStateToProps = (state, props) => ({
  words: getLastFiveWordsLearned(state.user.words)
})

export default connect(mapStateToProps, null)(TopWords)


