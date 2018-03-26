import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

import DeckCollumn from './DeckCollumn';
import api from '../../../api';

class index extends React.Component {
    state = {
      loading: true,
      deck: null,
      username: ""
    };
    
    componentDidMount(){
        api.deck.GetDeckById(this.props.match.params.id)
            .then(deck=>{
                api.user.publicData(deck.userId)
                    .then(user => this.setState({ username: user.username })); 
                this.setState({ loading: false, deck })
            });
    }

    render(){
        const { loading, deck, username } = this.state;
        if (loading) {
            return (
                <div>
                    <p>Loading</p>
                </div>
            )
        } 
        return(
                <Grid>
                    <Grid.Row centered columns={2} >
                        <Grid.Column>
                            <h1>{deck.name} by <a href={`user/${username}`} >{username}</a></h1>
                            <h3>Dominate Color</h3>
                        </Grid.Column>
                        <Grid.Column>
                            <h3>Rotation: {deck.rotation}</h3>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row centered>
                        <Grid.Column width={10} >
                            <p>
                                Lorizzle boom shackalack nizzle sit for sure, consectetizzle pot things. Nullizzle sapizzle velizzle, shizznit volutpizzle, suscipit dope, shizzle my nizzle crocodizzle bizzle, dope. Boofron pizzle tortor. Crackalackin erizzle. Fusce crackalackin dolizzle dapibus turpis tempizzle phat. Maurizzle pellentesque nibh bow wow wow turpizzle. Vestibulum izzle tortor. Pellentesque eleifend rhoncizzle gangsta. In we gonna chung habitasse platea dictumst. Uhuh ... yih! get down get down. Shizzlin dizzle dang doggy, pretizzle pizzle, sizzle bow wow wow, dope vitae, nunc. We gonna chung suscipizzle. Integer check out this velit yo fo shizzle mah nizzle fo rizzle, mah home g-dizzle.
                            </p>
                            <p>
                                Praesent non mi nizzle maurizzle i saw beyonces tizzles and my pizzle went crizzle bibendizzle. Dope yo mamma viverra gangster. Funky fresh id that's the shizzle izzle ass sodalizzle i'm in the shizzle. Aliquizzle check it out, mauris vitae dapibus dope, nulla rizzle bibendum metizzle, izzle pot augue dui in arcu. Vivamizzle gravida lacizzle id crazy. Vivamizzle arcu sure, fermentizzle sit amet, dang izzle, ass izzle, yo. Sed vehicula the bizzle fizzle. Boom shackalack sheezy dizzle, hendrerit izzle, tellivizzle izzle, shizzle my nizzle crocodizzle fo, arcu. Morbi my shizz placerat nulla. Doggy gangsta erizzle id erizzle. Mammasay mammasa mamma oo sa metus dizzle, egestizzle gizzle, accumsizzle quis, fo izzle, ass. Gangster iaculis break yo neck, yall orci tincidunt sodales. Fusce shiz, nulla eget dang shizzlin dizzle, lacizzle fo shizzle luctus erat, vitae vehicula augue purizzle vitae we gonna chung. Etiam go to hizzle . We gonna chung sizzle black. Dizzle fo shizzle my nizzle turpizzle. Yippiyo boofron magna. Sed we gonna chung crazy, consectetuer mammasay mammasa mamma oo sa, tempor izzle, get down get down izzle, pede. My shizz tellus. Nulla nisi erizzle, tristique fo shizzle mah nizzle fo rizzle, mah home g-dizzle amet, ultricizzle own yo', dang nizzle, augue.
                            </p>
                            <p>
                                Vivamus nizzle away egizzle away consectetuer fizzle. Vivamus cool amizzle bling bling. Nam dang nisl dang lacizzle auctor feugizzle. Praesent suscipit shut the shizzle up. Phat izzle bizzle. Vestibulizzle enim mofo, fizzle sed, congue eu, fo shizzle non, libero. Nullizzle vitae pede ma nizzle eros posuere fo shizzle. Quisque brizzle dang, congue pulvinizzle, yo fo shizzle, mollis sit amizzle, shiznit. Fo at dui. Mah nizzle risus purizzle, elementizzle consectetuer, sollicitudin shizzle my nizzle crocodizzle, consequat sheezy, turpizzle. Quisque a check it out eu mi rutrizzle vehicula. Curabitur accumsan sagittizzle ipsum. morbi tristique senectus izzle da bomb et malesuada nizzle izzle shut the shizzle up gangster. In est. Dawg elementizzle. Ut eros pimpin', sempizzle quis, suscipizzle for sure, porta pulvinizzle, sizzle. Nulla sagittizzle gravida hizzle.
                            </p>
                        </Grid.Column>
                        <Grid.Column width={6} >
                            {(Object.keys(deck).length > 0) && (
                                <div>
                                    {Object.keys(deck.deck)
                                        .map((val, i) => (val !== 'Count') ?
                                            <DeckCollumn count={deck.deck.Count[val]} type={val} key={i} cards={deck.deck[val]} /> : null)}
                                </div>
                            )}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        )
    }
}

index.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default index;