import React from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick'

import PokemonSet from '../../forms/PokemonSet';

class index extends React.Component {
    state = {
        loading: true
    };

    componentDidMount() {
        axios
            .get("/api/sets/getAll")
            .then(res => res.data.sets)
            .then(sets => {
                this.setState({ loading: false, sets });
            })
    }

    
    
    render(){

        const { cards } = this.props;
        
        const settings = {
            dots: true,
            arrows: true,
            draggable: true,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 6,
        };
        return (
            <div>
                <Grid columns={5} >
                    <Grid.Row>
                        {!this.state.loading && <PokemonSet sets={this.state.sets} />}
                    </Grid.Row>
                </Grid>
                { cards.length > 1 && (
                    <Slider {...settings}>
                        {cards.map((val, count) => <div key={count}><img src={val.imageUrl} alt={val.name} /></div>)}
                    </Slider>
                )}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cards: state.cards
    }
}

index.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};

export default connect(mapStateToProps)(index);