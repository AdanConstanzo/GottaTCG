import React from 'react';
import { Grid, List, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AddCard, SubtractCard } from '../../../actions/deckbuilder';
import PokemonModal from "../../PokemonCard/PokemonModal";
import api from '../../../api';

// This componenet is an item on a card list. 
class cardLi extends React.Component {
  constructor(props) {
    super(props);
		// check to see if card is currently in card props (redux). (mainly used for edit deckbuilder)

		if (this.CheckAllCards(this.props.cards, this.props.card) === true) {
      api.cards.getCardById(this.props.card.id).then(card => this.setState({ card }));
      this.state = {
        display: true,
        open: false,
        card: null
      };
    } else {
			const { cards, card } = this.props
			const mapOfArrays = Object.keys(cards).map(ele => cards[ele]);
			const allCards = [].concat(...mapOfArrays);
			const filterCard = allCards.filter(ele => ele.id === card.id)[0];
			this.state = {
        display: true,
        open: false,
        card: filterCard 
      };
    }
  }
	
	CheckAllCards = (cards, card) => {
		if (cards.constructor === Array) {
			return true
		} else if (Object.keys(cards).length === 0) {
			return true;
		}
		return Object.keys(cards).forEach(key => cards[key].filter(ele => ele.id === card.id)[0] === undefined);
	}

  addCard = () => {
    const { deckbuilder, card} = this.props;
    const { src, alt, type, id, price } = card;
    const obj = {
      src,
      alt,
      type,
      id,
      price
    }
    this.props.AddCard(obj, deckbuilder);
    this.setState({ deckbuilder });
  }

  subCard = () => {

    const { deckbuilder, card} = this.props;
    const { src, alt, type, id, price } = card;

    if (deckbuilder[type][id].quantity === 1)
      this.setState({ display: false });

    const obj = {
      src,
      alt,
      type,
      id,
      price
    }
    this.props.SubtractCard(obj, deckbuilder);
    this.setState({ deckbuilder });  
  }
  close = () => this.setState({ open: false });
    
  openModal = () => this.setState({ open: true })

  render(){
      const { deckbuilder, card } = this.props;
      const { src, alt, id, type, price }  = card;
      const { display, open } = this.state;
      if (display) {
          return (
              <List.Item>
                  <List.Content>
                      <List.Header>{alt}</List.Header>
                          <Grid columns={4} >
                              <Grid.Column>
                              {deckbuilder[type][id].quantity} x {id}  @ {price} 
                              </Grid.Column>
                              <Grid.Column>
                                  <img 
                                      onClick={this.openModal}
                                      style={{width: "70%"}}
                                      src={src}
                                      alt={alt}
                                  />
                                  {this.state.card !== null && <PokemonModal card={this.state.card} open={open} close={this.close} />}
                              </Grid.Column>
                              <Grid.Column>
                                  <Button onClick={this.addCard} icon>
                                      <Icon name='plus' />
                                  </Button>
                              </Grid.Column>
                              <Grid.Column>
                                  <Button onClick={this.subCard} icon>
                                      <Icon name='minus' />
                                  </Button>
                              </Grid.Column>
                          </Grid>
                  </List.Content>
              </List.Item>
          )
      }
      return (<span/>)
  }
}

function mapStateToProps(state){
  return{
    deckbuilder: state.deckbuilder,
    cards: state.cards,
  }
}

cardLi.propTypes = {
  deckbuilder: PropTypes.shape({}).isRequired,
  cards: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  AddCard: PropTypes.func.isRequired,
  SubtractCard: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { AddCard, SubtractCard })(cardLi);
