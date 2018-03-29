import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import * as actions from "../../actions/auth";


class Nav extends React.Component {
    state = {
        activeItem: 'home'
    };

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
        this.props.history.push(`/${name}`);
    }

    render(){
        const { activeItem } = this.state
        const { isAuthenticated, logout } = this.props;
        return (
            <Menu pointing>
                <Menu.Item name='' onClick={this.handleItemClick}  ><img alt="pokeball" src='/images/website/pokeball.png' /></Menu.Item>
                <Menu.Item href='/cards' >Cards</Menu.Item>
                <Menu.Item href='/deck_builder' >Deck Builder</Menu.Item>
                <Menu.Menu position='right'>
                    {isAuthenticated && (
                        <Dropdown item text='Profile'>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/my_collection" >My Collection</Dropdown.Item>
                                <Dropdown.Item href="/my_decks" >My Decks</Dropdown.Item>
                                <hr />
                                <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                    {!isAuthenticated && (
                        <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick} />
                    )}
                </Menu.Menu>
            </Menu>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email
    }
}

Nav.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { logout: actions.logout })(withRouter(Nav));