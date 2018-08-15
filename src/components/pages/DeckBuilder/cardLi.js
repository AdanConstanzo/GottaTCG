import React from 'react';
import { Grid, List, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AddCard, SubtractCard } from '../../../actions/deckbuilder';
import PokemonModal from "../../PokemonCard/PokemonModal";

class cardLi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        display: true,
        open: false,
        card: props.cards.filter(ele => ele.id === this.props.card.id)[0]
    };
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
                                  <PokemonModal card={this.state.card} open={open} close={this.close} />
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
    cards: state.cards
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
