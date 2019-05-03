import uniqueId from 'lodash/uniqueId';
import React from 'react';
import PropTypes from 'prop-types';
import Sortable from 'react-sortablejs';

import CardLi from './cardLi';


class SortableList extends React.Component {
	state ={
		
	}
	// const listItems = Object.keys(items).map(val => (<li key={uniqueId()} data-id={items[val].id}>List Item: {items[val].id}</li>));
	// const listItems = Object.keys(items).map(val => (<CardLi key={uniqueId()} data-id={items[val].id} card={items[val]} />));
	// const listItems = items.map(val => (<li key={uniqueId()} data-id={val}>List Item: {val}</li>));
	
	componentWillReceiveProps(nextProps) {
		console.log("New Props!:  ", nextProps)
	}
	render() {
		const { items, onChange, onSort } = this.props
		return (
			<Sortable tag='div' onChange={onChange} onSort={onSort}>
				{/* Basic li of cards */}
				{/* {Object.keys(items).map(val => (<li key={uniqueId()} data-id={items[val].id}>List Item: {items[val].id}</li>))} */}
				{/* CardLi of cards */}
				{Object.keys(items).map(val => (<div key={uniqueId()} data-id={items[val].id }><CardLi key={uniqueId()} data-id={items[val].id} card={items[val]}/> </div>))}
			</Sortable>
		);
	}
}


SortableList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	onChange: PropTypes.func.isRequired
};

export default SortableList;
