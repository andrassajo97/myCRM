import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { create_CompanyProfile, getCurrentCompanyProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateCompanyProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      city: "",
      address: "",
      postal: "",
      fieldofResearch: "",
      email: "",
      phonenum: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentCompanyProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
        const profile = nextProps.profile.profile;
  
        // If profile field doesn't exist, make empty string
        profile.name = !isEmpty(profile.name) ? profile.name : "";
        profile.city = !isEmpty(profile.city) ? profile.city : "";
        profile.address = !isEmpty(profile.address) ? profile.address : "";
        profile.postal = !isEmpty(profile.postal) ? profile.postal : "";
        profile.fieldofResearch = !isEmpty(profile.fieldofResearch) ? profile.fieldofResearch : "";
        profile.email = !isEmpty(profile.email) ? profile.email : "";
        profile.phonenum = !isEmpty(profile.phonenum) ? profile.phonenum : "";
  
        // Set component fields state
        this.setState({
          name: profile.name,
          city: profile.city,
          address: profile.address,
          postal: profile.postal,
          fieldofResearch: profile.fieldofResearch,
          email: profile.email,
          phonenum: profile.phonenum
        });
      }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      name: this.state.name,
      city: this.state.city,
      address: this.state.address,
      postal: this.state.postal,
      fieldofResearch: this.state.fieldofResearch,
      email: this.state.email,
      phonenum: this.state.phonenum,
    };

    this.props.create_CompanyProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-info">
                Vissza a kezdőlapra
              </Link>
              <h1 className="display-4 text-center">Cég profil szerkesztése</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Cég neve"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
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
                    placeholder="Kutatási terület"
                    name="fieldofResearch"
                    value={this.state.fieldofResearch}
                    onChange={this.onChange}
                    error={errors.fieldofResearch}
                  />
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
                  Változtatások mentése
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateCompanyProfile.propTypes = {
  create_CompanyProfile: PropTypes.func.isRequired,
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { create_CompanyProfile, getCurrentCompanyProfile })(
  CreateCompanyProfile
);
