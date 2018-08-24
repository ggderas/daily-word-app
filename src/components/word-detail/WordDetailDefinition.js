import React from 'react';

import { Grid, Image, Segment, Label, Container, Header, Divider } from 'semantic-ui-react';

const WordDetailDefinition = ({ wordDefinition }) => (
    <Container >
        <Grid columns={1}>
            <Grid.Column>
                <Segment raised>
                    <Label as='a' color='red' ribbon>Definition</Label>
                    <Header as="h3">{wordDefinition.definition}</Header>
                </Segment>
            </Grid.Column>
        </Grid>

        <Grid columns={2}>
            {
                wordDefinition.examples && wordDefinition.examples.length > 0 ? (

                    <Grid.Column>
                        <Segment raised>
                            <Label as='a' color='blue' ribbon>examples</Label>
                            {(wordDefinition.examples || []).map((s, key) => <Header as="h4" key={key}>{s}</Header>)}
                        </Segment>
                    </Grid.Column>
                ) : null
            }
            {
                wordDefinition.synonyms && wordDefinition.synonyms.length > 0 ? (
                    <Grid.Column>
                        <Segment raised>
                            <Label as='a' color='blue' ribbon>Synonyms</Label>
                            {(wordDefinition.synonyms || []).map((s, key) => <Label key={key}>{s}</Label>)}
                        </Segment>
                    </Grid.Column>
                ) : null
            }
        </Grid>

        <Divider/>


    </Container>
);

export default WordDetailDefinition;