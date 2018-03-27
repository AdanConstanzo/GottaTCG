import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { SetQuillString } from '../../../actions/quill';

class quillEditor extends React.Component {
    state = {
        text: ''
    };

    handleChange = (value) => {
        this.setState({ text: value });
        this.props.SetQuillString(this.state.text, this.props.deckbuilder);
    };

    render() {
        return (
            <ReactQuill value={this.state.text}
                onChange={this.handleChange} />
        )
    }
}

quillEditor.propTypes = {
    SetQuillString: PropTypes.func.isRequired,
    deckbuilder: PropTypes.shape({}).isRequired
};

function mapStateToProps(state) {
    return {
        deckbuilder: state.deckbuilder
    }
}

export default connect(mapStateToProps, { SetQuillString })(quillEditor);