import React from 'react';
import { Card, Loader, Grid } from 'semantic-ui-react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import api from '../../api'
import CollectionCard from '../cards/CollectionCard';
import PSet from '../forms/PSet'; 
import { SetCollections } from '../../actions/my_collection';

class CollectionPage extends React.Component {
    state = {
        loading: true,
        sets: [],
    };

    componentDidMount() {
        api.collection.getCollection()
            .then(collection => {
                this.props.SetCollections({all: collection});
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

        const { loading, sets } = this.state;
        const { myCollection }  = this.props;
        
        return (
            <Grid>
                <Grid.Row>
                    {loading && <Loader inline active />}
                    {!loading && <PSet sets={sets} />}
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {(Object.keys(myCollection[0]).length !== 0) &&
                            (<Card.Group itemsPerRow={6} >
                                {myCollection.map((col, i) => <CollectionCard collection={col} key={i} />)}
                            </Card.Group>
                        )}
                        {(Object.keys(myCollection[0]).length === 0) && (
                            <p>Empty set of collection.</p>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

CollectionPage.propTypes = {
    SetCollections: PropTypes.func.isRequired,
    myCollection: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ).isRequired
};

function mapStateToProps(state){
    return {
        myCollection: state.myCollection
    }
}

export default connect(mapStateToProps, { SetCollections })(CollectionPage);