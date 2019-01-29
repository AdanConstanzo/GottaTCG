import React from 'react';
import { Grid, Input, Modal, Button, Segment, Divider, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import api from '../../../api';
import { SetFilterCards } from '../../../actions/card';

class index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
			"sets": [],
			"type": "",
			"color": [],
		};
  }

  componentDidMount() {
		
	}

	// Function that sets the correct filter for our cards.
	// type is our type of card.
	// value is outcome after we add/sub to our list.
	FilterState = (type) => (e, { value }) => this.setState({ [type]:  value});

	SubmitFilter = () => {
		api.cards.generateSetByFilter(this.state)
		  .then(cards => {
				// change slider cards here
				this.props.filterModalClose();
				this.props.SetFilterCards(cards.cards);
				this.props.filterOn(true);
				console.log(cards);
			}, (err) => {
				console.log(err);
			})
	}

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
								action={{ color: 'blue', content: 'Search' }}
								icon='search'
								iconPosition='left'
								placeholder='Pikachu'
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

index.propTypes = {
	color: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	filterSets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
	filterModalOpen: PropTypes.bool.isRequired,
	filterModalClose: PropTypes.func.isRequired,
	SetFilterCards: PropTypes.func.isRequired,
	filterOn: PropTypes.func.isRequired
};

export default connect(null, { SetFilterCards })(index);;