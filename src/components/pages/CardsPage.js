import React from 'react';
import axios from 'axios';

import PokemonSet from '../forms/PokemonSet';

class CardsPage extends React.Component {
    state = {
        loading: true,
        sets: []
    }

    componentDidMount() {
        axios
            .get("/api/sets/getAll")
            .then(res => res.data.sets)
            .then(sets => {
                this.setState({ loading: false, sets });
            })
    }

    render() {
        return(
            <div>
                {!this.state.loading && <PokemonSet sets={this.state.sets} />}
            </div>
        );
    }
}

export default CardsPage;