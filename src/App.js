import React from "react";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import CardPage from "./components/pages/CardPage"
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import CollectionPage from "./components/pages/CollectionPage";
import CardsPage from "./components/pages/CardsPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import WebNav from './components/navigation/Nav';

const App = ({ location }) => (
  <div className="ui container">
    <WebNav />
    <Route 
      location={location} 
      path="/" 
      exact 
      component={HomePage} 
    />
    <Route
      location={location}
      path="/confirmation/:token"
      exact
      component={ConfirmationPage}
    />
    <Route
      location={location}
      path="/card/:id"
      exact
      component={CardPage}
    />
    <Route
      location={location}
      path="/cards"
      exact
      component={CardsPage}
    />
    <GuestRoute 
      location={location} 
      path="/login" 
      exact 
      component={LoginPage} />
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignupPage}
    />
    <GuestRoute
      location={location}
      path="/forgot_password"
      exact
      component={ForgotPasswordPage}
    />
    <GuestRoute
      location={location}
      path="/reset_password/:token"
      exact
      component={ResetPasswordPage}
    />
    <UserRoute
      location={location}
      path="/my_collection"
      exact
      component={CollectionPage}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
