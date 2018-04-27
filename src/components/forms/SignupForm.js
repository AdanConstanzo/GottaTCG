import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Grid } from "semantic-ui-react";
import isEmail from "validator/lib/isEmail";
import InlineError from "../messages/InlineError";
import api from '../../api';

class SignupForm extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
      username: "",
      image: null
    },
    loading: false,
    image: "http://localhost:8080/images/website/empty_usr.png",
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  displayPicture = e => {
    if ( e.target.files && e.target.files[0] ) {
      // Displaying Image.
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState({image: event.target.result});
        
      }
      reader.readAsDataURL(e.target.files[0]);

      const uploadFile = e.target.files[0];
      const formData = new FormData();
      formData.append('file', uploadFile);
      this.setState({
        ...this.state,
        data: { ...this.state.data, image: formData }
      });
    }
  }

  validate = data => {
    const errors = {};

    if (!isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";

    return errors;
  };

  render() {
    const { data, errors, loading, image } = this.state;

    return (
      <Grid columns={2}>
        <Grid.Column>
          <Form>
            <Form.Field error={!!errors.email}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@email.com"
                value={data.email}
                onChange={this.onChange}
              />
              {errors.email && <InlineError text={errors.email} />}
            </Form.Field>

            <Form.Field error={!!errors.password}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={this.onChange}
              />
              {errors.password && <InlineError text={errors.password} />}
            </Form.Field>

            <Form.Field error={!!errors.username}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={data.username}
                onChange={this.onChange}
              />
            </Form.Field>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <img style={{maxHeight: "250px", maxWidth:"250px"}} src={image} alt="place" />
          <br />
          <input type="file" name="file" onChange={this.displayPicture} />
        </Grid.Column>
          <Button onClick={this.onSubmit} primary>Sign Up</Button>
      </Grid>
    );
  }
}

SignupForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default SignupForm;
