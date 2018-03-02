import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

import CardLI from './cardLi';

const cardSelector = (props) => (
    <div>
        <h1>{props.selection} x {props.count}</h1>
        <hr />
        <List celled >
        {Object.keys(props.cards).length > 0 &&
            Object.keys(props.cards)
                .map(val => 
                    <CardLI 
                        key={props.cards[val].id}
                        id={props.cards[val].id}
                        quantity={props.cards[val].quantity}
                        alt={props.cards[val].alt}
                        src={props.cards[val].src}
                        type={props.cards[val].type}
                    />)
        }
        </List>
    </div>
);
cardSelector.propTypes = {
    selection: PropTypes.string.isRequired,
    cards: PropTypes.shape({}).isRequired,
    count: PropTypes.number.isRequired
};

export default cardSelector;