import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class PokemonSet extends React.Component {
    state = {
        focus: this.props.sets[0].name
    }

    assign = (e,data) => {
        this.setState({focus: data.children})
    }

    render() {
        return(
            <Dropdown trigger={<span>{this.state.focus}</span>}>
                <Dropdown.Menu >
                    {this.props.sets.map((set,i) => <Dropdown.Item key={i} onClick={this.assign}>{set.name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>


        );
    }
}

export default PokemonSet;

PokemonSet.propTypes = {
    sets: PropTypes.arrayOf(PropTypes.shape({
        "number": PropTypes.number.isRequired,
        "code": PropTypes.string.isRequired,
        "name": PropTypes.string.isRequired,
        "series": PropTypes.string.isRequired,
        "totalCards": PropTypes.number.isRequired,
        "standardLegal": PropTypes.bool.isRequired,
        "expandedLegal": PropTypes.bool.isRequired,
        "releaseDate": PropTypes.string.isRequired,
    }).isRequired).isRequired
};