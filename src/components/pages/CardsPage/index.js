import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import PokemonSet from '../..//forms/PokemonSet';
import PokemonCardImage from './cardImage';

class CardsPage extends React.Component {
    state = {
        loaded: false
    }
    
    componentDidMount() {
        axios
            .get("/api/sets/getAll")
            .then(res => res.data.sets)
            .then(sets => {
                this.setState({ loaded: true, sets });
            })
    }

    
    
    render() {
        const {cards} = this.props
        const style = {
            cards:{
                "overflowY": "scroll",
                "overflowX": "hidden",
                "height": "80vh"
            }
        }
        return(
            <div>
                <Grid columns={5} >
                    <Grid.Row>
                        {this.state.loaded === true && <PokemonSet filterOn={null} sets={this.state.sets} />}
                    </Grid.Row>
                    <Grid.Row style={style.cards}>
                        {/* Set must have more than 2. */}
                        {cards.length > 1  &&
                            (cards.map((card, count) => <Grid.Column key={count} ><PokemonCardImage card={card} /></Grid.Column>))}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

}

CardsPage.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired
};


function mapStateToProps(state){
    return {
        cards: state.cards
    };
}


export default connect(mapStateToProps)(CardsPage);