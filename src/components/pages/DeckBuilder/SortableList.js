import React from 'react';
import { sortable } from 'react-sortable';
import CardLi from './cardLi';


const SortableItem = sortable(CardLi);


class SortableList extends React.Component {
 
  state = {
    items: this.props.items
  };
 
  onSortItems = (items) => {
    this.setState({
      items
    });
  }
 
  render() {
    const { items } = this.state;
    // const listItems = items.map((item, i) => {
    //   return (
    //     <SortableItem
    //       key={i}
    //       onSortItems={this.onSortItems}
    //       items={items}
    //       sortId={i}>{item}</SortableItem>
    //   );
    // });
    const listItems = Object.keys(items).map((item) => <SortableItem key={items[item].id} onSortItems={this.onSortItems} items={items} sortId={items[item].id}>{items[item].id}</SortableItem>)
    return (
      {listItems}
    )
  }
};

export default SortableList;
 