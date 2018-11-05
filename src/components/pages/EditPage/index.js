import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

class index extends React.Component {
    state = {
      
    };
    
    componentDidMount(){
      
    }

    render(){
        return(
          <div>
            {this.props.match.params.id}
          </div>
        )
    }
}

index.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    auth: PropTypes.shape({
        token: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        confirmed: PropTypes.bool.isRequired
    }).isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.user
    }
}

export default connect(mapStateToProps)(index);