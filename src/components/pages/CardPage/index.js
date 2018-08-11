import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { SetCard } from '../../../actions/card';
import PokemonCard from './PokemonCard';
import TrainerEnergyCard from './TrainerEnergyCard';

class CardPage extends React.Component {
    state = {
        card: {},
        loading: true
    }

    componentDidMount() {
        this.props.SetCard(this.props.match.params.id);
        axios.get(`/api/cards/findCardById?id=${this.props.match.params.id}`)
            .then(res => res.data.card)
            .then(card => {
              console.log(card)
              this.setState({ loading: false, card })
            });
    }

    render() {
        const { loading, card } = this.state;
        return (
            <div>
                {loading && <Loader active/>}
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