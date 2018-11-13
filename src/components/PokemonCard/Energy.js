import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';

class Energy extends React.Component {
	state = {
		loading: true,
		type: {}
	}

	componentDidMount() {
		axios.get(`/api/types/one?type=${this.props.type}`)
			.then(res => res.data.type)
			.then(type =>  this.setState({ loading: false, type }));
	}

	render() {
		const { loading, type } = this.state;
		const { style } = this.props; 
		return (
			<div style={style.div} >
				{loading &&
					(<Loader active inline />)
				}
				{!loading &&
					(<img style={style.image} src={type.imageUrl} alt={type.pokemonType} />)
				}
			</div>
		);
	}
}

Energy.propTypes = {
	type: PropTypes.string.isRequired,
	style: PropTypes.shape({
		image: PropTypes.object
	}).isRequired
};

export default Energy;