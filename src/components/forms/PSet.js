import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AddToCollection } from '../../actions/my_collection';

class PSet extends React.Component {
    state = {
        focus: this.props.sets[0].name
    }

    assign = (e, data) => {
        console.log(data);
        this.props.AddToCollection(this.props.collectionDB,data.data);
        this.setState({ focus: data.children });
    }

    render(){
        return (
            <Dropdown scrolling button trigger={<span>{this.state.focus}</span>}>
                <Dropdown.Menu >
                    {this.props.sets.map((set, i) => <Dropdown.Item key={i} onClick={this.assign} data={set.code}>{set.name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>
        )
    }
}

PSet.propTypes = {
    sets: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    AddToCollection: PropTypes.func.isRequired,
    collectionDB: PropTypes.shape({
        all: PropTypes.array
    }).isRequired
};

function mapStateToProps(state) {
    return {
        collectionDB: state.collectionDB
    }
}

export default connect(mapStateToProps, { AddToCollection })(PSet);