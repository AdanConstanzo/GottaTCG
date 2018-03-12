import React from 'react';
import PropTypes from 'prop-types';

const DeckNav = (props) => (
    <div>
        <a href={`deck?id=${props.deckId}`} ><h3>{props.name}</h3></a>
    </div>
);

DeckNav.propTypes = {
   name: PropTypes.string.isRequired,
   deckId: PropTypes.string.isRequired
};

export default DeckNav;