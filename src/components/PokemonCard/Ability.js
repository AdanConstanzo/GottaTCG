import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Accordion } from 'semantic-ui-react';

const Ability = (props) => (
    <Accordion styled>
        <Accordion.Title>
            <Icon name='dropdown' />
            {props.ability.name}
        </Accordion.Title>
        <Accordion.Content>
            <p>{props.ability.text}</p>
        </Accordion.Content>
    </Accordion>
);

Ability.propTypes = {
    ability: PropTypes.shape({
        type: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};
export default Ability; 