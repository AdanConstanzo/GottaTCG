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
            .then(decks => this.setState({ decks, loading: false }));
    }

    render(){
        const { decks } = this.state
        return (
                <Card.Group itemsPerRow={6} stackable >
                    {decks.length > 0 && (
                        decks.map((deck) =>
                            <DeckNav
                                key={deck._id}
                                deck={deck}
                                info={true}
                            />)
                    )}
                </Card.Group>
        )
    }
}
export default index;