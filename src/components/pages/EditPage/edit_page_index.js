import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Modal, Form, Message, Select, Input } from 'semantic-ui-react';
import { connect } from 'react-redux';

import api from '../../../api';
import PokemonSet from '../../forms/PokemonSet';
import CardSlider from '../DeckBuilder/cardSlider';
import CardSelector from '../DeckBuilder/cardSelector';
import EnergySelector from '../DeckBuilder/EnergySelector';
import QuillEditor from '../DeckBuilder/quillEditor';
import { ClearState, AddCard, SetCard, SetCost, SetDeckEnergyView } from '../../../actions/deckbuilder';
import { SetQuillString } from '../../../actions/quill';



class index extends React.Component {
  state = {
    deck: null,
    sliderView: true,
    sets: [],
    deckInfo: null,
    deckSubmitted: false,
    dimmer: null,
    error: false,
    success: false,
    rotation: "",
    open: false,
    name: "",
  };
  
  componentDidMount(){
    api.deck.GetDeckById(this.props.match.params.id)
    .then(deck=> {
      this.setState({ deck });
      this.setFormComponenets(deck);
      this.SetPrice(deck);
      this.props.SetQuillString(deck.deck.quill, this.props.deckbuilder);
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

  onChange = (e, { name, value }) => this.setState({ [name]: value });

  onButtonSubmit = dimmer => () => this.setState({ dimmer, open: true});


  // sets the correct states and props for the form to edit the deck. 
  setFormComponenets = (deckObject) => {
    const name = deckObject.name;
    const rotation = deckObject.rotation;
    this.setState({ name, rotation });
    this.props.SetDeckEnergyView(deckObject.deck.deckEnergyView);
  }
  // sets total price of each cards and also invokes SetStateForDeck. 
  SetPrice = (deckObject) => {
    const cards = ["Pokémon", "Trainer", "Energy"];
    const cardPrice = []
    cards.forEach(ele => {
      cardPrice.push(this.SetStatesForDeck(deckObject.deck, ele));
    })
    const { deckbuilder } = this.props;
    this.props.SetCost(cardPrice.reduce((prev, curr) => prev + curr, 0).toPrecision(4), deckbuilder);
  }
  
  // sets cards from deckbuilder and assigns card to CardSelector.
  // returns the total price of each columns
  SetStatesForDeck = (PokemonDeck, type) => {
    const { deckbuilder } = this.props;
    let Price = 0;
    Object.keys(PokemonDeck[type]).forEach(ele => {
      if (PokemonDeck[type][ele] != null) {
        const obj = {
          src: PokemonDeck[type][ele].src,
          alt: PokemonDeck[type][ele].alt,
          type: PokemonDeck[type][ele].type,
          id: PokemonDeck[type][ele].id,
          price: PokemonDeck[type][ele].price
        }
        Price +=  (Number(obj.price) * Number(PokemonDeck[type][ele].quantity));
        this.props.SetCard(obj, PokemonDeck[type][ele].quantity, deckbuilder);
      }
    })
    return Price;
  }

  editDeck = () => {
    const { deckbuilder } = this.props;
    const { name, rotation } = this.state;
    deckbuilder.quill = this.props.quill;
    deckbuilder.deckEnergyView = this.props.deckEnergyView;
    api.deck.UpdateDeck({
      deckbuilder,
      name,
      rotation
    }).then((data) => {
      this.setState({ deckInfo: data, success: true } )
    }, error => {
      if (error) {
        this.setState({ error: true, global: error.response.data.error.global, deckSubmitted: false })
      }
    })

  }

  toggleSlider = () => this.setState((preState) => ({ sliderView: !preState.sliderView }));

  close = () => this.setState({ open: false });

  render(){

    const { deck, sliderView, sets, deckInfo, deckSubmitted, dimmer, error, success, rotation, open, name } = this.state;
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
    const options = [
      { key: 'S', text: 'Standard', value: 'Standard' },
      { key: 'E', text: 'Expanded', value: 'Expanded' },
      { key: 'U', text: 'Unlimited', value: 'Unlimited' },
    ]
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
                <Button onClick={this.onButtonSubmit('blurring')} >Edit Deck</Button>
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
        <Modal 
            dimmer={dimmer}
            style={{marginTop:"0px"}}
            size="fullscreen"
            open={open}
            onClose={this.close}
        >
          <Modal.Content>
            <Form size="massive">
              <Form.Group widths='equal'>
                <Form.Field onChange={this.onChange} control={Input} name="name"  value={name} label='Deck Name' placeholder='Deck Name' />
                <Form.Field control={Select} name="rotation" label="Rotation"  value={rotation} options={options} onChange={this.onChange} placeholder='Rotation' />
              </Form.Group>
              <h3>Select the most dominate type.</h3>
              <EnergySelector setSearch="" />
              <p> Take some time to describe your deck. </p>
            <QuillEditor CurrentText={this.props.quill}  />
            <Button onClick={this.editDeck} type="submit">Edit Deck</Button>
            </Form>
          </Modal.Content>
        </Modal>
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
  SetCost: PropTypes.func.isRequired,
  SetDeckEnergyView: PropTypes.func.isRequired,
  SetQuillString: PropTypes.func.isRequired,
  quill: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    cards: state.cards,
    deckbuilder: state.deckbuilder,
    quill: state.quill,
    deckEnergyView: state.deckEnergyView
  }
}

export default connect(mapStateToProps, { AddCard, ClearState, SetCard, SetCost, SetDeckEnergyView, SetQuillString })(index);