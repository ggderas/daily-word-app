import React from 'react';
import AppRouter, { history } from '../../routers/AppRouter';
import moment from 'moment';

import { FetchWordDetails } from '../../words-api/WordsApi';
import { List, Label, Container, Popup } from 'semantic-ui-react';


class TopWordsItem extends React.Component {
    render() {
        let { word } = this.props;
        let popupOverContent = `Your learned this one on ${moment(word.learnedDate).format("MMM Do YY")}`;

        return (
            <Container textAlign="center" style={{ marginTop: "0.5em" }}>
                <List.Item >
                    <List.Header onClick={this.onWordClick.bind(this)}>
                        <Popup trigger={<Label as="a" color="teal">{word.name}</Label>} content={popupOverContent} />
                    </List.Header>
                </List.Item>
            </Container>
        )
    }

    onWordClick() {
        let { word } = this.props;

        FetchWordDetails(word.name)
            .then((result) => {
                history.push({
                    pathname: `/word/${word.name}`,
                    state: result.data
                });
            })
    }
}

export default TopWordsItem;