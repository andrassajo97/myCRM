import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SelectListGroup from "../common/SelectListGroup";
import { addTask } from "../../actions/taskActions";
import { getResearchByName } from "../../actions/researchActions";
import isEmpty from "../../validation/is-empty";
import classnames from "classnames";

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      desc: "",
      date: "",
      research: "",
      researches: [],
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeResearch = this.onChangeResearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getResearchByName();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const TaskData = {
      type: this.state.type,
      date: this.state.date,
      desc: this.state.desc,
      research: this.state.research,
    };

    this.props.addTask(TaskData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeResearch(e) {
    this.setState({ research: e.target.value });
  }

  render() {
    const { user } = this.props.auth;

    const { errors } = this.state;

    const { researches } = this.props.research;

    // Select options for type
    const options = [
      { label: "* Típus?", value: 0 },
      { label: "Email", value: "Email" },
      { label: "Telefon", value: "Telefon" },
      { label: "Személyes találkozó", value: "Személyes találkozó" },
    ];

    return (
      <div>
        <div className="create-profile">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <a href="/dashboard" className="btn btn-info">
                  Vissza a kezdőlapra
                </a>
                <h1 className="display-4 text-center">Teendő létrehozása</h1>
                <form onSubmit={this.onSubmit}>
                  <h6>Kutatás</h6>
                  <div className="form-group">
                    <select
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.research,
                      })}
                      value={this.state.research}
                      onChange={this.onChangeResearch}
                    >
                      {researches.map(function (research) {
                        return (
                          <option
                            key={research._id}
                            value={research._id}
                          >
                            {research.name}
                          </option>
                        );
                      })}
                    </select>
                    {errors.research && (
                      <div className="invalid-feedback text-white">
                        {errors.research}
                      </div>
                    )}
                  </div>
                  <h6>Esedékesség</h6>
                  <div className="form-group">
                    <TextFieldGroup
                      type="date"
                      name="date"
                      value={this.state.date}
                      onChange={this.onChange}
                      error={errors.date}
                    />
                  </div>
                  <div className="form-group">
                    <SelectListGroup
                      name="type"
                      value={this.state.type}
                      onChange={this.onChange}
                      options={options}
                      error={errors.type}
                    />
                  </div>
                  <div className="form-group">
                    <TextAreaFieldGroup
                      name="desc"
                      value={this.state.desc}
                      onChange={this.onChange}
                      error={errors.desc}
                      placeholder="Megjegyzés"
                    />
                  </div>
                  <button
                    className="btn btn-info btn-block"
                    style={{ backgroundColor: "rgb(51, 181, 229)" }}
                    type="submit"
                  >
                    Létrehozás
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
  getResearchByName: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  research: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  research: state.research,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  addTask,
  getResearchByName,
})(withRouter(AddTask));
