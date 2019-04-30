import React from 'react';
import { Grid, Input, Modal, Button, Segment, Divider, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../../../api';
import { SetFilterCards } from '../../../actions/card';
import { SetCode } from '../../../actions/set';

const orignalState = {
	"sets": [],
	"type": "",
	"color": [],
	"CardName": ""
};

class index extends React.Component {

  constructor(props) {
    super(props)
    this.state = orignalState;
  }

  componentDidMount() {
	}

	// Function that sets the correct filter for our cards.
	// type is our type of card.
	// value is outcome after we add/sub to our list.
	FilterState = (type) => (e, { value }) => this.setState({ [type]:  value});

	CheckIfCached = (KeyCode) => {
		if (this.props.cards[KeyCode] !== undefined) {
			return true;
		}
		return false;
	}

	// sets cards and set on redux.
	// turns off filter modal. 
	// sets this component's state to orignalState.
	SetCardsOnReduxFromModal = (code, cards)  => {
		this.props.filterModalClose();
		this.props.SetFilterCards(code, cards, this.props.cards);
		this.props.SetCode({ code });
		this.props.filterOn(true);
		// Setting our state to original state.
		this.setState(orignalState);
	}

	SubmitFilter = () => {
		// Creating code from our filter for Redux to uniquely create key.
		const code = this.CreateFilterCode();
		// checks if cards are already cached.
		if (this.CheckIfCached(code)) {
			console.log(`${code} is cached!`);
			this.SetCardsOnReduxFromModal(code, this.props.cards[code])
		} else { /* cards are not cached. */
			console.log(`Fetching from db your new cards with this code: ${code}`);
			api.cards.generateSetByFilter(this.state)
		  .then(cards => {
				this.SetCardsOnReduxFromModal(code, cards);
			}, (err) => {
				console.log(err);
			})
		}
		
	}

	SubmitFilterByCardName = () => {

		const code = this.state.CardName;
		if (this.CheckIfCached(code)) {
			console.log(`${code} is cached!`);
			this.SetCardsOnReduxFromModal(code, this.props.cards[code])
		} else {
			console.log(`Fetching from db your new cards with this code: ${code}`);
			api.cards.getCardsByName(this.state.CardName)
			.then(cards => {
				this.SetCardsOnReduxFromModal(code, cards);				
			}, (err) => {
				console.log(err);
			})
		}		
	}

	CreateFilterCode = () => this.state.sets.join('-').concat(`-${this.state.type}`).concat(`-${this.state.color.join('-')}`)

  render(){

		const inlineStyle = {
			modal: {
				display: "inline-block !important",
				position: "relative",
				marginTop: "auto !important",
				marginLeft: 'auto',
				marginRight: 'auto',
				top: "20%"
			}
		};

		const { color, filterModalOpen, filterSets, filterModalClose } = this.props;
		const Type = [ { key: 'Pokémon', value: 'Pokémon', text: 'Pokémon' }, { key: 'Trainer', value: 'Trainer', text: 'Trainer' }, { key: 'Energy', value: 'Energy', text: 'Energy' }];

		return (
      <Modal 
						dimmer="blurring"
            style={inlineStyle.modal}
            size="small"
            open={filterModalOpen}
						onClose={filterModalClose}
						closeIcon
        >
          <Modal.Content>
						<Segment padded placeholder textAlign='center'>
							<h1>Search a Card</h1>
							<Input
								action={{ color: 'blue', content: 'Search', onClick: () => this.SubmitFilterByCardName() }}
								icon='search'
								iconPosition='left'
								placeholder='Pikachu'
								onChange={this.FilterState('CardName')}
							/>
							<Divider horizontal>Or</Divider>
							<h1>Filter One Out</h1>
							<Grid columns={3} divided>
								<Grid.Row>
									<Grid.Column>
										<Dropdown onChange={this.FilterState('sets')} placeholder='Sets' fluid multiple search selection options={filterSets} />
									</Grid.Column>
									<Grid.Column>
										<Dropdown onChange={this.FilterState('type')} placeholder='Type' fluid search selection options={Type} />
									</Grid.Column>
									<Grid.Column>
										<Dropdown onChange={this.FilterState('color')} placeholder='Color' fluid multiple search selection options={color} />
									</Grid.Column>
								</Grid.Row>
								<Button floated="right" onClick={this.SubmitFilter}  >Filter</Button>
							</Grid>
						</Segment>
          </Modal.Content>
        </Modal>
    )
  }
}

const mapStateToProps = (state) => ({
  cards: state.cards,
});


index.propTypes = {
	color: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	filterSets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	filterModalOpen: PropTypes.bool.isRequired,
	filterModalClose: PropTypes.func.isRequired,
	SetFilterCards: PropTypes.func.isRequired,
	filterOn: PropTypes.func.isRequired,
	SetCode: PropTypes.func.isRequired,
	cards: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps, { SetFilterCards, SetCode })(index);;