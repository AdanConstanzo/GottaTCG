import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import api from '../../../api';


class index extends React.Component {
  state = {
    deck: null,
  };
  
  componentDidMount(){
    api.deck.GetDeckById(this.props.match.params.id)
    .then(deck=>{                
      this.setState({ deck })
    });
  }

  render(){

    const { deck } = this.state;

    if (deck === null) {
      return(
        <h1>LOADING</h1>
      )
    }
    return(
      <div>
        {Object.keys(deck).map(ele => <p>{`${ele} : ${deck[ele]}`}</p>)}
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