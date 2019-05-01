import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Button } from 'semantic-ui-react';

import PokemonSet from '../..//forms/PokemonSet';
import PokemonCardImage from './cardImage';
import api from '../../../api';
import FilterCards from '../DeckBuilder/FilterCards';
import { SetFilterCards } from '../../../actions/card';
import { SetCode } from '../../../actions/set';

class CardsPage extends React.Component {
  state = {
    loaded: false,
    color: [],
    filterModalOpen: false,
    FilterIsOn: false
  }

  componentDidMount() {
    axios
      .get("/api/sets/getAll")
      .then(res => res.data.sets)
      .then(sets => {
        function returnObjectFunction(ele) {
          return {
            key: ele.code,
            value: ele.code,
            text: ele.name,
          }
        }
        const filterSets = sets.map(returnObjectFunction);
        this.setState({ loaded: true, sets, filterSets });
      })
    
    api.pokemonType.getAllTypes()
    .then(types => {
      function returnObjectColor(ele) {
        return {
          key: ele.pokemonType,
          value: ele.pokemonType,
          text: ele.pokemonType,
        }
      }
      const color = types.map(returnObjectColor);
      this.setState({ color });
    });
  }

  toggleFilterModal = () => this.setState({ filterModalOpen: true });
  filterModalClose = () => this.setState({ filterModalOpen: false });
  filterOn = (val) => this.setState({ FilterIsOn: val });
  removeFilter = () => {
    const firstCodeInCards = Object.keys(this.props.cards)[0];
    this.setState({ FilterIsOn: false })
    this.props.SetFilterCards(firstCodeInCards, this.props.cards[firstCodeInCards], this.props.cards);
    this.props.SetCode({ code: firstCodeInCards });
  }

  render() {
    const { cards, set } = this.props
    const style = {
      cards: {
        "overflowY": "scroll",
        "overflowX": "hidden",
        "height": "80vh"
      }
    }
    const { loaded, color, filterSets, filterModalOpen, FilterIsOn  } = this.state;
    return (
      <div>
        {(loaded && color.length > 0) && <FilterCards filterOn={this.filterOn} color={color} filterModalOpen={filterModalOpen} filterSets={filterSets} filterModalClose={this.filterModalClose} />}
        <Grid columns={5} >
          <Grid.Row>
            {loaded && <PokemonSet filterOn={null} sets={this.state.sets} />}
            {FilterIsOn === false ? <Button onClick={this.toggleFilterModal}>Filter Cards</Button> : <Button color="red" onClick={this.removeFilter}  >Remove Filter</Button>}
          </Grid.Row>
          <Grid.Row style={style.cards}>

            {/* Set must have more than 2. */}
            {(set !== "" && cards[set] !== undefined) &&
              (cards[set].map((card, count) => <Grid.Column key={count} ><PokemonCardImage card={card} /></Grid.Column>))}
          </Grid.Row>
        </Grid>
      </div>
    );
  }

}

CardsPage.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
  set: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  SetFilterCards: PropTypes.func.isRequired,
  SetCode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  cards: state.cards,
  set: state.set
});


export default connect(mapStateToProps, { SetFilterCards, SetCode })(CardsPage);