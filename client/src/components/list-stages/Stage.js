import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { getStage } from "../../actions/stageActions";
import { getResearch } from "../../actions/researchActions";
import StageHeader from "./StageHeader";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Stage extends Component {
  componentDidMount() {
    this.props.getStage(
      this.props.match.params.id,
      this.props.match.params.num
    );

    this.props.getResearch(this.props.match.params.id);
  }

  render() {
    const { stage, loading } = this.props.stage;
    const { user } = this.props.auth;
    const { research } = this.props.research;

    let stageContent;

    if (stage === null || loading) {
      stageContent = <Spinner />;
    } else {
      stageContent = (
        <div className="profile position-relative overflow-auto">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row text-center">
                  <div className="col-4">
                    <Link
                      to={`/research/${this.props.match.params.id}/stages`}
                      className="btn btn-info mb-3"
                    >
                      Vissza
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <StageHeader stage={stage} />
          {user.name === research.company || user.name === research.student ? (
            <CommentForm
              id={this.props.match.params.id}
              stage_num={stage.num}
            />
          ) : null}
          <CommentFeed
            id={this.props.match.params.id}
            stage_num={stage.num}
            comments={stage.comments}
          />
        </div>
      );
    }

    return <div>{stageContent}</div>;
  }
}

Stage.propTypes = {
  getStage: PropTypes.func.isRequired,
  getResearch: PropTypes.func.isRequired,
  stage: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  research: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  stage: state.stage,
  auth: state.auth,
  research: state.research,
});

export default connect(mapStateToProps, { getStage, getResearch })(Stage);
