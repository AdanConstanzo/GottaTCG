import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Card } from 'semantic-ui-react';

import * as actions from "../../actions/auth";
import api from '../../api';
import DeckNav from './MyDecksPage/DeckNav'; 

class HomePage extends React.Component {
  state = {
    allDecks: null,
    typeDecks: null,
  };
  componentDidMount(){
    api.deck.GetAllDecks()
      .then(decks => this.setState({ allDecks: decks }));
    api.deck.GetAllDecksByType('Grass')
      .then(decks => this.setState({typeDecks: decks}));
  }
  render(){
    // const { isAuthenticated, logout } = this.props;
    const { allDecks, typeDecks } = this.state;
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
                />)
            )}
        </Card.Group>
        <h3>Decks by type</h3>
        <Card.Group itemsPerRow={10} >
          {typeDecks &&
            (typeDecks
              .map((deck, i) =>
                <DeckNav
                  key={i}
                  name={deck.name}
                  deckId={deck._id}
                  cardCount={deck.cardCount}
                  rotation={deck.rotation}
                  energyView={deck.deck.deckEnergyView}
                />)
            )}
        </Card.Group>
        {/* {isAuthenticated ? (
            <button onClick={() => logout()}>Logout</button>
          ) : (
              <div>
                <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link>
              </div>
            )} */}
      </div>
    )
  }
}

HomePage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}

export default connect(mapStateToProps, { logout: actions.logout })(HomePage);
