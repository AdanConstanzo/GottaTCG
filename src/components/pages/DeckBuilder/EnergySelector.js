import React from 'react';
import { Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../../../api';

class EnergySelector extends React.Component {
    state = {
        types: null,
        selected: null,
        activated: false,
    };

    componentDidMount(){
        api.pokemonType.getAllTypes()
            .then(types => this.setState({types, selected: types[2]}))
    }

    onClick = () => this.setState({activated: !this.state.activated})

    selectImage = (val) => (e) =>{
        this.setState({selected: val});
        this.onClick();
        console.log(this.state.selected);
    }

    render(){
        const { types, selected, activated } = this.state;
        if (types) {
            if(!activated){
                return(
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <img style={{ width: "50px" }} src={selected.imageUrl} alt={selected.pokemonType} />
                            </Grid.Column>
                            <Grid.Column>
                                <Icon onClick={this.onClick} bordered name="chevron right" />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )
            }
                return(
                    <Grid>
                        {types.map((val, i) => <Grid.Column key={i} ><img onClick={this.selectImage(val)} style={{ width: "50px" }} src={val.imageUrl} alt={val.pokemonType} /></Grid.Column>)}
                        <Grid.Column>
                            <Icon onClick={this.onClick} bordered name="chevron left" />
                        </Grid.Column>
                    </Grid>
                )
        }
        return (<div>Loading</div>)
    }
}

function mapStateToProps (state) {
    return{
        Energy: state.deckbuilder.DeckEnergyView
    }
}

EnergySelector.propTypes = {
    Energy: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        pokemonType: PropTypes.string.isRequired
    }).isRequired
};

export default connect(mapStateToProps)(EnergySelector);