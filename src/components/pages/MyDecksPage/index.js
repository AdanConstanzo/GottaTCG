import React from 'react';
import { Card } from 'semantic-ui-react';

import api from '../../../api'
import DeckNav from './DeckNav'; 

class index extends React.Component {
    state = {
        loading: true,
        decks: []
    };

    componentDidMount() {
        api.deck.GetLoginDeck()
            .then(decks => {
                console.log(decks[0]);
                this.setState({decks, loading: false})
            })
    }

    render(){
        const { decks } = this.state
        return (
                <Card.Group itemsPerRow={5} stackable >
                    {decks.length > 0 && (
                        decks.map((deck, i) =>
                            <DeckNav
                                key={i}
                                name={deck.name}
                                deckId={deck._id}
                                cardCount={deck.cardCount}
                                rotation={deck.rotation}
                                energyView={deck.deck.deckEnergyView}
                            />)
                    )}
                </Card.Group>
        )
    }
}
export default index;