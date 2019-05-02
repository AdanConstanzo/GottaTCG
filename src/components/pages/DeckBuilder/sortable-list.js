import uniqueId from 'lodash/uniqueId';
import React from 'react';
import Sortable from 'react-sortablejs';

// Functional Component
const SortableList = ({ items, onChange }) => {
	let sortable = null; // sortable instance
	const reverseOrder = (evt) => {
		const order = sortable.toArray();
		onChange(order.reverse());
	};
	/*
	alt: "Bellsprout"
id: "sm7-1"
price: "0.98"
quantity: 1
src: "https://images.pokemontcg.io/sm7/1.png"
type: "Pokémon"
	*/
	const listItems = Object.keys(items).map(val => (<li key={uniqueId()} data-id={items[val].id}>List Item: {items[val].id}</li>));
	// const listItems = items.map(val => (<li key={uniqueId()} data-id={val}>List Item: {val}</li>));

	return (
		<div>
			<Sortable
				// Sortable options (https://github.com/RubaXa/Sortable#options)
				options={{
				}}

				// [Optional] Use ref to get the sortable instance
				// https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute
				ref={(c) => {
					if (c) {
						sortable = c.sortable;
					}
				}}

				// [Optional] A tag or react component to specify the wrapping element. Defaults to "div".
				// In a case of a react component it is required to has children in the component
				// and pass it down.
				tag="ul"

				// [Optional] The onChange method allows you to implement a controlled component and keep
				// DOM nodes untouched. You have to change state to re-render the component.
				// @param {Array} order An ordered array of items defined by the `data-id` attribute.
				// @param {Object} sortable The sortable instance.
				// @param {Event} evt The event object.
				onChange={(order, sortable, evt) => {
					onChange(order);
				}}
			>
				{listItems}
			</Sortable>
		</div>
	);
};

SortableList.propTypes = {
	items: React.PropTypes.array,
	onChange: React.PropTypes.func
};

export default SortableList;