import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SetCode } from '../../actions/set';
import { GetCardsBySet } from '../../actions/card';


class PokemonSet extends React.Component {
    state = {
        focus: this.props.sets[0].name
    }

    componentDidMount() {
        this.props.SetCode({ set: this.props.sets[0].code });
        this.props.GetCardsBySet(this.props.sets[0].code)
    }

    assign = (e,data) => {
        this.props.SetCode({set: data.data});
        this.props.GetCardsBySet(data.data)
        this.setState({focus: data.children});
    }

    render() {
        return(
            <Dropdown trigger={<span>{this.state.focus}</span>}>
                <Dropdown.Menu >
                    {this.props.sets.map((set,i) => <Dropdown.Item key={i} onClick={this.assign} data={set.code}>{set.name}</Dropdown.Item>)}
                </Dropdown.Menu>
            </Dropdown>


        );
    }
}

export default connect(null, { SetCode, GetCardsBySet })(PokemonSet);

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
    }).isRequired).isRequired,
    SetCode: PropTypes.func.isRequired,
    GetCardsBySet: PropTypes.func.isRequired
};