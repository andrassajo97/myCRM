import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class StageHeader extends Component {
  render() {
    const { stage } = this.props;

    return (
      <div class="container col-8 card card-body bg-info text-white mb-3">
        <div class="text-center">
          <h1 class="display-5">{stage.title}</h1>
        </div>
        <div class="row justify-content-around">
          <div class="col-8 text-center">
            <div>
            <strong>Határidő: </strong> &nbsp;
            {moment(stage.deadline).format("MMMM D, YYYY")}</div>&nbsp;
            <strong>Munkafolyamat rövid leírása</strong><br/>
            {stage.desc}
          </div>
        </div>
      </div>
    );
  }
}

StageHeader.propTypes = {
  stage: PropTypes.object.isRequired,
};

export default StageHeader;
