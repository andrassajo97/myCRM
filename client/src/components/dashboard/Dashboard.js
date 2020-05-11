import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getCurrentCompanyProfile,
  deleteCompanyAccount,
} from "../../actions/profileActions";
import StudentDashboard from "./StudentDashboard";
import CompanyDashboard from "./CompanyDashboard";

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;

    let dashboardContent;

    if (user.isStudent) {
      dashboardContent = <StudentDashboard user={user} />;
    } else {
      dashboardContent = <CompanyDashboard user={user} />;
    }

    return <div>{dashboardContent}</div>;
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

Dashboard.propTypes = {
  getCurrentCompanyProfile: PropTypes.func.isRequired,
  deleteStudentAccount: PropTypes.func,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  getCurrentCompanyProfile,
  deleteCompanyAccount,
})(Dashboard);
