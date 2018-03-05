import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CreateImage extends React.Component {

    state= {
        timeOut: null,
        display: false
    }

    onMouseEnter = () => {
        const timeOut = setTimeout(this.show,500);
        this.setState({timeOut});
    }

    onMouseLeave = () => {
        clearTimeout(this.state.timeOut);
        this.setState({ display: false });
    }
    
    show = () => this.setState({ display: true });

    render(){
        const { onClick, card, deckbuilder } = this.props;
        const { display } = this.state;
        if( deckbuilder[card.supertype][card.id]) {
            return (
                <div
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <p>count: {deckbuilder[card.supertype][card.id].quantity} </p>
                    <img

                        style={{ width: "8em" }}
                        onClick={onClick}
                        type={card.supertype}
                        data={card.id}
                        src={card.imageUrl}
                        alt={card.name}
                    />
                    {display && (
                        <p>Card Details</p>
                    )}
                </div>
            ) 
        }
        return (
            <div
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <img

                    style={{ width: "8em" }}
                    onClick={onClick}
                    type={card.supertype}
                    data={card.id}
                    src={card.imageUrl}
                    alt={card.name}
                />
                {display && (
                    <p>Card Details</p>
                )}
            </div>
        ) 
    }
}

function mapStateToProps(state) {
    return {
        deckbuilder: state.deckbuilder
    }
}

CreateImage.propTypes = {
    onClick: PropTypes.func.isRequired,
    card: PropTypes.shape({
        supertype: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};

export default connect(mapStateToProps)(CreateImage);