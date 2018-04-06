import React from 'react';
import PropTypes from 'prop-types';
import { List, Segment } from 'semantic-ui-react';

import CardLi from './CardLi'

class DeckCollumn extends React.Component {
    state = {

    };
    render(){
        const { type, cards, count } = this.props;
        return (
            <div>
                <h3>{type} x {count}</h3>
                <Segment inverted >
                    <List divided animated inverted >
                        {Object.keys(cards)
                            .map((val, i) =>
                                <CardLi
                                    key={i}
                                    src={cards[val].src}
                                    name={cards[val].alt}
                                    quantity={cards[val].quantity}
                                    id={cards[val].id}
                                />)}
                    </List>
                </Segment>
            </div>
        )
    }
}

DeckCollumn.propTypes = {
    type: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    cards: PropTypes.shape({}).isRequired
};

export default DeckCollumn;