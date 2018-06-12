import React from 'react';
import { Button, Segment, Grid, Icon, Input } from 'semantic-ui-react';

import api from '../../../api';
import InlineError from "../../messages/InlineError";


class index extends React.Component {
    state = {
        user: null,
        Username: "",
        Email: "",
        imageUrl: null,
        edit: false,
        errors: {}
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
        //this.setState({ [name]: value});
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        });
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

    submitChange = () => {
        const { username, email } = this.state.user;
        let user = {username, email }
        api.user.Edit({user})
        .then(res => {
            console.log(res);
            if(res.user.token !== undefined) {
                console.log("Change Token")
                localStorage.setItem("gottatcgJWT", res.user.token);
            }
            this.setState({errors: {}});
            this.editInfo();
        })
        .catch(err => this.setState({ errors: err.response.data.errors }))
    }

    editInfo = () => this.setState({edit: !this.state.edit})

    render(){
        const { user, imageUrl, image, edit, errors } = this.state;
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
                        ) : <Segment textAlign="center" >
                                <p>Email: <Input type="text" name="email" value={user.email} onChange={this.onChange} /></p>
                                {errors.email && <InlineError text={errors.email} />}
                                <p>Username: <Input type="text" name="username" value={user.username} onChange={this.onChange} /></p>
                                {errors.username && <InlineError text={errors.username} />}
                                <Button onClick={this.submitChange} >Submit Changes</Button>
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