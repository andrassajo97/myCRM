import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentStudentProfile,
  deleteStudentAccount,
} from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import moment from "moment";
import { getInProgressResearches } from "../../actions/researchActions";
import { getTasks } from "../../actions/taskActions";

class StudentDashboard extends Component {
  componentDidMount() {
    this.props.getCurrentStudentProfile();
    this.props.getInProgressResearches();
    this.props.getTasks();
  }

  onDeleteClick(e) {
    this.props.deleteStudentAccount();
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props;
    const { researches } = this.props.research;
    const { tasks } = this.props.task;

    let researchesContent;

    if (researches === null || loading) {
      researchesContent = <Spinner />;
    } else {
      if (researches.length > 0) {
        researchesContent = researches.map((research) => (
          <>
            {research.student === user.name ? (
              <tr>
                <td className="w-50">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/research/${research._id}`}
                  >
                    {research.name}
                  </Link>
                </td>
                <td>{moment(research.to).format("YYYY.MM.DD")}</td>
                <td>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/companyProfile/${research.companyID}`}
                  >
                    {research.company}
                  </Link>
                </td>
              </tr>
            ) : null}
          </>
        ));
      }
    }

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <Link to="edit-studentProfile" className="btn btn-info">
              <i className="fas fa-user-circle text-info mr-1"></i> Profil
              szerkesztése{" "}
            </Link>
            &nbsp;
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Fiók törlése
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p>Még nincs profilja!</p>
            <Link to="/create-studentProfile" className="btn btn-info">
              Profil készítése
            </Link>
          </div>
        );
      }
    }

    let tasksContent;

    if (tasks === null || loading) {
      tasksContent = <Spinner />;
    } else {
      if (tasks.length > 0) {
        tasksContent = tasks.map((task) => (
          <>
            {task.user.name === user.name ? (
              moment(new Date()).format("YYYY.MM.DD") ===
              moment(task.date).format("YYYY.MM.DD") ? (
                <tr>
                  <td>{task.type}</td>
                  <td>{task.desc}</td>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/research/${task.research}`}
                    >
                      Megtekintés
                    </Link>
                  </td>
                </tr>
              ) : null
            ) : null}
          </>
        ));
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Áttekintés</h1>
              <p className="lead text-muted">
                Üdvözöljük,{" "}
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/studentProfile/${user.id}`}
                >
                  {user.name}
                </Link>
                !
              </p>
              <p className="lead text-muted">
                Mai dátum: {moment(new Date()).format("YYYY.MM.DD")}
              </p>
              {dashboardContent}&nbsp;
              <div class="col-md-12">
                <div class="row">
                  <ul class="list-group col-6">
                    <li class="list-group-item">
                      <h4>Jelenlegi kutatások</h4>
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Téma</th>
                            <th>Határidő</th>
                            <th>Cég</th>
                          </tr>
                        </thead>
                        <tbody>{researchesContent}</tbody>
                      </table>
                    </li>
                  </ul>
                  <ul class="list-group col-6">
                    <li class="list-group-item">
                      <h4>Napi teendők</h4>
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Típus</th>
                            <th>Megjegyzés</th>
                            <th>Kutatás</th>
                          </tr>
                        </thead>
                        <tbody>{tasksContent}</tbody>
                      </table>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  research: state.research,
  task: state.task,
});

StudentDashboard.propTypes = {
  getCurrentStudentProfile: PropTypes.func.isRequired,
  getInProgressResearches: PropTypes.func.isRequired,
  getTasks: PropTypes.func.isRequired,
  deleteStudentAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  getCurrentStudentProfile,
  getTasks,
  deleteStudentAccount,
  getInProgressResearches,
})(StudentDashboard);
