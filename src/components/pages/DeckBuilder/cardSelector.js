import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { SetStateCards } from '../../../actions/deckbuilder';
import SortableList from './sortable-list';
import CardLI from './cardLi';

class cardSelector extends React.Component {
    state = {
        cards: [],
    };
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.cards !== this.state.cards) {
          this.setState({ cards: nextProps.cards });
          console.log("setState cards to : ", nextProps.cards);
        }
    }
    onChangeCards = (OnChangeCards, e) => {
        console.log(e);
        console.log("OnChange is triggered: ", OnChangeCards);
        console.log("Current State: ", this.state.cards);
        const { cards } = this.state;
        const newCards = {}
        
        OnChangeCards.forEach(ele => {newCards[ele] = cards[ele]})
        console.log("New State: ",newCards)
        this.setState({ cards: newCards });
        this.props.SetStateCards(newCards, this.props.type, this.props.deckbuilder);
    }
    
    render(){

        const { cards, selection, type, deckbuilder, sliderView } = this.props
        const count = deckbuilder.Count[type];
        return (
            <div>
                <h3>{selection} x {count}</h3>
                <hr />
                <div style={{ maxHeight: sliderView === false ? "75vh" : "35vh", overflowY: "scroll", overflowX: "hidden" }}>
                    {Object.keys(cards).length > 0 && <SortableList items={this.state.cards} onChange={this.onChangeCards}/> }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        deckbuilder: state.deckbuilder
    }
}

cardSelector.propTypes = {
  selection: PropTypes.string.isRequired,
  cards: PropTypes.shape({}).isRequired,
  type: PropTypes.string.isRequired,
  deckbuilder: PropTypes.shape({}).isRequired,
  sliderView: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { SetStateCards })(cardSelector);