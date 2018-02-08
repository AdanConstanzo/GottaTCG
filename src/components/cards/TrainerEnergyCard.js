import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const TrainerEnergyCard = (props) => (
    <Grid centered >
        <Grid.Row>
            <Grid.Column width={5} >
                <img src={props.card.imageUrl} alt={props.card.name} />
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
    }).isRequired
};

export default TrainerEnergyCard;