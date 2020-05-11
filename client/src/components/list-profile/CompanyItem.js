import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CompanyItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div class="col-3 row card card-body bg-light mb-3 text-center m-3">
        <h3>{profile.name}</h3>
        <p>{profile.fieldofResearch}</p>
        <p>{profile.city}</p>
        <Link to={`/companyProfile/${profile.user}`} class="btn btn-info">
          Profil megtekintése
        </Link>
      </div>
    );
  }
}

CompanyItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default CompanyItem;
