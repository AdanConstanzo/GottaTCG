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
        console.log(this.props.Collection);
        console.log(data.data)
        this.props.AddToCollection(this.props.Collection,data.data);
        this.setState({ focus: data.children });
    }

    render(){
        return (
            <Dropdown scrolling trigger={<span>{this.state.focus}</span>}>
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
    Collection: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired
};

function mapStateToProps(state) {
    return {
        Collection: state.myCollection
    }
}

export default connect(mapStateToProps, { AddToCollection })(PSet);