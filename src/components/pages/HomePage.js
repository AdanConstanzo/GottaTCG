import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Message } from 'semantic-ui-react';

import * as actions from "../../actions/auth";
import api from '../../api';
import DeckNav from './MyDecksPage/DeckNav'; 
import EnergySelector from './DeckBuilder/EnergySelector';

import { GetDecksBasedOnType } from '../../actions/decks';

class HomePage extends React.Component {
  state = {
    allDecks: null,
    typeDecks: null
  };
  componentDidMount(){
    api.deck.GetAllDecks()
      .then(decks => this.setState({ allDecks: decks }));
    this.props.GetDecksBasedOnType("Grass");
  }
  render(){
    const { allDecks } = this.state;
    const { typeDecks, energyType } = this.props;
    return (
      <div>
        <h3>Top Decks</h3>
        <Card.Group itemsPerRow={10} >
          {allDecks &&
            (allDecks
              .map((deck, i) =>
                <DeckNav
                  key={i}
                  name={deck.name}
                  deckId={deck._id}
                  cardCount={deck.cardCount}
                  rotation={deck.rotation}
                  energyView={deck.deck.deckEnergyView}
                  date={deck.date}
                />)
            )}
        </Card.Group>
        <h3>Decks by type</h3>
        <EnergySelector setSearch="decks" />
        
        <Card.Group itemsPerRow={10} >
          {((energyType && typeDecks[energyType.pokemonType]) && (typeDecks[energyType.pokemonType].length > 0)) ? 
            typeDecks[energyType.pokemonType].map((deck,i) =>
              <DeckNav
                key={i}
                name={deck.name}
                deckId={deck._id}
                cardCount={deck.cardCount}
                rotation={deck.rotation}
                energyView={deck.deck.deckEnergyView}
                date={deck.date}
              /> 
          ): <Message info > There are no {energyType.pokemonType} type decks. </Message> }
          
        </Card.Group>
      </div>
    )
  }
}

HomePage.propTypes = {
  typeDecks: PropTypes.shape({}).isRequired,
  GetDecksBasedOnType: PropTypes.func.isRequired,
  energyType: PropTypes.shape({}).isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    typeDecks: state.decks,
    energyType: state.deckEnergyView
  };
}

export default connect(mapStateToProps, { logout: actions.logout, GetDecksBasedOnType })(HomePage);
