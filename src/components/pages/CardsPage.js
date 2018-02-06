import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
        const {card} = this.props
        return(
            <div>
                {!this.state.loading && <PokemonSet sets={this.state.sets} />}
                {card.length > 0 && card.map((val, i)=><img key={i} alt={val.id} src={val.imageUrl} />)}
            </div>
        );
    }

}

CardsPage.propTypes = {
    card: PropTypes.shape({
        set: PropTypes.string.isRequired
    }).isRequired
};


function mapStateToProps(state){
    return {
        card: state.card
    };
}


export default connect(mapStateToProps)(CardsPage);