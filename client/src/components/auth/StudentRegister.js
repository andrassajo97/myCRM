import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerStudentUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

import logo from "../../img/student.svg";

class StudentRegister extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      username: "",
      password: "",
      password2: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2,
      isStudent: true,
    };

    this.props.registerStudentUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div
        className="landing d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div
          className="container p-5"
          style={{
            width: "70vh",
            backgroundColor: "rgb(51, 181, 229, 0.8)",
          }}
        >
          <form className="form-signin" onSubmit={this.onSubmit}>
            <div className="text-center">
              <img src={logo} width="50" height="50" alt="logo" />
              <h1 className="h3 font-weight-normal">
                Hallgatói fiók létrehozása
              </h1>
            </div>
            <TextFieldGroup
              placeholder="Hallgató neve"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
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
            <TextFieldGroup
              placeholder="Jelszó megerősítése"
              type="password"
              name="password2"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <button
              className="btn btn-lg btn-primary btn-block mb-2"
              type="submit"
            >
              Regisztráció
            </button>
            <div className="text-center">
              Van már fiókod?&nbsp;
              <Link className="center" to="/studentLogin">
                Bejelentkezés
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

StudentRegister.propTypes = {
  registerStudentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerStudentUser })(
  withRouter(StudentRegister)
);
