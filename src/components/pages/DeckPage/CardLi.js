import React from 'react';
import PropTypes from 'prop-types';
import { List, Image } from 'semantic-ui-react';

class CardLi extends React.Component {
    state = {
    };
    
    render(){
        const { src, id, name, quantity } = this.props;
        return (
            <List.Item as='a' href={`/card/${id}`} >
                <Image size="mini" src={src} />
                <List.Content onMouseOver={this.onHover} onMouseLeave={this.onMouseLeave}>
                    <List.Header>{name} x {quantity}</List.Header>
                </List.Content>
            </List.Item>
        )
    }
}

CardLi.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired
};

export default CardLi;