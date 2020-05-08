import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import moment from "moment";
import { getTasks } from "../../actions/taskActions";

class Tasks extends Component {
  componentDidMount() {
    this.props.getTasks();
  }

  render() {
    const { user } = this.props.auth;
    const { tasks, loading } = this.props.task;

    let Content;

    tasks.sort((a, b) => (a.date > b.date ? 1 : -1))

    if (tasks === null || loading) {
      Content = <Spinner />;
    } else {
      if (tasks.length > 0) {
        Content = tasks.map((task) => (
          <>
            {task.user.name === user.name ? (
              <tr>
                <td>{task.type}</td>
                <td>{moment(task.date).format("MMMM D, YYYY")}</td>
                <td>{task.desc}</td>
                <td>
                  <Link to={`/research/${task.research}`}>Megktekint</Link>
                </td>
              </tr>
            ) : null}
          </>
        ));
      }
    }

    return (
      <div class="container col-6">
        <h4>{user.name} teendői:</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Típus</th>
              <th>Esedékesség</th>
              <th>Megjegyzés</th>
              <th>Kutatás</th>
            </tr>
          </thead>
          <tbody>{Content}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  task: state.task,
});

Tasks.propTypes = {
  getInProgressResearches: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  task: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {
  getTasks,
})(Tasks);
