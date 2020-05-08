import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginCompanyUser } from '../../actions/authActions';
import TextFieldGroup from "../common/TextFieldGroup";

import logo from "../../img/work.svg";

class CompanyLogin extends Component {
    constructor() {
        super();
    
        this.state = {
          username: "",
          password: "",
          errors: {}
        };
    
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }

      componentDidMount() {
        if(this.props.auth.isAuthenticated) {
          this.props.history.push('/dashboard')
        }
      }

      componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
          this.props.history.push('/dashboard')
        }

        if(nextProps.errors) {
          this.setState({errors: nextProps.errors})
        }
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const userData = {
            username: this.state.username,
            password: this.state.password,
        }
    
        this.props.loginCompanyUser(userData)
      }

  render() {
    const { errors } = this.state;

    return (
      <div
        className="landing d-flex align-items-center justify-content-center"
        style={{height: "100vh"}}
      >
        <div
          className="container p-5"
          style={{
          width: "70vh",
          backgroundColor: "rgb(51, 181, 229, 0.8)"}}
        >
          <form className="form-signin" onSubmit={this.onSubmit}>
          <div className="text-center">
          <img
              src={logo}
              width="50"
              height="50"
              alt="logo"
            />
            <h1 className="h3 font-weight-normal">Jelentkezzen be!</h1>
            </div>
            <TextFieldGroup
              placeholder="Fehasználónév"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
              error={errors.username}
            />
            <TextFieldGroup
              placeholder="Jelszó"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <button className="btn btn-lg btn-primary btn-block mb-2" type="submit">
              Bejelentkezés
            </button>
            <div className="text-center">
              Nincs még fiókja?&nbsp;
              <Link className="center" to="/companyRegister">
                Fiók létrehozása
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CompanyLogin.propTypes = {
  loginCompanyUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginCompanyUser })(CompanyLogin);
