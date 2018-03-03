import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

class cardSlider extends React.Component {
    onMouseEnter = (e) => {
        console.log(e.target)
        // get card data here and show.
        // set a time? maybe 200ms?
    }
    render(){
        const { settings, cards, onCardClick } = this.props;
        return (
            <Slider {...settings} >
                {cards.map((val, count) =>
                    <div key={count}>
                        <img
                            onMouseEnter={this.onMouseEnter} 
                            style={{ width: "8em" }} 
                            onClick={onCardClick} 
                            type={val.supertype} 
                            data={val.id} 
                            src={val.imageUrl} 
                            alt={val.name} 
                        />
                    </div>)
                }
            </Slider>
        )
    }
}

cardSlider.propTypes = {
    settings: PropTypes.shape({}).isRequired,
    cards: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    onCardClick: PropTypes.func.isRequired
};

export default cardSlider;