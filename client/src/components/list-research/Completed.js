import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getCompletedResearches } from "../../actions/researchActions";
import { Link } from "react-router-dom";
import moment from "moment";

class Completed extends Component {
  componentDidMount() {
    this.props.getCompletedResearches();
  }

  render() {
    const { researches, loading } = this.props.research;
    let researchItems;

    if (researches === null || loading) {
      researchItems = <Spinner />;
    } else {
      if (researches.length > 0) {
        researchItems = researches.map((research) => (
          <div class="row card col-3 card-body bg-light mb-3 text-center m-3">
            <h3>{research.name}</h3>
            <p>{research.company}</p>
            <p>{research.subject}</p>
            <p>{moment(research.from).format("MMMM D, YYYY")} - {moment(research.to).format("MMMM D, YYYY")}</p>
            <Link to={`/research/${research._id}`} class="btn btn-info">
              Kutatás megtekintése
            </Link>
          </div>
        ));
      } else {
        researchItems = <h4>Nincsenek lezárt kutatások...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Lezárt kutatások</h1>
              <div className="col-12 row">
              {researchItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Completed.propTypes = {
  getCompletedResearches: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  research: state.research,
});

export default connect(mapStateToProps, { getCompletedResearches })(Completed);
