import React from 'react';
import { List, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AddCard, SubtractCard } from '../../../actions/deckbuilder'; 

class cardLi extends React.Component {
    state = {
        display: true
    };

    addCard = () => {
        const { deckbuilder, src, alt, type, id } = this.props;
        const obj = {
            src,
            alt,
            type,
            id
        }
        this.props.AddCard(obj, deckbuilder);
        this.setState({ deckbuilder });
    }

    subCard = () => {
        
        const { deckbuilder, src, alt, type, id } = this.props;

        if (deckbuilder[type][id].quantity === 1)
            this.setState({ display: false });
            
        const obj = {
            src,
            alt,
            type,
            id
        }
        this.props.SubtractCard(obj, deckbuilder);
        this.setState({ deckbuilder });  
    }

    render(){
        const { name, id, deckbuilder, type } = this.props;
        const { display } = this.state;
        if (display) {
            return (
                <List.Item>
                    <List.Content>
                        <List.Header>{name}</List.Header>
                        {id} x {deckbuilder[type][id].quantity}
                        <Button onClick={this.addCard} icon>
                            <Icon name='plus' />
                        </Button>
                        <Button onClick={this.subCard} icon>
                            <Icon name='minus' />
                        </Button>
                    </List.Content>
                </List.Item>
            )
        }
        return (<span/>)
    }
}

function mapStateToProps(state){
    return{
        deckbuilder: state.deckbuilder
    }
}

cardLi.propTypes = {
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { AddCard, SubtractCard })(cardLi);