import React from 'react';
import PropTypes from 'prop-types';

import CardLI from './cardLi';

const cardSelector = (props) => (
    <div>
        <h1>{props.selection}</h1>
        <hr />
        <ul>
        {Object.keys(props.cards).length > 0 &&
            Object.keys(props.cards)
                .map(val => 
                    <CardLI 
                        key={props.cards[val].id}
                        id={props.cards[val].id}
                        quantity={props.cards[val].quantity}
                    />)
        }
        </ul>
    </div>
);
cardSelector.propTypes = {
    selection: PropTypes.string.isRequired,
    cards: PropTypes.shape({}).isRequired
};

export default cardSelector;