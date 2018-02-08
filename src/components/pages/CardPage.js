import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import PokemonCard from '../cards/PokemonCard';
// import TrainerEnergyCard from '../cards/TrainerEnergyCard';

class CardPage extends React.Component {
    state = {
        card: {},
        loading: true
    }

    componentDidMount() {
        axios.get(`/api/cards/findCardById?id=${this.props.match.params.id}`)
            .then(res => res.data.card)
            .then(card => this.setState({ loading: false, card }));
    }

    render() {
        const { loading, card } = this.state;
        return (
            <div>
                { loading && <p>Loading</p>}
                { !loading && <PokemonCard card={card}  />}
            </div>
        );
        
        // else if (this.state.card.supertype === "Pokémon") {
        //     return < PokemonCard card={this.state.card} />
        // } 
            // return <TrainerEnergyCard card={this.state.card} />
    }
}

CardPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default CardPage;