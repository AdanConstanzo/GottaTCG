import React from 'react';
import axios from 'axios';
import { Grid, Input, Select, Form, Modal, Message, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import api from '../../../api';
import PokemonSet from '../../forms/PokemonSet';
import CardSelector from './cardSelector';
import CardSlider  from './cardSlider'; 
import { ClearState, AddCard } from '../../../actions/deckbuilder';
import EnergySelector from './EnergySelector';
import QuillEditor from './quillEditor';

class index extends React.Component {
    state = {
        loading: true,
        Pokémon: {},
        Trainer: {},
        Energy: {},
        open: false,
        dimmer: null,
        name: "",
        rotation: "",
        deckSubmitted: false,
        deckInfo: null,
        error: false,
        success: false
    };

    componentDidMount() {
        axios
            .get("/api/sets/getAll")
            .then(res => res.data.sets)
            .then(sets => {
                this.setState({ loading: false, sets });
            })
    }

    onCardClick = (e) => {
        const { deckbuilder } = this.props;
        const { src, alt } = e.target;
        const type = e.target.getAttribute('type');
        const id = e.target.getAttribute("data");
        const obj = {
            src,
            alt,
            type,
            id
        }
        this.props.AddCard(obj, deckbuilder);
        this.setState({ deckbuilder });
    }

    onButtonSubmit = dimmer => () => this.setState({ dimmer, open: true});

    onChange = (e, { name, value }) => this.setState({ [name]: value })
    
    clearEntries = () => {
        this.props.ClearState();
        this.setState({ name: "", rotation: "", deckSubmitted: false });
    }

    submitDeck = () => {
        const { deckbuilder } = this.props;
        const { name, rotation } = this.state;
        this.setState({deckSubmitted: true, error: false});
        deckbuilder.quill = this.props.quill;
        deckbuilder.deckEnergyView = this.props.deckEnergyView;
        api.deck.CreateDeck({
            deckbuilder,
            name,
            rotation
        })
            .then((data) => {
                console.log(deckbuilder);
                this.clearEntries();
                this.setState({ deckInfo: data, success: true })
            })
            .catch((error) => {
                this.setState({ error: true, global: error.response.data.error.global, deckSubmitted: false })
                }) 
    }
    
    
    close = () => this.setState({ open: false, error: false, success: false });
    
    render(){

        const { cards, deckbuilder } = this.props;
        const { Pokémon, Trainer, Energy } = deckbuilder;
        const PCount = deckbuilder.Count.Pokémon;
        const TCount = deckbuilder.Count.Trainer;
        const ECount = deckbuilder.Count.Energy;
        const Total = PCount + TCount + ECount;
        const settings = {
            dots: true,
            arrows: true,
            draggable: true,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
            lazyLoad: "progressive"
        };
        const options = [
            { key: 'S', text: 'Standard', value: 'Standard' },
            { key: 'E', text: 'Expanded', value: 'Expanded' },
            { key: 'U', text: 'Unlimited', value: 'Unlimited' },
        ]
        const { open, dimmer, rotation, name, deckSubmitted, deckInfo, error, success, global }  = this.state;
        return (
            <div>
                <Grid columns={5} >
                    <Grid.Row>
                        {!this.state.loading && <PokemonSet sets={this.state.sets} />}
                    </Grid.Row>
                </Grid>
                <div style={{marginBottom: "5em", marginTop: "2em"}}>
                    {Object.keys(cards[0]).length > 0 && (
                        <CardSlider onCardClick={this.onCardClick} settings={settings} cards={cards} />
                    )}
                </div>
                <Grid columns={2}>
                    <Grid.Column>
                        <h3>Total Cards: {Total}</h3>
                    </Grid.Column>

                    <Grid.Column>
                        <Button onClick={this.onButtonSubmit('blurring')} >Submit Deck</Button>
                    </Grid.Column>

                </Grid>
                <Grid columns={3} divided >
                    <Grid.Column>
                        <CardSelector 
                            selection="Pokémons" 
                            type='Pokémon' 
                            count={PCount} 
                            cards={Pokémon}  
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <CardSelector 
                            selection="Trainers" 
                            type='Trainer' 
                            count={TCount} 
                            cards={Trainer}  
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <CardSelector 
                            selection="Energy" 
                            type='Energy' 
                            count={ECount} 
                            cards={Energy}  
                        />
                    </Grid.Column>
                </Grid>
                <Modal 
                    dimmer={dimmer}
                    style={{marginTop:"0px"}}
                    size="fullscreen"
                    open={open}
                    onClose={this.close}
                >
                    <Modal.Content>
                        <Form error={error} success={success}  size="massive" >
                            <Form.Group widths='equal' >
                                <Form.Field onChange={this.onChange} control={Input} name="name"  value={name} label='Deck Name' placeholder='Deck Name' />
                                <Form.Field control={Select} label='Rotation' name="rotation" value={rotation} onChange={this.onChange} options={options} placeholder='Rotation' />
                            </Form.Group>
                                <h3>Select the most dominate type.</h3>
                                <EnergySelector setSearch="" />
                                <br />
                                <p> Take some time to describe your deck. </p>
                                <QuillEditor />
                                <Button disabled={deckSubmitted} onClick={this.submitDeck} type='submit'>Submit</Button>
                            <Message error >
                                <Message.Header>
                                    An error has occured
                                </Message.Header>
                                <Message.Content>
                                    Message: {global}
                                </Message.Content>
                            </Message>
                            {deckInfo && (
                                <Message success>
                                    <Message.Header>
                                        Success
                                    </Message.Header>
                                    <Message.Content>
                                        {`Your deck: ${deckInfo.name} was made! Check it out in the link below!`}
                                        <br />
                                        <a href={`deck/${deckInfo._id}`}>{deckInfo.name}</a>
                                    </Message.Content>
                                </Message>
                            )}
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cards: state.cards,
        deckbuilder: state.deckbuilder,
        quill: state.quill,
        deckEnergyView: state.deckEnergyView
    }
}

index.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    AddCard: PropTypes.func.isRequired,
    deckbuilder: PropTypes.shape({}).isRequired,
    ClearState: PropTypes.func.isRequired,
    deckEnergyView: PropTypes.shape({}).isRequired,
    quill: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { AddCard, ClearState })(index);

