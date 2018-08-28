import React from 'react';
import AppRouter, { history } from '../../routers/AppRouter';
import moment from 'moment';

import { FetchWordDetails } from '../../words-api/WordsApi';
import { List, Label, Container, Popup } from 'semantic-ui-react';
import { getRelativeDate } from '../../helpers/moment-helper';


class TopWordsItem extends React.Component {
    render() {
        let { word } = this.props;
        let popupOverContent = `Your learned this one ${getRelativeDate(word.learnedDate)}`;

        return (
            <List.Item >
                <List.Header onClick={this.onWordClick.bind(this)}>
                    <Popup trigger={<Label as="a">{word.name}</Label>} content={popupOverContent} />
                </List.Header>
            </List.Item>
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