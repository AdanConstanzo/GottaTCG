import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Popup } from 'semantic-ui-react';

import PokemonModal from '../../PokemonCard/PokemonModal';


class CreateImage extends React.Component {

  state= {
      timeOut: null,
      display: false,
      open: false,
      lCard: null,
      hasCardCount: false
  }

  details = () => {
      axios.get(`/api/cards/findCardById?id=${this.props.card.id}`)
          .then(res => res.data.card)
          .then(card => this.setState({ lCard: card }));
      this.setState({ open: true })
  }

  close = () => this.setState({ open: false });

  render(){
      const { onClick, card, deckbuilder } = this.props;
      const { open, lCard } = this.state;
      return (
        <div>
          <Popup
            trigger={
              <img 
                style={{ width: "8em" }}
                onClick={onClick}
                type={card.supertype}
                data={card.id}
                src={card.image_url}
                alt={card.name}
              />
            }
            mouseEnterDelay={500}
            flowing
            hoverable >
            <Button onClick={this.details} >Card Details</Button>
          </Popup>
          {deckbuilder[card.supertype][card.id] !== undefined ? <p>Count: {deckbuilder[card.supertype][card.id].quantity} </p> : <p style={{ visibility: "hidden" }} >Count</p>}
          {lCard && <PokemonModal open={open} close={this.close} card={lCard} />}
        </div>
      ) 
  }
}

function mapStateToProps(state) {
  return {
    deckbuilder: state.deckbuilder,
  }
}

CreateImage.propTypes = {
  onClick: PropTypes.func.isRequired,
  card: PropTypes.shape({
      supertype: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
  }).isRequired,
  deckbuilder: PropTypes.shape({
    Pokémon: PropTypes.object.isRequired,
    Trainer: PropTypes.object.isRequired,
    Energy: PropTypes.object.isRequired,
    Count: PropTypes.object.isRequired,
  }).isRequired
};

export default connect(mapStateToProps)(CreateImage);