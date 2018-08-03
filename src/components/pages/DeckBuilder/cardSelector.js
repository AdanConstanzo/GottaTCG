import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { connect } from 'react-redux';

import CardLI from './cardLi';

class cardSelector extends React.Component {
    state = {};
    render(){

        const { cards, selection, type, deckbuilder } = this.props
        const count = deckbuilder.Count[type];
        return (
            <div>
                <h3>{selection} x {count}</h3>
                <hr />
                <List style={{ maxHeight: "35vh", overflowY: "scroll", overflowX: "hidden" }} celled >
                    {Object.keys(cards).length > 0 &&
                        Object.keys(cards)
                            .map(val =>
                                <CardLI
                                    key={cards[val].id}
                                    id={cards[val].id}
                                    alt={cards[val].alt}
                                    src={cards[val].src}
                                    type={cards[val].type}
                                />)
                    }
                </List>
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
    deckbuilder: PropTypes.shape({}).isRequired

};

export default connect(mapStateToProps)(cardSelector);