import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { create_StudentProfile } from "../../actions/profileActions";

class CreateStudentProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      uni: "",
      degree: "",
      status: "",
      city: "",
      address: "",
      postal: "",
      email: "",
      phonenum: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      name: this.state.name,
      uni: this.state.uni,
      degree: this.state.degree,
      status: this.state.status,
      city: this.state.city,
      address: this.state.address,
      postal: this.state.postal,
      email: this.state.email,
      phonenum: this.state.phonenum,
    };

    this.props.create_StudentProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "* Hallgató státusza", value: 0 },
      { label: "BSC - alapképzés", value: "BSC - alapképzés" },
      { label: "MSC - mesterképzés", value: "MSC - mesterképzés" },
      { label: "PHD - doktorandusz", value: "PHD - doktorandusz" },
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-info">
                Vissza a kezdőlapra
              </Link>
              <h1 className="display-4 text-center">
                Hallgatói profil léterhozása
              </h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Hallgató neve"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Egyetem"
                    name="uni"
                    value={this.state.uni}
                    onChange={this.onChange}
                    error={errors.uni}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Szak"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                    error={errors.degree}
                  />
                </div>
                <div className="form-group">
                  <SelectListGroup
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                    options={options}
                    error={errors.status}
                  />
                </div>
                <div className="form-row">
                  <div className="col-md-3 mb-3">
                    <TextFieldGroup
                      placeholder="Város"
                      name="city"
                      value={this.state.city}
                      onChange={this.onChange}
                      error={errors.city}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <TextFieldGroup
                      placeholder="Közterület"
                      name="address"
                      value={this.state.address}
                      onChange={this.onChange}
                      error={errors.address}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <TextFieldGroup
                      placeholder="Írányítószám"
                      name="postal"
                      value={this.state.postal}
                      onChange={this.onChange}
                      error={errors.postal}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Email-cím"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Telefonszám"
                    name="phonenum"
                    value={this.state.phonenum}
                    onChange={this.onChange}
                    error={errors.phonenum}
                  />
                </div>
                <button
                  className="btn btn-info btn-block"
                  style={{ backgroundColor: "rgb(51, 181, 229)" }}
                  type="submit"
                >
                  Létrehozás
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateStudentProfile.propTypes = {
    create_StudentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { create_StudentProfile })(
  withRouter(CreateStudentProfile)
);
