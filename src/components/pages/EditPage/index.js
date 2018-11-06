import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

import api from '../../../api';
import PokemonSet from '../../forms/PokemonSet';
import CardSlider from '../DeckBuilder/cardSlider';
import CardSelector from '../DeckBuilder/cardSelector';
import { ClearState, AddCard, SetCard } from '../../../actions/deckbuilder';


class index extends React.Component {
  state = {
    deck: null,
    sliderView: true,
    sets: []
  };
  
  componentDidMount(){
    api.deck.GetDeckById(this.props.match.params.id)
    .then(deck=> {
      this.setState({ deck });
      const { deckbuilder } = this.props;
      Object.keys(deck.deck["Pokémon"]).forEach(ele => {
        if (deck.deck["Pokémon"][ele] != null) {
          const obj = {
            src: deck.deck["Pokémon"][ele].src,
            alt: deck.deck["Pokémon"][ele].alt,
            type: deck.deck["Pokémon"][ele].type,
            id: deck.deck["Pokémon"][ele].id,
            price: deck.deck["Pokémon"][ele].price
          }
          this.props.SetCard(obj, deck.deck["Pokémon"][ele].quantity, deckbuilder);
        }
      });
    });
    api.sets.getAll()
    .then(sets => this.setState({ sets }));
  }
  
  onCardClick = (e) => {
    const { deckbuilder } = this.props;
    const { src, alt } = e.target;
    const type = e.target.getAttribute('type');
    const id = e.target.getAttribute("data");
    const price = e.target.getAttribute("data-price");
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

  onButtonSubmit = dimmer => () => this.setState({ dimmer, open: true});
  
  toggleSlider = () => this.setState((preState) => ({ sliderView: !preState.sliderView }))

  render(){

    const { deck, sliderView, sets } = this.state;
    const { cards, deckbuilder } = this.props;
    const { Pokémon, Trainer, Energy, Cost } = deckbuilder;
    const PCount = deckbuilder.Count.Pokémon;
    const TCount = deckbuilder.Count.Trainer;
    const ECount = deckbuilder.Count.Energy;
    const Total = PCount + TCount + ECount;
    
    const settings = {
      dots: true,
      draggable: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6,
      lazyLoad: "progressive"
  };

    if (deck === null) {
      return(
        <h1>LOADING</h1>
      )
    }
    return(
      <div style={{ paddingTop: "20px" }} >
        <Grid columns={5} >
          {sets.length > 0 && <PokemonSet sets={sets} />}
          {sliderView ? <Button onClick={this.toggleSlider} >Hide Slider</Button> : <Button onClick={this.toggleSlider}>Show Slider</Button>}
        </Grid>
        <div style={{marginBottom: "5em", marginTop: "2em", display: sliderView?"":"none"}}>
            {Object.keys(cards[0]).length > 0 && (
                <CardSlider onCardClick={this.onCardClick} settings={settings} cards={cards} />
            )}
        </div>
        <Grid columns={3}>
            <Grid.Column>
                <h3>Total Cards: {Total}</h3>
            </Grid.Column>
            <Grid.Column>
              <h3>Average Price: {Cost}</h3>
            </Grid.Column>
            <Grid.Column>
                <Button onClick={this.onButtonSubmit('blurring')} >Submit Deck</Button>
            </Grid.Column>

        </Grid>

        <Grid columns={3} divided >
          <Grid.Column>
              <CardSelector 
                  selection="Pokémons" 
                  type='Pokémon' 
                  count={PCount} 
                  cards={Pokémon}  
                  sliderView={sliderView}
              />
          </Grid.Column>
          <Grid.Column>
              <CardSelector 
                  selection="Trainers" 
                  type='Trainer' 
                  count={TCount} 
                  cards={Trainer}  
                  sliderView={sliderView}
              />
          </Grid.Column>
          <Grid.Column>
              <CardSelector 
                  selection="Energy" 
                  type='Energy' 
                  count={ECount} 
                  cards={Energy}  
                  sliderView={sliderView}
              />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

index.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
        id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  cards: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  AddCard: PropTypes.func.isRequired,
  SetCard: PropTypes.func.isRequired,
  deckbuilder: PropTypes.shape({}).isRequired,
};

function mapStateToProps(state) {
  return {
    cards: state.cards,
    deckbuilder: state.deckbuilder,
    quill: state.quill,
    deckEnergyView: state.deckEnergyView
  }
}

export default connect(mapStateToProps, { AddCard, ClearState, SetCard })(index);