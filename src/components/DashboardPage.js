import React from 'react';
import { connect } from 'react-redux';

import WordOfDay from './dashboard/WordOfDay';
import TopWords from './dashboard/TopWords';
import TopFiveUsers from './dashboard/TopFiveUsers';

import { Container, Grid, Segment } from 'semantic-ui-react';

const DashboardPage = () => (
  <div>
    <Container text style={{ marginTop: '7em' }}>
    
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <WordOfDay />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment><TopWords /></Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid columns={1} >
        <Grid.Row>
          <Grid.Column>
            <Segment>
              <TopFiveUsers />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    </Container>
  </div>
);

const mapStateToProps = (state, props) => {
  return { user: state.user }
}

export default connect(mapStateToProps, null)(DashboardPage)

