import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getResearch, deleteResearch } from "../../actions/researchActions";
import ResearchHeader from "./ResearchHeader";
import ResearchAssignees from "./ResearchAssignees";

class Research extends Component {
  componentDidMount() {
    this.props.getResearch(this.props.match.params.id);
  }

  onClickRedirect(e) {
    window.location = `/edit-research/${this.props.match.params.id}`;
  }

  onDeleteClick(e) {
    this.props.deleteResearch(this.props.match.params.id, this.props.history);
  }

  render() {
    const { research, loading } = this.props.research;
    const { user } = this.props.auth;
    let researchContent;

    if (research === null || loading) {
      researchContent = <Spinner />;
    } else {
      researchContent = (
        <div className="profile position-relative overflow-auto">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row text-center">
                  <div className="col-4">
                    <Link to="/dashboard" className="btn btn-info mb-3">
                      Vissza a kezdőlapra
                    </Link>
                  </div>
                  {user.name === research.company ? (
                    <div className="row col-8">
                      <div className="col-4">
                        <button
                          onClick={this.onDeleteClick.bind(this)}
                          className="btn btn-danger mb-3"
                        >
                          Kutatás törlése
                        </button>
                      </div>
                      <div className="col-4">
                        <button
                          onClick={this.onClickRedirect.bind(this)}
                          className="btn btn-info mb-3"
                        >
                          Szerkesztés
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <ResearchHeader research={research} />
          <ResearchAssignees
            research={research}
            id={this.props.match.params.id}
            history={this.props.history}
          />
          <div className="container col-10 mb-2">
            <div className="row">
              <h3>
                Munkafolyamat{" "}
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/research/${this.props.match.params.id}/stages`}
                >
                  megtekintése
                </Link>
              </h3>
              &nbsp;
            </div>
          </div>
        </div>
      );
    }

    return <div>{researchContent}</div>;
  }
}

Research.propTypes = {
  getResearch: PropTypes.func.isRequired,
  deleteResearch: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  research: state.research,
  auth: state.auth,
});

export default connect(mapStateToProps, { getResearch, deleteResearch })(
  Research
);
