import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import DeckCollumn from './DeckCollumn';
import api from '../../../api';
import { returnDate } from '../../../actions/deckbuilder';
import RaitingArrow from './RaitingArrow';

class index extends React.Component {
    state = {
      loading: true,
      deck: null,
      username: ""
    };
    
    componentDidMount(){
        api.deck.GetDeckById(this.props.match.params.id)
            .then(deck=>{                
                api.user.publicData(deck.userId)
                    .then(user => this.setState({ username: user.username })); 
                this.setState({ loading: false, deck })
            });
    }

    render(){
        const { loading, deck, username } = this.state;
        const { auth } = this.props;
        if (loading) {
            return (
                <div>
                    <p>Loading</p>
                </div>
            )
        } 
        return(
                <Grid>
                    <Grid.Row divided >
                        <Grid.Column width={2}>
                            <Image style={{ width: "4vw", margin:" 0 auto" }} src={deck.deck.deckEnergyView.imageUrl} alt={deck.deck.deckEnergyView.pokemonType} />
                        {Object.keys(auth).length > 0 ? 
                            <RaitingArrow deckId={this.props.match.params.id} raiting={deck.vote} disabled={false} />
                            : <RaitingArrow deckId={this.props.match.params.id} raiting={deck.vote} disabled />}
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Segment>
                                <h1>{deck.name}</h1>
                                <p>created at <strong>{returnDate(deck.date)}</strong></p>
                                <p><strong>Deck Energy Type:</strong> {deck.deck.deckEnergyView.pokemonType}</p>
                                <p><strong>Rotation: </strong>{deck.rotation}</p>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={7} >
                            <Segment>
                                <p>This segmenet is to populate information about the deck, such as prive value, more popular card in deck, number of wins registers?, and etc</p>
                            </Segment>
                            {/* Render Deck Information in terms of Money/Stats */}
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <h3>Deck Description</h3>
                            <Segment padded >
                                {deck.deck.quill && (<div dangerouslySetInnerHTML={{ __html: deck.deck.quill }} />)}
                                {deck.deck.quill === "" &&
                                    <Message warning >
                                        <Message.Header>No Deck Description Given.</Message.Header>
                                    </Message>
                                }
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                    {/* Deck Collumns go here. */}
                    <Grid.Row columns={3} >
                        {Object.keys(deck.deck)
                            .map((val, i) => (val === 'Pokémon' || val === 'Trainer' || val === 'Energy') ?
                                <Grid.Column key={i}>
                                    <DeckCollumn
                                        count={deck.deck.Count[val]}
                                        type={val}
                                        cards={deck.deck[val]}
                                    />
                                </Grid.Column> : null)}
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
    }).isRequired,
    auth: PropTypes.shape({
        token: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        confirmed: PropTypes.bool.isRequired
    }).isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.user
    }
}

export default connect(mapStateToProps)(index);