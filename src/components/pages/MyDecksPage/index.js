import React from 'react';

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
                console.log(decks);
                this.setState({decks, loading: false})
            })
    }

    render(){
        const { decks } = this.state
        return (
            <div>
                {decks.length > 0 && (
                    decks.map((deck, i) => 
                        <DeckNav 
                            key={i}
                            name={deck.name}
                            deckId={deck._id}
                            cardCount={deck.cardCount}
                            rotation={deck.rotation}
                        />)
                )}
            </div>
        )
    }
}
export default index;