import React from 'react';
import { Button, Segment, Grid, Icon, Input, Message } from 'semantic-ui-react';

import api from '../../../api';
import InlineError from "../../messages/InlineError";
import WaitMessage from "../../messages/WaitMessage";


class index extends React.Component {
  state = {
      user: null,
      Username: "",
      Email: "",
      imageUrl: null,
      edit: false,
      errors: {}, 
      newUpload: null,
      photoUpdated: null
  };

  componentDidMount() {
    api.user.userAcount()
      .then(user => {
        if (user.profileImage) {
            const image = `http://localhost:8080/api/users/image/${user.profileImage}`;
            this.setState({ image });
        }
        this.setState({ user })
      });
  }

  onChange = (e, { name, value }) => {
    this.setState({
        user: {
            ...this.state.user,
            [name]: value
        }
    });
  };

  submitPhoto = () => {
    this.setState({ photoUpdated: false })
    const { newUpload } = this.state;
    if (newUpload !== null) {
      api.user.UploadUserImage(this.state.newUpload, this.state.user._id)
      .then( () => this.setState({ photoUpdated: true }))
    }
  }

  displayPicture = e => {
    if (e.target.files && e.target.files[0]) {
      this.setState({ photoUpdated: null });
      // Displaying Image.
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState({ image: event.target.result });
      }
      reader.readAsDataURL(e.target.files[0]);

      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('file', uploadFile);
      this.setState({ newUpload: formData });
    }
  }

  submitChange = () => {
      const { username, email } = this.state.user;
      const user = {username, email }
      api.user.Edit({user})
      .then(res => {
          if(res.user.token !== undefined) {
              localStorage.setItem("gottatcgJWT", res.user.token);
          }
          this.setState({errors: {}});
          this.editInfo();
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  editInfo = () => this.setState({edit: !this.state.edit})

  render(){
      const { user, image, edit, errors, newUpload, photoUpdated } = this.state;
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
                      <Button style={{ visibility: (newUpload !== null && (photoUpdated === false || photoUpdated === null)) ? "" : "hidden" }} onClick={this.submitPhoto} > Upload Photo </Button>
                      {photoUpdated === false && <WaitMessage>We are uploading your image</WaitMessage> }
                      {photoUpdated === true && <Message info header='Your profile picture has been uploaded'/>}
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