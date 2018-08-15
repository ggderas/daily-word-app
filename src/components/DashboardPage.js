import React from 'react';
import { connect } from 'react-redux';

import WordOfDay from './dashboard/WordOfDay';
import TopWords from './dashboard/TopWords';
import TopFiveUsers from './dashboard/TopFiveUsers';


const DashboardPage = () => (
  <div>
    <WordOfDay/>
    <TopFiveUsers/>
    <TopWords/>
  </div>
);

const mapStateToProps = (state, props) => {
  return  { user: state.user }
}

export default connect(mapStateToProps, null)(DashboardPage)

