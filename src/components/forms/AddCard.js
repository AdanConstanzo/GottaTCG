import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Form, Accordion, Icon } from 'semantic-ui-react';
import { GetCollectionQuantity, CreateCollection, SetValueToCardCollection } from '../../actions/collection';

class AddCard extends React.Component {

    state = {
        Collection: {
            collectionId: null,
            quantity: 0
        }
    };

    componentDidMount(){
        this.props.GetCollectionQuantity(this.props.card.id)
            .then(Collection => {
                this.setState({ Collection: Collection.collection });
            }
            );
    }

    onBlur = e => {
        if (e.target.value) {
            this.handleCollection(e.target.value);
        }
    }

    handleCollection = val => {
        const { collectionId } = this.state.Collection
        const { id, set_code, image_url, name }  = this.props.card;
        if (this.state.Collection.collectionId) {
            this.props.SetValueToCardCollection({
                quantity: val,
                collectionId
            })
                .then(res => res.collection)
                .then(Collection => this.setState({ Collection }));
        } else {
            this.props.CreateCollection({
                quantity: val,
                id,
                set_code,
                image_url,
                name
            })
                .then(res => res.collection)
                .then(Collection => this.setState({ Collection }));
        }
    
    }

    render(){
        const { isAuthenticated } = this.props;
        const { quantity } = this.state.Collection;
        return (
            <div>
                {!isAuthenticated ? (
                    <Segment inverted textAlign='center' color="yellow">
                        Please Log In to Add to Collection
                    </Segment>
                ): <div>
                        <Form  >
                            <Form.Field>
                                <Accordion styled>
                                    <Accordion.Title>
                                        <Icon name='dropdown' />
                                        Add to Your Collection.
                                    </Accordion.Title>
                                    <Accordion.Content>
                                        <input type="number" onBlur={this.onBlur} placeholder={quantity} />
                                    </Accordion.Content>
                                </Accordion>
                            </Form.Field>
                        </Form>
                    </div>
                }
            </div>
        )
    }
}

AddCard.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    GetCollectionQuantity: PropTypes.func.isRequired,
    CreateCollection: PropTypes.func.isRequired,
    SetValueToCardCollection: PropTypes.func.isRequired,
    card: PropTypes.shape({
        image_url: PropTypes.string.isRequired,
        set_code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }).isRequired
};


function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        CardQuantity: state.collection.quantity
    }
}

export default connect(mapStateToProps, { GetCollectionQuantity, CreateCollection, SetValueToCardCollection })(AddCard);