import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Form, Accordion, Icon } from 'semantic-ui-react';

class AddCard extends React.Component {
    state = {

    };
    render(){
        const { isAuthenticated } = this.props;
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
                                        <input type="number" placeholder='Enter amount.' />
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
    isAuthenticated: PropTypes.bool.isRequired
};


function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps)(AddCard);