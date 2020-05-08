import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

class StageItem extends Component {
  onClickRedirect(e) {
    window.location = `/research/${this.props.id}/edit-stage/${this.props.num}`;
  }

  render() {
    const { stage } = this.props;
    const { user } = this.props.auth;

    return (
      <div>
        <h4 className="text-center">{stage.title}</h4>
        <table className="table table-sm text-center">
          <thead>
            <tr>
              <th>Határidő</th>
              <th>Kész?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{moment(stage.deadline).format("YYYY.MM.DD")}</td>
              {stage.isCompleted ? <td>Igen</td> : <td>Nem</td>}
            </tr>
          </tbody>
        </table>
          <button className="btn btn-info m-2"><Link className="text-white" style={{textDecoration: "none"}} to={`/research/${this.props.id}/stage/${stage.num}`}>Beszélgetés megtekintése</Link></button>
          {user.name === stage.company ? (
          <div className="text-center">
            <button
              className="btn btn-info m-2"
              onClick={this.onClickRedirect.bind(this)}
            >
              Szerkesztés
            </button>
          </div>
        ) : null}
      </div>
    );
  }
}

StageItem.propTypes = {
  stage: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(StageItem);
