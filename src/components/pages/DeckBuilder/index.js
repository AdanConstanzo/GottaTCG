import React from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PokemonSet from '../../forms/PokemonSet';
import CardSelector from './cardSelector';
import CardSlider  from './cardSlider'; 
import { AddCard } from '../../../actions/deckbuilder';

class index extends React.Component {
    state = {
        loading: true,
        Pokémon: {},
        Trainer: {},
        Energy: {}
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
        const { deckbuilder } = this.props;
        const { src, alt } = e.target;
        const type = e.target.getAttribute('type');
        const id = e.target.getAttribute("data");
        const obj = {
            src,
            alt,
            type,
            id
        }
        this.props.AddCard(obj, deckbuilder);
        this.setState({ deckbuilder });
    }

    render(){

        const { cards, deckbuilder } = this.props;
        const { Pokémon, Trainer, Energy } = deckbuilder;
        const PCount = deckbuilder.Count.Pokémon;
        const TCount = deckbuilder.Count.Trainer;
        const ECount = deckbuilder.Count.Energy;
        const Total = PCount + TCount + ECount;
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
                <h1>Total Cards: {Total}</h1>
                <Grid columns={3} divided >
                    <Grid.Column>
                        <CardSelector 
                            selection="Pokémons" 
                            type='Pokémon' 
                            count={PCount} 
                            cards={Pokémon}  
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <CardSelector 
                            selection="Trainers" 
                            type='Trainer' 
                            count={TCount} 
                            cards={Trainer}  
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <CardSelector 
                            selection="Energy" 
                            type='Energy' 
                            count={ECount} 
                            cards={Energy}  
                        />
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cards: state.cards,
        deckbuilder: state.deckbuilder,
    }
}

index.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    AddCard: PropTypes.func.isRequired,
    deckbuilder: PropTypes.shape({}).isRequired,
};

export default connect(mapStateToProps, { AddCard })(index);
