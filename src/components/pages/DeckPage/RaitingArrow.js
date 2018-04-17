import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

import api from '../../../api';
import './RaitingArrow.css';

class RaitingArrow extends React.Component {
    state = {
        vote: null,
        starVote: null,
        number: null,
        setNum: null,
        authMessage: false
    };

    componentDidMount() {
        api.voting.VoteCount(this.props.deckId)
            .then(number => this.setState({number, setNum: number}));
        api.voting.LookVote(this.props.deckId)
            .then(vote => this.setState({ vote: vote.value, starVote: vote.value }));
    }

    onUp = () => this.state.vote ? this.setVotes(null) : this.setVotes(true);
    
    onDown = () => this.state.vote === false ? this.setVotes(null) : this.setVotes(false);
            
    setVotes = (vote) => {
        const { deckId } = this.props;
        const { setNum, starVote } = this.state;
        if (starVote === true && vote === null) {
            this.setState({ number: setNum - 1 });
        } else if (starVote === true && vote === false) {
            this.setState({ number: setNum - 2 });
        } else if (starVote === false && vote === null) {
            this.setState({ number: setNum + 1 });
        } else if (starVote === false && vote === true) {
            this.setState({ number: setNum + 2 });
        } else if (starVote === null && vote === true) { 
            this.setState({ number: setNum + 1 });
        } else if (starVote === null && vote === false) {
            this.setState({ number: setNum - 1 });
        } else {
            this.setState({ number: setNum })
        }
        api.voting.SetVote(deckId,vote);
        this.setState({ vote });
    }

    logIn = () => this.setState({ authMessage: true })

    render(){
        // const { raiting } = this.props;
        const { vote, number, authMessage } = this.state;
        const { disabled } = this.props;
        if (disabled) {
            return (
                <div>
                    <Button
                        name="arrow up"
                        style={{ marginLeft: "25%" }}
                        id="u_vote"
                        onClick={this.logIn}
                        color={vote ? "green" : "grey"}
                        icon="arrow up" />
                    <p style={{ textAlign: "center", fontSize: "2vw" }} >{number}</p>
                    <Button
                        name="arrow up"
                        style={{ marginLeft: "25%" }}
                        id="d_vote"
                        color={vote === false ? "red" : "grey"}
                        onClick={this.logIn}
                        icon="arrow down" />
                    {authMessage && (<p>Please Login to Vote.</p>)}
                </div>
            )
        }
        return (
            <div>
                <Button 
                    name="arrow up" 
                    style={{ marginLeft: "25%" }} 
                    id="u_vote" 
                    onClick={this.onUp} 
                    color={vote ? "green":"grey"}
                    icon= "arrow up" />
                <p style={{ textAlign: "center", fontSize: "2vw" }} >{number}</p>
                <Button 
                    name="arrow up" 
                    style={{ marginLeft: "25%" }} 
                    id="d_vote" 
                    color={vote === false ? "red" : "grey"}
                    onClick={this.onDown} 
                    icon="arrow down" />
            </div>
        )
    }
}

RaitingArrow.propTypes = {
    raiting: PropTypes.number.isRequired,
    deckId: PropTypes.string.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default RaitingArrow;