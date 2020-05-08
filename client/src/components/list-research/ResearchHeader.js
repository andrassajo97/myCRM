import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class ResearchHeader extends Component {
  render() {
    const { research } = this.props;

    return (
              <div className="container col-10 card card-body bg-info text-white mb-2">
                <div className="text-center">
                  <h1 className="display-4 p-3">{research.name}</h1>
                </div>
                <div className="row justify-content-around">
                  <div className="col-4">
                    <h5>
                      <strong>Cég: </strong>
                      {research.company}
                    </h5>
                    <h5>
                      <strong>Hallgató: </strong>
                      {research.student}
                    </h5>
                  </div>
                  <div className="col-4">
                    <h5>
                      <strong>Téma: </strong>
                      {research.subject}
                    </h5>
                    <h5>
                      <strong>Időtartam: </strong>
                      {moment(research.from).format("YYYY.MM.DD")}- {moment(research.to).format("YYYY.MM.DD")}
                    </h5>
                  </div>
                </div>
                <div className="col-12">
                  <h4 className="text-center">Leírás</h4>
                  <h5>{research.desc}</h5>
                </div>
              </div>
    );
  }
}

ResearchHeader.propTypes = {
    research: PropTypes.object.isRequired
  };

export default ResearchHeader;