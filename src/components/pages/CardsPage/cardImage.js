import React from 'react';
import PropTypes from 'prop-types';

import PokemonModal from "../../PokemonCard/PokemonModal";

class CardImage extends React.Component{
  state = {
    open: false
  }

  onClick = (e) => {
    e.preventDefault()
    this.setState({ open: true });
  }
  close = () => this.setState({ open: false });
  render(){
    const { card } = this.props;
    const { image_url, name } = card;
    const { open } = this.state;
    const style={
      "width": "100%"
    }
    return(
      <span>
        <a href="" onClick={this.onClick} > <img style={style} src={image_url} alt={name} /> </a>
        <PokemonModal dimmer='blurring' open={open} close={this.close} card={card} />
      </span>
    )
  }
}

CardImage.propTypes = {
    card: PropTypes.shape({
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
};


export default CardImage;