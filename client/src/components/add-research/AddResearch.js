import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SelectListGroup from "../common/SelectListGroup";
import { addResearch } from '../../actions/researchActions';
import { getCurrentCompanyProfile } from '../../actions/profileActions';
import isEmpty from "../../validation/is-empty";

class AddResearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      company: "",
      student: "",
      assigned: "",
      subject: "",
      from: "",
      to: "",
      desc: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentCompanyProfile();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesn't exist, make empty string
      profile.name = !isEmpty(profile.name) ? profile.name : "";
      // Set component fields state
      this.setState({
        company: profile.name,
      });
    }
  }

  onSubmit(e) {
      e.preventDefault();

      const ResearchData = {
        name: this.state.name,
        company: this.state.company,
        student: this.state.student,
        subject: this.state.subject,
        assigned: this.state.assigned,
        from: this.state.from,
        to: this.state.to,
        desc: this.state.desc
      };

      this.props.addResearch(ResearchData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { user } = this.props.auth;

    const { errors } = this.state;

    // Select options for status
    const options = [
        { label: "* Kiadva diáknak?", value: 0 },
        { label: "Igen", value: "true" },
        { label: "Nem", value: "false" }
      ];

    return (
      <div>
      {user.isStudent ? (<div>Diákként nincs jogosultsága Kutatás létrehozásához!</div>) :
        (<div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <a href="/dashboard" className="btn btn-info">
                Vissza a kezdőlapra
              </a>
              <h1 className="display-4 text-center">Kutatás létrehozása</h1>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Kutatás neve"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Cég neve"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    style={{cursor: "default"}}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Hallgató neve (nem kötelező)"
                    name="student"
                    value={this.state.student}
                    onChange={this.onChange}
                    error={errors.student}
                  />
                </div>
                <div className="form-group">
                  <TextFieldGroup
                    placeholder="Téma"
                    name="subject"
                    value={this.state.subject}
                    onChange={this.onChange}
                    error={errors.subject}
                  />
                </div>
                <h6>Várható kezdés dátuma</h6>
                <div className="form-group">
                  <TextFieldGroup
                    type="date"
                    name="from"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                  />
                </div>
                <h6>Várható befejezés dátuma</h6>
                <div className="form-group">
                  <TextFieldGroup
                    type="date"
                    name="to"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={errors.to}
                  />
                </div>
                <div className="form-group">
                  <SelectListGroup
                    name="assigned"
                    value={this.state.assigned}
                    onChange={this.onChange}
                    options={options}
                    error={errors.assigned}
                  />
                </div>
                <div className="form-group">
                  <TextAreaFieldGroup
                    name="desc"
                    value={this.state.desc}
                    onChange={this.onChange}
                    error={errors.desc}
                    placeholder="Leírás"
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
      </div>)
    }
    </div>
    );
  }
}

AddResearch.propTypes = {
  addResearch: PropTypes.func.isRequired,
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  errors: state.errors,
});

export default connect(mapStateToProps, { addResearch, getCurrentCompanyProfile })(withRouter(AddResearch));
