import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SetCode } from '../../actions/set';
import { GetCardsBySet } from '../../actions/card';


class PokemonSet extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      focus: props.sets[0].name
    }
  }
    

    componentDidMount() {
        this.props.SetCode({ set: this.props.sets[0].code });
        this.props.GetCardsBySet(this.props.sets[0].code)
    }

    assign = (e,data) => {
        this.props.SetCode({set: data.data});
        this.props.GetCardsBySet(data.data)
				this.setState({focus: data.children});
				if ( this.props.filterOn !== null ) {
					this.props.filterOn(false);
				}
    }

    render() {
        return(
            <div>
                <Dropdown button scrolling trigger={<span>{this.state.focus}</span>}>
                    <Dropdown.Menu >
                        {this.props.sets.map((set, i) => <Dropdown.Item key={i} onClick={this.assign} data={set.code}>{set.name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <br />
            </div>
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
        "total_cards": PropTypes.number.isRequired,
        "standard_legal": PropTypes.bool.isRequired,
        "expanded_legal": PropTypes.bool.isRequired,
        "release_date": PropTypes.string.isRequired,
    }).isRequired).isRequired,
    SetCode: PropTypes.func.isRequired,
		GetCardsBySet: PropTypes.func.isRequired,
		filterOn: PropTypes.func,
};