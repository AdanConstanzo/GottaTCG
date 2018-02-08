import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Accordion, Grid } from 'semantic-ui-react';
import style from '../cards/PokemonCardCSS';

import Energy from '../PokemonCard/Energy';

const Attack = (props) => (
    <Accordion styled>
        <Accordion.Title>
            <Icon name='dropdown' />
            {props.attack.name}
        </Accordion.Title>
        <Accordion.Content>
            <Grid>
                <Grid.Column width={6}>
                    <div>
                        {props.attack.cost.map((type, i) => <Energy type={type} style={style.attackImage} key={i} />)}
                    </div>
                </Grid.Column>
                <Grid.Column width={6}>
                    <p>{props.attack.text}</p>
                </Grid.Column>
                <Grid.Column width={4}>
                    <p>{props.attack.damage}</p>
                </Grid.Column>
            </Grid>
        </Accordion.Content>
    </Accordion>
);

Attack.propTypes = {
    attack: PropTypes.shape({
        damage: PropTypes.string,
        text: PropTypes.string,
        name: PropTypes.string,
        cost: PropTypes.arrayOf(
            PropTypes.string.isRequired
        ).isRequired
    }).isRequired
};

export default Attack;