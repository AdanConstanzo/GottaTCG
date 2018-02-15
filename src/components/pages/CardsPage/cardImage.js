import React from 'react';
import PropTypes from 'prop-types';

const style={
    "width": "100%"
}

const cardImage = (props) => (
    <a href={`card/${props.alt}`}> <img style={style} src={props.src} alt={props.alt} /> </a>
);

cardImage.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

export default cardImage;