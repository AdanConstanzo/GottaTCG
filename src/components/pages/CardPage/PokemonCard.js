import React from "react";
import PropTypes from 'prop-types';
import { Grid } from "semantic-ui-react";
import Attack from "../../PokemonCard/Attack";
import Ability from "../../PokemonCard/Ability";
import RessWeak from "../../PokemonCard/RessWeak";
import Energy from "../../PokemonCard/Energy";
import style from './PokemonCardCSS';
import AddCard from "../../forms/AddCard";

const PokemonCard = (props) => (
    <Grid centered >
        <Grid.Row>
            <Grid.Column width={5} >
                <img style={style.card.image} src={props.card.image_url} alt={props.card.name} />
                <br />
                {props.card.price && <p>Average Price: {props.card.price}</p>}
                {props.addCard && <AddCard card={props.card} /> }
            </Grid.Column>
            <Grid.Column width={7} >
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <h1> {props.card.name} </h1>                        </Grid.Column>
                        <Grid.Column>
                            {props.card.types.map((obj, i) => <Energy type={obj} style={style.energyImage} key={i} />)}
                        </Grid.Column>
                        <Grid.Column>
                            <h1>{props.card.hp}</h1>                        
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <hr />
                {props.card.ability &&
                    <div>
                    <Grid>
                        <Grid.Column width={2}>
                            <h5>Ability</h5>
                        </Grid.Column>
                        <Grid.Column width={14}>
                            {props.card.ability.map((obj, i) => <Ability ability={obj} key={i} />)}
                        </Grid.Column>
                    </Grid>
                    <hr />
                    </div>
                }
                <Grid>
                    <Grid.Column width={2} >
                        <h5>Attacks</h5>
                    </Grid.Column>
                    <Grid.Column width={14} >
                        {props.card.attacks.map((obj, i) => <Attack attack={obj} key={i} />)}
                    </Grid.Column>
                </Grid>
                <Grid columns={3} >
                    <Grid.Column>
                        <p>Weakness</p>
                        {props.card.weaknesses && props.card.weaknesses.map((obj, i) => <RessWeak type={obj.type} style={style.attackImage} value={obj.value} key={i} />)}
                    </Grid.Column>
                    <Grid.Column>
                        <p>Resistance</p>
                        {props.card.resistances && props.card.resistances.map((obj, i) => <RessWeak type={obj.type} style={style.attackImage} value={obj.value} key={i} />)}
                    </Grid.Column>
                    <Grid.Column>
                        <p>Retreat Cost</p>
                        {props.card.retreatCost && props.card.retreatCost.map((type, i) => <Energy type={type} style={style.attackImage} key={i} />)}
                    </Grid.Column>
                </Grid>

            </Grid.Column>
        </Grid.Row>
    </Grid>
);

PokemonCard.propTypes = {
    card: PropTypes.shape({
        image_url: PropTypes.string.isRequired,
        types: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ).isRequired,
        hp: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        ability: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                text: PropTypes.string.isRequired
            }).isRequired
        ),
        attacks: PropTypes.arrayOf(
            PropTypes.shape({
                damage: PropTypes.string,
                text: PropTypes.string,
                name: PropTypes.string,
                cost: PropTypes.arrayOf(
                    PropTypes.string.isRequired
                ).isRequired
            }).isRequired
        ).isRequired,
        retreatCost: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ).isRequired,
        weaknesses: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string,
                type: PropTypes.string
            }).isRequired
        ),
        resistances: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string,
                type: PropTypes.string
            }).isRequired
        ),
        id: PropTypes.string.isRequired,
        price: PropTypes.number
    }).isRequired,
    addCard: PropTypes.bool.isRequired
};

export default PokemonCard;
