import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';

import './RaitingArrow.css';

class RaitingArrow extends React.Component {
    state = {
        upvote: false,
        downvote: false,
    };

    onUp = () => this.state.upvote ? this.setVotes(false, false) :
        this.setVotes(true, false)
    
    onDown = () => this.state.downvote ? this.setVotes(false,false) :
            this.setVotes(false,true);
            
    setVotes = (up,down) => this.setState({ upvote: up, downvote: down })

    render(){
        const { raiting } = this.props;
        const { upvote, downvote } = this.state;
        return (
            <div>
                <Button 
                    name="arrow up" 
                    style={{ marginLeft: "25%" }} 
                    id="u_vote" 
                    onClick={this.onUp} 
                    color={upvote ? "green":"grey"}
                    icon= "arrow up" />
                <p style={{ textAlign: "center", fontSize: "2vw" }} >{raiting}</p>
                <Button 
                    name="arrow up" 
                    style={{ marginLeft: "25%" }} 
                    id="d_vote" 
                    color={downvote ? "red" : "grey"}
                    onClick={this.onDown} 
                    icon="arrow down" />
                    {/* <Icon
                        className="icon-vote"
                        color={downvote ? "red": "grey"}
                        name="arrow down"
                    /> */}
            </div>
        )
    }
}

RaitingArrow.propTypes = {
    raiting: PropTypes.number.isRequired
};

export default RaitingArrow;