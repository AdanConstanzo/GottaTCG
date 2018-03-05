import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Portal, Button, Segment, Header } from 'semantic-ui-react';

import PokemonCard from '../CardPage/PokemonCard';

class CreateImage extends React.Component {

    state= {
        timeOut: null,
        display: false,
        open: false,
        lCard: {}
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

    details = () => {
        axios.get(`/api/cards/findCardById?id=${this.props.card.id}`)
            .then(res => res.data.card)
            .then(card => {
                console.log(card);
                this.setState({ lCard: card });
            });
        this.setState({ open: true })
    }

    handleClose = () => this.setState({ open: false })

    render(){
        const { onClick, card, deckbuilder } = this.props;
        const { display, open, lCard } = this.state;
        // {!loading && this.state.card.supertype === "Pokémon" && <PokemonCard card={card} />}
        // {!loading && this.state.card.supertype !== "Pokémon" && <TrainerEnergyCard card={card} />}
        const RenderImage = () =>
            <img

                style={{ width: "8em" }}
                onClick={onClick}
                type={card.supertype}
                data={card.id}
                src={card.imageUrl}
                alt={card.name}
            />

        if (deckbuilder[card.supertype][card.id]) {
            return (
                <div
                    onMouseEnter={this.onMouseEnter}
                    onMouseLeave={this.onMouseLeave}
                >
                    <p>count: {deckbuilder[card.supertype][card.id].quantity} </p>
                    <RenderImage />
                    {display && (<Button onClick={this.details} >Card Details</Button>)}
                    <Portal onClose={this.handleClose} open={open}>
                        <Segment style={{ left: '40%', position: 'fixed', top: '50%', zIndex: 1000 }}>
                            <Header>This is a controlled portal</Header>
                            <p>Portals have tons of great callback functions to hook into.</p>
                            <p>To close, simply click the close button or click away</p>
                        </Segment>
                    </Portal>
                </div>
            ) 
        }
        return (
            <div
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <RenderImage />
                {display && (<Button onClick={this.details} >Card Details</Button>)}
                <Portal onClose={this.handleClose} open={open}>
                    {Object.keys(lCard).length > 0 && (<PokemonCard card={lCard} />)}
                </Portal>
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