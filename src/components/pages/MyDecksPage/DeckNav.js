import React from 'react';
import PropTypes from 'prop-types';

const DeckNav = (props) => (
    <div>
        <a href={`deck/${props.deckId}`} ><h3>{props.name}</h3></a>
        <p>Card Count: {props.cardCount} </p>
        <p>Rotation: {props.rotation}</p>
    </div>
);

DeckNav.propTypes = {
   name: PropTypes.string.isRequired,
   deckId: PropTypes.string.isRequired
};

export default DeckNav;