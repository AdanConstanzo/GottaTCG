import React from 'react';
import { Form, Button, Segment, Grid } from 'semantic-ui-react';

import api from '../../../api';

class index extends React.Component {
    state = {
        user: null,
        Username: "",
        Email: ""
    };

    componentDidMount() {
        api.user.userAcount()
            .then(user => this.setState({ user }));
    }

    onChange = (e, { name, value }) => {
        this.setState({ [name]: value})
    };

    submit = () => {
        console.log(this.state)
    }

    render(){
        const { user } = this.state;
        if (user) {
            return (
                <Grid columns={2} >
                    <Grid.Column>
                        <img src="http://via.placeholder.com/250x250" alt="place" />
                    </Grid.Column>
                    <Grid.Column>
                        <Segment textAlign="center" >
                            <p>Email: {user.email}</p>
                            <p>Username: {user.username}</p>
                        </Segment>
                    </Grid.Column>
                </Grid>
            )
        }
        return (
            <div> Loading </div>
        )
    }
}
export default index;