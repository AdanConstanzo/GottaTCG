import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { SetValueToCardCollection } from '../../../actions/collection';

class CollectionCard extends React.Component {
    
    onClick = () => 
        this.props.history.push(`/card/${this.props.collection.id}`);

    onBlur = e => {
        if (e.target.value) {
            this.handleCollection(e.target.value);
        }
    }

    handleCollection = val => {
        const { _id } = this.props.collection
        this.props.SetValueToCardCollection({
            quantity: val,
            collectionId: _id
        })
            .then(res => res.collection)
            .then(Collection => this.setState({ Collection }));
    }
    
    render(){

        const { quantity, name, image_url } = this.props.collection;

        return (
            <Card>
                <Image src={image_url} onClick={this.onClick} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
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
        UserId: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    SetValueToCardCollection: PropTypes.func.isRequired  
};

export default connect(null, { SetValueToCardCollection })(withRouter(CollectionCard));