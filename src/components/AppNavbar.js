import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import RegisterModal from "../auth/RegisterModal";
import LoginModal from "../auth/LoginModal";
import PropTypes from "prop-types";

import LogOut from "../auth/LogOut";
class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLink = (
      <Fragment>
          <NavItem>
              <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.name}`: ''}</strong>
              </span>
          </NavItem>
        <NavItem>
          <LogOut />
        </NavItem>
      </Fragment>
    );
    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem> 
      </Fragment>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="md-5">
          <Container>
            <NavbarBrand href="/">Hostel List</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>

                  {isAuthenticated ? authLink : guestLinks }
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(AppNavbar);
