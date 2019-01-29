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
        const {cards, set} = this.props
        const style = {
            cards:{
                "overflowY": "scroll",
                "overflowX": "hidden",
                "height": "80vh"
            }
        }
        return(
            <div>
								<h1>Hello {set}</h1>
                <Grid columns={5} >
                    <Grid.Row>
                        {this.state.loaded === true && <PokemonSet filterOn={null} sets={this.state.sets} />}
                    </Grid.Row>
                    <Grid.Row style={style.cards}>
											
                        {/* Set must have more than 2. */}
                        {(set !== "" && cards[set] !== undefined)  &&
                            (cards[set].map((card, count) => <Grid.Column key={count} ><PokemonCardImage card={card} /></Grid.Column>))}
                    </Grid.Row>
                </Grid>
            </div>
        );
    }

}

CardsPage.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired
};

const mapStateToProps = (state) => ({
  cards: state.cards,
	set: state.set
});


export default connect(mapStateToProps)(CardsPage);