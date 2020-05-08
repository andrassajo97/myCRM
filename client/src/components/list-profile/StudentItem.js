import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class StudentItem extends Component {
  render() {
    const { profile } = this.props;

    return (
    <div class="col-3 row card card-body bg-light mb-3 text-center m-3">
        <h3>{profile.name}</h3>
        <p>{profile.degree}</p>
        <p>{profile.uni}</p>
        <Link to={`/studentProfile/${profile.user}`} class="btn btn-info">
          Profil megtekintése
        </Link>
    </div>
    );
  }
}

StudentItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default StudentItem;
