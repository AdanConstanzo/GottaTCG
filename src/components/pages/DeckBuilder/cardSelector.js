import React from 'react';
import PropTypes from 'prop-types';

class cardSelector extends React.Component {
    state = {

    };
   
    

    render(){
        const { selection, cards } = this.props;
        return (
            <div>
                <h1>{selection}</h1>
                <hr />
                {Object.keys(cards).length > 0 && 
                    Object.keys(cards)
                    .map(val => <p key={cards[val].id}>{cards[val].id} x {cards[val].quantity}</p>)
                }
            </div>
        )
    };}


cardSelector.propTypes = {
    selection: PropTypes.string.isRequired,
    cards: PropTypes.shape({}).isRequired
};

export default cardSelector;