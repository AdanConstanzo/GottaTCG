import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';

import PokemonCard from "../pages/CardPage/PokemonCard";
import TrainerCard from "../pages/CardPage/TrainerEnergyCard";

const PokemonModal = (props) => (
  <Modal dimmer="blurring" style={{marginTop:"0px"}} size="fullscreen" open={props.open} onClose={props.close}>
      <Modal.Header>{props.card.name}</Modal.Header>
      <Modal.Content>
        {Object.keys(props.card).length > 0 && props.card.supertype === "Pokémon" &&
          <PokemonCard addCard={false} card={props.card}/> 
        }
        {Object.keys(props.card).length > 0 && (props.card.supertype === "Trainer" || props.card.supertype === "Energy" ) &&
          <TrainerCard addCard={false} card={props.card}/> 
        }
        <Button href={`/card/${props.card.id}`}>Details on price, decks and collections</Button>
      </Modal.Content>
  </Modal>
)

PokemonModal.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  card: PropTypes.shape({
    name: PropTypes.string.isRequired,
    supertype: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired
};

export default PokemonModal