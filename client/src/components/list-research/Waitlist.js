import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getWaitlistResearches } from "../../actions/researchActions";
import { Link } from "react-router-dom";
import moment from "moment";

class Waitlist extends Component {
  componentDidMount() {
    this.props.getWaitlistResearches();
  }

  render() {
    const { researches, loading } = this.props.research;
    let researchItems;

    if (researches === null || loading) {
      researchItems = <Spinner />;
    } else {
      if (researches.length > 0) {
        researchItems = researches.map((research) => (
          <div className="row card col-3 card-body bg-light text-center mx-auto">
            <h3>{research.name}</h3>
            <p>{research.company}</p>
            <p>{research.subject}</p>
            <p>
              {moment(research.from).format("MMMM D, YYYY")} -{" "}
              {moment(research.to).format("MMMM D, YYYY")}
            </p>
            <Link
              to={`/research/${research._id}`}
              style={{ position: "absolute", bottom: "0", width: "75%" }}
              className="mx-3 btn btn-info"
            >
              Kutatás megtekintése
            </Link>
          </div>
        ));
      } else {
        researchItems = <h4>Nincsenek jelentkezőre kutatások...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="display-4 text-center">
                Jelentkezőre váró kutatások
              </h1>
              <div className="col-12 row">{researchItems}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Waitlist.propTypes = {
  getWaitlistResearches: PropTypes.func.isRequired,
  research: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  research: state.research,
});

export default connect(mapStateToProps, { getWaitlistResearches })(Waitlist);
