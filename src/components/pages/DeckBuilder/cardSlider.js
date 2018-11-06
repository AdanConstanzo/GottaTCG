import React from 'react';
import Slider from 'react-slick'
import PropTypes from 'prop-types';

import CreateImage from './CreateImage';

import './slick.css';

class cardSlider extends React.Component {
  state={
      isHover: false
  }

  onMouseLeave = () => this.setState({ isHover: false });
    
  render(){
    const { settings, cards, onCardClick } = this.props;
    return (
      <Slider {...settings} >
          {cards.map((val) =>
            <div key={val.id}>
                <CreateImage key={val.id} onClick={onCardClick} card={val} />
            </div>
          )
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