import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import { connect } from "react-redux";
import { assign, disapprove } from "../../actions/researchActions";

class ResearchAssignees extends Component {
  onClickAssign(e) {
    this.props.assign(this.props.id, this.props.history);
  }

  onClickDisapprove(e) {
    this.props.disapprove(this.props.id, this.props.history);
  }

  render() {
    const { research } = this.props;
    const { user } = this.props.auth;

    let assignBox;

    if (!isEmpty(research.student)) {
      assignBox = (
        <div className="container col-10 mb-2">
          <div className="row">
            <h3>Jelentkezett hallgató:</h3>&nbsp;
            <Link
              to={`/studentProfile/${research.studentID}`}
              class="btn btn-info"
            >
              {research.student}
            </Link>
            &nbsp;
            {user.isStudent ? (
              research.student === user.name ? (
                <button
                  className="btn btn-danger"
                  onClick={this.onClickDisapprove.bind(this)}
                >
                  Lejelentkezek
                </button>
              ) : null
            ) : null}
          </div>
        </div>
      );
    } else {
      assignBox = (
        <div className="container col-10 mb-2">
          <div className="row">
          <h3>Még nem jelentkezett erre a kutatásra hallgató!</h3>
            &nbsp;
          {user.isStudent ? (
            <button
              className="btn btn-info"
              onClick={this.onClickAssign.bind(this)}
            >
              Jelentkezek
            </button>
          ) : null}
        </div>
        </div>
      );
    }

    return <div>{assignBox}</div>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

ResearchAssignees.propTypes = {
  assign: PropTypes.func.isRequired,
  disapprove: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { assign, disapprove })(
  ResearchAssignees
);
