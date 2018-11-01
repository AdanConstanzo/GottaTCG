import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Input } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { SetValueToCardCollection } from '../../../actions/collection';
import api from '../../../api';
import PokemonModal from '../../PokemonCard/PokemonModal';

class CollectionCard extends React.Component {

  state = {
    card: null,
    open: false
  }
  
  // onClick function for each card. Opens the modal.
  onClick = () => {
    // an id from props.
    const { id } = this.props.collection;
    // if the state of the card is null grab from API
    if (this.state.card === null) {
      api.cards.getCardById(id)
        .then(card => this.setState({ card, open: true }));
    } else { /* There is a card set so no need for API call. */
      this.setState({ open: true });
    }
  }

  onBlur = e => {
    if (e.target.value) {
      this.handleCollection(e.target.value);
    }
  }

  handleCollection = val => {
    const { _id } = this.props.collection
    this.props.SetValueToCardCollection({
      quantity: val,
      collectionId: _id
    })
    .then(res => res.collection)
    .then(Collection => this.setState({ Collection }));
  }

  close = () => this.setState({ open: false });

  
  render(){

    const { quantity, name, image_url } = this.props.collection;
    const { open, card }  = this.state;
    return (
      <Card link >
        {card !== null && <PokemonModal card={this.state.card} open={open} close={this.close} />}
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Description textAlign="center" >
              <Image as='a' centered src={image_url} onClick={this.onClick} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Input type="number" fluid onBlur={this.onBlur} placeholder={quantity} />                        
        </Card.Content>
      </Card>
    )
  }
}

CollectionCard.propTypes = {
  collection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    UserId: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  SetValueToCardCollection: PropTypes.func.isRequired  
};

export default connect(null, { SetValueToCardCollection })(withRouter(CollectionCard));