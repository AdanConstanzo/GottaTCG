import React from 'react';
import { Card } from 'semantic-ui-react';

import api from '../../api'
import CollectionCard from '../cards/CollectionCard';

class CollectionPage extends React.Component {
    state = {
        collection: []
    };

    componentDidMount() {
        api.collection.getCollection()
            .then(collection => this.setState({collection}));
    }

    render(){

        const { collection } = this.state;

        return (
            <Card.Group itemsPerRow={6} >
                {(collection.length > 0) && (
                    collection.map((col, i) => <CollectionCard collection={col} key={i} /> )
                )}
            </Card.Group>
        )
    }
}
export default CollectionPage;