import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
class Footer extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <footer
        className="text-white mt-5 p-4 text-center"
        style={{ backgroundColor: "rgb(51, 181, 229)" }}
      >
        <div className="container">
          <span className="text-white">
            Copyright &copy; {new Date().getFullYear()} CRM
          </span>
        </div>
      </footer>
    );

    const guestLinks = <div></div>;

    return <div>{isAuthenticated ? authLinks : guestLinks}</div>;
  }
}

Footer.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, {})(Footer);
