import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import StageItem from "./StageItem";
import { getStages } from "../../actions/stageActions";
import { Link } from "react-router-dom";
import { getResearch } from "../../actions/researchActions";

class Stages extends Component {
  componentDidMount() {
    this.props.getStages(this.props.match.params.id);

    this.props.getResearch(this.props.match.params.id);
  }

  render() {
    const { stages, loading } = this.props.stage;
    const { user } = this.props.auth;
    const { research } = this.props.research;

    let stageItems;

    if (stages === null || loading) {
      stageItems = <Spinner />;
    } else {
      if (stages.length > 0) {
        stageItems = stages.map((stage) => (
          <div className="mb-3 col-3">
            <StageItem
              key={stage._id}
              id={this.props.match.params.id}
              num={stage.num}
              stage={stage}
            />
          </div>
        ));
      } else {
        stageItems = <h4>Nincsenek munkafolyamatok...</h4>;
      }
    }

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-12">
                <div className="col-12 mb-3">
                  <h1 className="display-4 text-center">Munkafolyamatok</h1>
                </div>
                <div className="col-12 mb-3">
                {research.company === user.name? <div className="col-12 text-center">
                  <Link className="btn-lg btn-info" style={{textDecoration: "none"}} to={`/research/${this.props.match.params.id}/add-stage`}>
                  Új hozzáadása
                  </Link>
                </div> : null}
              </div>
          </div>
              <div className="row col-12">
              {stageItems}
              </div>
            </div>
        </div>
    );
  }
}

Stages.propTypes = {
  getStages: PropTypes.func.isRequired,
  getResearch: PropTypes.func.isRequired,
  stage: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stage: state.stage,
  auth: state.auth,
  research: state.research
});

export default connect(mapStateToProps, { getStages, getResearch })(Stages);
