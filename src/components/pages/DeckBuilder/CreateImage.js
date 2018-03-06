import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button } from 'semantic-ui-react';

import PokemonCard from '../CardPage/PokemonCard';
import TrainerCard from '../CardPage/TrainerEnergyCard';

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

    details = dimmer => () => {
        axios.get(`/api/cards/findCardById?id=${this.props.card.id}`)
            .then(res => res.data.card)
            .then(card => this.setState({ lCard: card }));
        this.setState({ dimmer, open: true })
    }

    close = () => this.setState({ open: false });

    render(){
        const { onClick, card, deckbuilder } = this.props;
        const { display, open, dimmer, lCard } = this.state;
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
                {display && (<Button onClick={this.details('blurring')} >Card Details</Button>)}
                    <Modal dimmer={dimmer} style={{marginTop:"0px"}} size="fullscreen" open={open} onClose={this.close}>
                        <Modal.Header>{lCard.name}</Modal.Header>
                        <Modal.Content>
                            {Object.keys(lCard).length > 0 && lCard.supertype === "Pokémon" &&
                            <PokemonCard addCard={false} card={lCard}/> }
                            {Object.keys(lCard).length > 0 && (lCard.supertype === "Trainer" || lCard.supertype === "Energy" ) &&
                            <TrainerCard addCard={false} card={lCard}/> }
                        </Modal.Content>
                    </Modal>
                </div>
            ) 
        }
        return (
            <div
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                <RenderImage />
                {display && (<Button onClick={this.details('blurring')} >Card Details</Button>)}
                <Modal dimmer={dimmer} style={{marginTop:"0px"}} size="fullscreen" open={open} onClose={this.close}>
                    <Modal.Header>{lCard.name}</Modal.Header>
                    <Modal.Content>
                        {Object.keys(lCard).length > 0 && lCard.supertype === "Pokémon" &&
                        <PokemonCard addCard={false} card={lCard}/> }
                         {Object.keys(lCard).length > 0 && (lCard.supertype === "Trainer" || lCard.supertype === "Energy" ) &&
                        <TrainerCard addCard={false} card={lCard}/> }
                    </Modal.Content>
                </Modal>
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