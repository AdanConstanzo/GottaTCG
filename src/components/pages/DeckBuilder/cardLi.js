import React from 'react';
import { Grid, List, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { AddCard, SubtractCard } from '../../../actions/deckbuilder'; 

class cardLi extends React.Component {
    state = {
        display: true,
    };

    addCard = () => {
        const { deckbuilder, src, alt, type, id } = this.props;
        const obj = {
            src,
            alt,
            type,
            id
        }
        this.props.AddCard(obj, deckbuilder);
        this.setState({ deckbuilder });
    }

    subCard = () => {
        
        const { deckbuilder, src, alt, type, id } = this.props;

        if (deckbuilder[type][id].quantity === 1)
            this.setState({ display: false });
            
        const obj = {
            src,
            alt,
            type,
            id
        }
        this.props.SubtractCard(obj, deckbuilder);
        this.setState({ deckbuilder });  
    }

    render(){
        const { src, alt, id, deckbuilder, type } = this.props;
        const { display } = this.state;
        if (display) {
            return (
                <List.Item>
                    <List.Content>
                        <List.Header>{alt}</List.Header>
                            <Grid columns={4} >
                                <Grid.Column>
                                    {id} x {deckbuilder[type][id].quantity}
                                </Grid.Column>
                                <Grid.Column>
                                    <img 
                                        onMouseOver={this.enlarge}
                                        style={{width: "70%"}}
                                        src={src}
                                        alt={alt}
                                    />
                                </Grid.Column>
                                <Grid.Column>
                                    <Button onClick={this.addCard} icon>
                                        <Icon name='plus' />
                                    </Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button onClick={this.subCard} icon>
                                        <Icon name='minus' />
                                    </Button>
                                </Grid.Column>
                            </Grid>
                    </List.Content>
                </List.Item>
            )
        }
        return (<span/>)
    }
}

function mapStateToProps(state){
    return{
        deckbuilder: state.deckbuilder
    }
}

cardLi.propTypes = {
    id: PropTypes.string.isRequired,
    deckbuilder: PropTypes.shape({}).isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    AddCard: PropTypes.func.isRequired,
    SubtractCard: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { AddCard, SubtractCard })(cardLi);
