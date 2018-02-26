import React from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PokemonSet from '../../forms/PokemonSet';
import CardSelector from './cardSelector';
import CardSlider  from './cardSlider'; 

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

    onCardClick = (e) => {
        console.log(e.target);
    }
    
    render(){

        const { cards } = this.props;
        
        const settings = {
            dots: true,
            arrows: true,
            draggable: true,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
        };

        return (
            <div>
                <Grid columns={5} >
                    <Grid.Row>
                        {!this.state.loading && <PokemonSet sets={this.state.sets} />}
                    </Grid.Row>
                </Grid>
                <div style={{marginBottom: "5em", marginTop: "2em"}}>
                    {Object.keys(cards[0]).length > 0 && (
                        <CardSlider onCardClick={this.onCardClick} settings={settings} cards={cards} />
                    )}
                </div>
                <Grid columns={3} divided >
                    <Grid.Column>
                        <CardSelector selection="Pokémons" />
                    </Grid.Column>
                    <Grid.Column>
                        <CardSelector selection="Trainers" />
                    </Grid.Column>
                    <Grid.Column>
                        <CardSelector selection="Energy" />
                    </Grid.Column>
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