import React from 'react';
import { Button, Segment, Grid, Icon } from 'semantic-ui-react';

import api from '../../../api';

class index extends React.Component {
    state = {
        user: null,
        Username: "",
        Email: "",
        imageUrl: null,
        edit: false
    };

    componentDidMount() {
        api.user.userAcount()
            .then(user => {
                console.log(user);
                if (user.profileImage) {
                    const image = `http://localhost:8080/api/users/image/${user.profileImage}`;
                    this.setState({ image });
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

    submitPhoto = () => alert("submit photo");

    displayPicture = e => {
        if (e.target.files && e.target.files[0]) {
            // Displaying Image.
            const reader = new FileReader();
            reader.onload = (event) => {
                this.setState({ image: event.target.result });

            }
            reader.readAsDataURL(e.target.files[0]);

            const uploadFile = e.target.files[0];
            const formData = new FormData();
            formData.append('file', uploadFile);
            this.setState({ image: formData });
        }
    }

    editInfo = () => this.setState({edit: !this.state.edit})

    render(){
        const { user, imageUrl, image, edit } = this.state;
        if (user) {
            return (
                <Grid columns={3} centered >
                    <Grid.Column>
                        { image ? <img style={{ width: "250px", height: "250px" }} src={image} alt="place" /> :
                            <img style={{ width: "250px", height: "250px" }} alt="place" src="http://localhost:8080/images/website/empty_usr.png" />
                        }
                        <br />
                        <input type="file" name="file" onChange={this.displayPicture} />
                        <br />
                        <Button onClick={this.submitPhoto} > Submit Photo </Button>
                    </Grid.Column>
                    <Grid.Column>
                        <Icon name="edit" size="big" onClick={this.editInfo} />
                        {edit === false ? (
                            <Segment textAlign="center" >
                            <p>Email: {user.email}</p>
                            <p>Username: {user.username}</p>
                        </Segment>
                        ): <Segment>
                                <p>Edit it me </p>
                            </Segment>
                        }
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