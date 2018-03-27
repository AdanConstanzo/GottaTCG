import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';

import DeckCollumn from './DeckCollumn';
import api from '../../../api';

class index extends React.Component {
    state = {
      loading: true,
      deck: null,
      username: ""
    };
    
    componentDidMount(){
        api.deck.GetDeckById(this.props.match.params.id)
            .then(deck=>{
                console.log(deck);
                api.user.publicData(deck.userId)
                    .then(user => this.setState({ username: user.username })); 
                this.setState({ loading: false, deck })
            });
    }

    render(){
        const { loading, deck, username } = this.state;
        if (loading) {
            return (
                <div>
                    <p>Loading</p>
                </div>
            )
        } 
        return(
                <Grid>
                    <Grid.Row centered columns={3} >
                        <Grid.Column>
                            <h1>{deck.name} by <a href={`user/${username}`} >{username}</a></h1>
                        </Grid.Column>
                        <Grid.Column>
                            <h3 >Dominate Color: <Image size="mini" src={deck.deck.deckEnergyView.imageUrl} alt={deck.deck.deckEnergyView.pokemonType} /></h3>  
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Rotation: {deck.rotation}</h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column width={10} >
                            <div>
                                {deck.deck.quill}
                            </div>
                        </Grid.Column>
                        <Grid.Column width={6} >
                            {(Object.keys(deck).length > 0) && (
                                <div>
                                    {Object.keys(deck.deck)
                                    .map((val, i) => (val === 'Pokémon' || val === 'Trainer' || val === 'Energy') ?
                                            <DeckCollumn count={deck.deck.Count[val]} type={val} key={i} cards={deck.deck[val]} /> : null)}
                                </div>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        )
    }
}

index.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default index;