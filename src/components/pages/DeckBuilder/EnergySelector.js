import React from 'react';
import { Icon, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../../../api';
import { SetDeckEnergyView } from '../../../actions/deckbuilder';
import { GetDecksBasedOnType } from '../../../actions/decks';

class EnergySelector extends React.Component {
    state = {
        types: null,
        activated: false,
    };

    componentDidMount(){
        api.pokemonType.getAllTypes()
            .then(types => this.setState({types}))
    }

    onClick = () => this.setState({activated: !this.state.activated})

    selectImage = (val) => () =>{
        const { setSearch, Energy } = this.props;
        /* if setSearch is assigned to decks and redux's state
        ** deckEnergyView is not equal to the selected energy value
        */
        if (setSearch === "decks" &&  Energy.pokemonType !== val.pokemonType) 
            this.props.GetDecksBasedOnType(val.pokemonType);
        
        this.props.SetDeckEnergyView(val);
        this.onClick();
    }

    render(){
        const { types, activated } = this.state;
        const { Energy } = this.props;
        if (types) {
            if(!activated){
                return(
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <img style={{ width: "50px" }} src={Energy.imageUrl} alt={Energy.pokemonType} />
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
        Energy: state.deckEnergyView
    }
}

EnergySelector.propTypes = {
    Energy: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        pokemonType: PropTypes.string.isRequired
    }).isRequired,
    setSearch: PropTypes.string.isRequired,
    SetDeckEnergyView: PropTypes.func.isRequired,
    GetDecksBasedOnType: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { SetDeckEnergyView, GetDecksBasedOnType })(EnergySelector);