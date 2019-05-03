import uniqueId from 'lodash/uniqueId';
import React from 'react';
import PropTypes from 'prop-types';
import Sortable from 'react-sortablejs';

import CardLi from './cardLi';


class SortableList extends React.Component {
	state ={
		
	}
	render() {
		const { items, onChange } = this.props
		return (
			<Sortable tag='div' onChange={onChange} >
				{items.map(val => <div key={uniqueId()} data-id={val.id}><CardLi card={val}/> </div>)}
			</Sortable>
		);
	}
}


SortableList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	onChange: PropTypes.func.isRequired
};

export default SortableList;
