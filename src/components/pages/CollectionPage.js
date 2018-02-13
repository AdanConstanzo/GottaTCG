import React from 'react';
import { Card } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import api from '../../api'
import CollectionCard from '../cards/CollectionCard';
import PSet from '../forms/PSet'; 
import { CreateCollection } from '../../actions/my_collection';

class CollectionPage extends React.Component {
    state = {
        collection: [],
        loading: true,
        sets: []
    };

    componentDidMount() {
        api.collection.getCollection()
            .then(collection => {
                this.setState({collection});
                this.props.CreateCollection({all: collection});
        });
        axios
            .get("/api/sets/getAll")
            .then(res => res.data.sets)
            .then(sets => {
                sets.unshift({ name: "All", code: "all" });
                this.setState({ loading: false, sets });
            })
    }

    render(){

        const { collection, loading, sets } = this.state;

        return (
            <div>
                {!loading && <PSet sets={sets} />}
                <Card.Group itemsPerRow={6} >
                    {(collection.length > 0) && (
                        collection.map((col, i) => <CollectionCard collection={col} key={i} /> )
                    )}
                </Card.Group>
            </div>
        )
    }
}

CollectionPage.propTypes = {
    CreateCollection: PropTypes.func.isRequired
};


export default connect(null, { CreateCollection })(CollectionPage);