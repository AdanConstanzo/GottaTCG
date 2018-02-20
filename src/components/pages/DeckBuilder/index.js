import React from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PokemonSet from '../../forms/PokemonSet';

class index extends React.Component {
    state = {
        loading: true
    };

    componentDidMount() {
        axios
            .get("/api/sets/getAll")
            .then(res => res.data.sets)
            .then(sets => {
                this.setState({ loading: false, sets });
            })
    }

    render(){

        const { cards } = this.props;

        return (
            <div>
                <Grid columns={5} >
                    <Grid.Row>
                        {!this.state.loading && <PokemonSet sets={this.state.sets} />}
                    </Grid.Row>
                    <Grid.Row>
                        {/* Set must have more than 2. */}
                        {cards.length > 1 &&
                            (cards.map((val, count) => <img src={val.imageUrl} alt={val.name} />))}
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cards: state.cards
    }
}

index.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default connect(mapStateToProps)(index);