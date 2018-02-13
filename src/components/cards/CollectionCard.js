import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Loader, Card, Image } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { SetValueToCardCollection } from '../../actions/collection';

class CollectionCard extends React.Component {
    state = {
        loading: true,
        card: null,
        Collection: {
            collectionId: this.props.collection._id
        }
    };

    
    componentDidMount(){
        axios.get(`/api/cards/findCardById?id=${this.props.collection.id}`)
        .then(res => res.data.card)
        .then(card => this.setState({loading:false, card}));
    }
    
    onClick = () => 
        this.props.history.push(`/card/${this.props.collection.id}`);

    onBlur = e => {
        if (e.target.value) {
            this.handleCollection(e.target.value);
        }
    }

    handleCollection = val => {
        const { collectionId } = this.state.Collection
        this.props.SetValueToCardCollection({
            quantity: val,
            collectionId
        })
            .then(res => res.collection)
            .then(Collection => this.setState({ Collection }));
    }
    
    render(){

        const { loading, card } = this.state;
        const { quantity } = this.props.collection;
        if (loading) {
            return (<Loader active inline />)
        } 
        return (
            <Card>
                <Image src={card.imageUrl} onClick={this.onClick} />
                <Card.Content>
                    <Card.Header>{card.name}</Card.Header>
                    <Card.Description><input type="number" onBlur={this.onBlur} placeholder={quantity} /></Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

CollectionCard.propTypes = {
    collection: PropTypes.shape({
        id: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        UserId: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    SetValueToCardCollection: PropTypes.func.isRequired  
};

export default connect(null, { SetValueToCardCollection })(withRouter(CollectionCard));