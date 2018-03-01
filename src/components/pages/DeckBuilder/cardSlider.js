import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

const cardSlider = (props) => (
    <Slider {...props.settings} >
        {props.cards.map((val, count) => <div key={count}><img onClick={props.onCardClick} type={val.supertype} data={val.id} style={{ width: "8em" }} src={val.imageUrl} alt={val.name} /></div>)}
    </Slider>
);

cardSlider.propTypes = {
    settings: PropTypes.shape({}).isRequired,
    cards: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    onCardClick: PropTypes.func.isRequired
};

export default cardSlider;