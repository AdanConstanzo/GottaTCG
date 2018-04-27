import React from 'react';
import { Form, Button, Segment, Grid } from 'semantic-ui-react';

import api from '../../../api';

class index extends React.Component {
    state = {
        user: null,
        Username: "",
        Email: "",
        imageUrl: null
    };

    componentDidMount() {
        api.user.userAcount()
            .then(user => {
                console.log(user);
                if (user.profileImage) {
                    const imageUrl = `http://localhost:8080/api/users/image/${user.profileImage}`;
                    this.setState({ imageUrl });
                }
                this.setState({ user })
            });
    }

    onChange = (e, { name, value }) => {
        this.setState({ [name]: value})
    };

    submit = () => {
        console.log(this.state)
    }

    render(){
        const { user, imageUrl } = this.state;
        if (user) {
            return (
                <Grid columns={2} >
                    <Grid.Column>
                        { imageUrl ? <img style={{ width: "250px", height: "250px" }} src={imageUrl} alt="place" /> :
                            <img style={{ width: "250px", height: "250px" }} alt="place" src="http://localhost:8080/images/website/empty_usr.png" />
                        }
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