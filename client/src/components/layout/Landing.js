import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from 'react-redux';

class Landing extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (<div></div>);

    const guestLinks = (
      <div
        className="landing d-flex align-items-center justify-content-center"
        style={{height: "100vh"}}
      >
        <div className="p-5">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/companyLogin"
          >
            <button
              type="button"
              className="col-example btn btn-primary btn-lg"
            >
              <h1>CÉG VAGYOK</h1>
            </button>
          </Link>
        </div>
        <div className="p-5">
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/studentLogin"
          >
            <button
              type="button"
              className="col-example btn btn-primary btn-lg"
            >
              <h1>HALLGATÓ VAGYOK</h1>
            </button>
          </Link>
        </div>
      </div>
    )

    return (
    <div>{isAuthenticated? authLinks : guestLinks}</div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStatetoProps = (state) => ({
  auth: state.auth
})

export default connect(mapStatetoProps, {})(Landing);

