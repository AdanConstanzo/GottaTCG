import React from 'react';
import PropTypes from 'prop-types';

import Energy from '../PokemonCard/Energy';

const RessWeak = (props) => (
	<div>
		<Energy style={props.style} type={props.type} />
		<p>{props.value}</p>
	</div>
);
export default RessWeak;

RessWeak.propTypes = {
	type: PropTypes.string.isRequired,
	style: PropTypes.shape({
		image: PropTypes.object
	}).isRequired,
	value: PropTypes.string.isRequired
};