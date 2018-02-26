import React from 'react';
import Slider from 'react-slick'

const cardSlider = (props) => (
    <Slider {...props.settings} >
        {props.cards.map((val, count) => <div key={count}><img onClick={props.onCardClick} style={{ width: "8em" }} src={val.imageUrl} alt={val.name} /></div>)}
    </Slider>
);
export default cardSlider;