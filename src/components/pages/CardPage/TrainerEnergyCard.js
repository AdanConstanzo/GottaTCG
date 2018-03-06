import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import AddCard from '../../forms/AddCard';

const TrainerEnergyCard = (props) => (
    <Grid centered >
        <Grid.Row>
            <Grid.Column width={5} >
                <img src={props.card.imageUrl} alt={props.card.name} />
                <br />
                {props.addCard  && <AddCard card={props.card} />}
            </Grid.Column>
            <Grid.Column width={7} >
                <h4>{props.card.name}</h4>
                <h5>{props.card.text}</h5>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

TrainerEnergyCard.propTypes = {
    card: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        text: PropTypes.string
    }).isRequired,
    addCard: PropTypes.bool.isRequired
};

export default TrainerEnergyCard;