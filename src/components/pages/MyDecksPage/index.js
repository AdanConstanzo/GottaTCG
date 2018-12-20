import React from 'react';
import { Card, Message} from 'semantic-ui-react';

import api from '../../../api'
import DeckNav from './DeckNav'; 

class index extends React.Component {
    state = {
        loading: undefined,
        decks: []
    };

    componentDidMount() {
        api.deck.GetLoginDeck()
            .then(decks =>  {
							console.log(decks)
							return decks.length > 0 ? this.setState({ decks, loading: true }) : this.setState({ loading: false });

						});
    }

    render(){
				const { decks, loading } = this.state
				if (loading === false) {
					return (
						<Message>
							<Message.Header>Seems like your deck page is a little empty!</Message.Header>
							<a href="deck_builder" ><p>You can start to create some decks here!</p></a>
						</Message>
					)
				} else if (loading === true) {
					return (
						<Card.Group itemsPerRow={6} stackable >
								{decks.length > 0 && (
										decks.map((deck) =>
												<DeckNav
														key={deck._id}
														deck={deck}
														info
												/>)
								)}
						</Card.Group>
					)
				}
				return(
					<div/>
				)
        
    }
}
export default index;