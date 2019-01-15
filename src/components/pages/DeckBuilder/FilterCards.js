import React from 'react';
import { Grid, Input, Modal, Button, Segment, Divider, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';


class index extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
			
		};
  }

  componentDidMount() {
	
	}

	FilterState = (type) => (e, { value }) => {
		console.log(type);
		console.log(e.target.textContent);
		console.log(value);
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
		const Type = [ { key: 'Pokémons', value: 'Pokémons', text: 'Pokémons' }, { key: 'Trainers', value: 'Trainers', text: 'Trainers' }, { key: 'Energy', value: 'Energy', text: 'Energy' }];

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
								<Button floated="right" >Filter</Button>
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
};

export default index;