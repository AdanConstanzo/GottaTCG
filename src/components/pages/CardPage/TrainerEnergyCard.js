import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import AddCard from '../../forms/AddCard';
import style from './PokemonCardCSS';


const TrainerEnergyCard = (props) => (
  <Grid>
    <Grid.Column width={6} >
      <img style={style.card.image} src={props.card.image_url} alt={props.card.name} />
      <br />
      {props.card.price && <center><p>Average Price: {props.card.price}</p><br/></center>}
      {props.addCard  && <AddCard card={props.card} />}
    </Grid.Column>
    <Grid.Column width={10} >
      <h1>{props.card.name}</h1>
      <h3>{props.card.text}</h3>
    </Grid.Column>
  </Grid>
);

TrainerEnergyCard.propTypes = {
    card: PropTypes.shape({
        image_url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        text: PropTypes.string,
        price: PropTypes.number
    }).isRequired,
    addCard: PropTypes.bool.isRequired
};

export default TrainerEnergyCard;