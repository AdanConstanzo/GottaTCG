import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Loader, Grid, Button, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { SetCard } from '../../../actions/card';
import PokemonCard from './PokemonCard';
import TrainerEnergyCard from './TrainerEnergyCard';
import api from '../../../api';

class CardPage extends React.Component {
  state = {
    card: {},
    loading: true,
    lCard: false,
    rCard: false
  }

  

  componentDidMount() {
    this.props.SetCard(this.props.match.params.id);
    axios
      .get(`/api/cards/findCardById?id=${this.props.match.params.id}`)
      .then(res => res.data.card)
      .then(card => {
        console.log(card)
        this.setState({ loading: false, card })
      });
    this.checkCards()
  }
  getCardsNumber(){
    const currentCard = this.props.match.params.id
    let previous = currentCard.split('-')
    previous[1] -= 1
    previous = previous.join('-')
    let after = currentCard.split('-')
    after[1] = Number(after[1]) +1
    after = after.join('-')
    return { lCard: previous, rCard: after }
  }
  checkCards(){
    const cards = this.getCardsNumber()
    Object.keys(cards).forEach(ele => 
      api.cards.doesCardExist(cards[ele])
        .then(res => res ? this.setState({ [ele]: cards[ele] }): 0 ))
  }
  render() {
    const { loading, card, lCard, rCard } = this.state;
    return (
        <div>
            {loading && <Loader active/>}
            <Grid>
              {lCard !== false && 
                <Grid.Column floated="left" width={2}>
                  <Button href={`/card/${lCard}`} style={{ float: "left" }} animated>
                    <Button.Content visible>{lCard}</Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow left' />
                    </Button.Content>
                  </Button>
                </Grid.Column>
              }
              {rCard !== false && 
                <Grid.Column floated="right" width={2} >
                  <Button href={`/card/${rCard}`} style={{ float: "right" }} animated>
                    <Button.Content visible>{rCard}</Button.Content>
                    <Button.Content hidden>
                      <Icon name='arrow right' />
                    </Button.Content>
                  </Button>
                </Grid.Column>
              }
            </Grid>
            <br style={{float: "clear"}} />
            {!loading && this.state.card.supertype === "Pokémon" && <PokemonCard addCard={true} card={card}  />}
            {!loading && this.state.card.supertype !== "Pokémon" && <TrainerEnergyCard addCard={true} card={card}  />}
        </div>
    );
  }
}

CardPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  SetCard: PropTypes.func.isRequired
};

function mapStateToProps (state) {
  return {
    card: state.card
  }
}

export default connect(mapStateToProps, { SetCard })(CardPage);