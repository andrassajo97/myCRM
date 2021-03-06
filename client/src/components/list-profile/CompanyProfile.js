import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getCompanyProfile } from "../../actions/profileActions";

class CompanyProfile extends Component {
  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.getCompanyProfile(this.props.match.params.id);
    }
  }

  onClickRedirect(e) {
    window.location = "/edit-companyProfile";
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Spinner />;
    } else {
      profileContent = (
        <div className="profile position-relative overflow-auto p-3">
          <div className="container mh-100">
            <div className="row">
              <div className="col-md-12">
                <div className="row text-center">
                  <div className="col-6">
                    <Link to="/dashboard" className="btn btn-info mb-3">
                      Vissza a kezdőlapra
                    </Link>
                  </div>
                  <div className="col-6">
                    <button
                      onClick={this.onClickRedirect.bind(this)}
                      className="btn btn-info mb-3"
                    >
                      Szerkesztés
                    </button>
                  </div>
                </div>

                <div className="container col-12 card card-body bg-info text-white mb-3">
                  <div className="text-center">
                    <h1 className="display-4 p-3">{profile.name}</h1>
                  </div>
                  <div className="row justify-content-around">
                    <div className="col-4">
                      <p>
                        <strong>Cím: </strong>
                        {profile.postal}, {profile.city}, {profile.address}
                      </p>
                      <p>
                        <strong>Kutatási terület: </strong>
                        {profile.fieldofResearch}
                      </p>
                    </div>
                    <div className="col-4">
                      <p>
                        <strong>Email: </strong>
                        {profile.email}
                      </p>
                      <p>
                        <strong>Telefonszám: </strong>
                        {profile.phonenum}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return <div>{profileContent}</div>;
  }
}

CompanyProfile.propTypes = {
  getCompanyProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCompanyProfile,
})(CompanyProfile);
