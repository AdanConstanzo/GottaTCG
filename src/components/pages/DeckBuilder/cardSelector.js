import React from 'react';
import PropTypes from 'prop-types';

class cardSelector extends React.Component {
    state = {

    };
    render(){
        const { selection } = this.props;
        return (
            <div>
                <h1>{selection}</h1>
                <hr />
            </div>
        )
    }
}

cardSelector.propTypes = {
    selection: PropTypes.string.isRequired
};

export default cardSelector;