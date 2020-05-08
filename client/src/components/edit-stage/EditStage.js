import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { editStage, getStage } from "../../actions/stageActions";
import isEmpty from "../../validation/is-empty";

class EditStage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      deadline: "",
      isCompleted: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getStage(
      this.props.match.params.id,
      this.props.match.params.num
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.stage.stage) {
      const stage = nextProps.stage.stage;

      // If stage field doesn't exist, make empty string
      stage.title = !isEmpty(stage.title) ? stage.title : "";
      stage.desc = !isEmpty(stage.desc) ? stage.desc : "";
      stage.date = !isEmpty(stage.date) ? stage.date : "";
      stage.isCompleted = !isEmpty(stage.isCompleted) ? stage.isCompleted : "";

      // Set component fields state
      this.setState({
        title: stage.title,
        desc: stage.desc,
        date: stage.date,
        isCompleted: stage.isCompleted,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newStage = {
      title: this.state.title,
      desc: this.state.desc,
      deadline: this.state.deadline,
      isCompleted: this.state.isCompleted,
    };

    this.props.editStage(
      this.props.match.params.id,
      this.props.match.params.num,
      newStage,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for isCompleted
    const options = [
      { label: "* Kész?", value: 0 },
      { label: "Igen", value: "true" },
      { label: "Nem", value: "false" },
    ];

    return (
      <div>
        <div className="container w-50">
          <h3 className="display-4">Munkafolyamat módosítása</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <div className="mb-3">
                <TextFieldGroup
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  placeholder="Munkafolyamat neve"
                />
              </div>
              <div className="mb-3">
                <TextAreaFieldGroup
                  name="desc"
                  value={this.state.desc}
                  onChange={this.onChange}
                  error={errors.desc}
                  placeholder="Leírás"
                />
              </div>
              <h6>Határidő</h6>
              <div className="mb-3">
                <TextFieldGroup
                  type="date"
                  name="deadline"
                  value={this.state.deadline}
                  onChange={this.onChange}
                  error={errors.deadline}
                />
              </div>
              <div className="mb-3">
                <SelectListGroup
                  name="isCompleted"
                  value={this.state.isCompleted}
                  onChange={this.onChange}
                  options={options}
                  error={errors.isCompleted}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-info btn-block">
              Változtatások mentése
            </button>
          </form>
        </div>
      </div>
    );
  }
}

EditStage.propTypes = {
  editStage: PropTypes.func.isRequired,
  getStage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  stage: state.stage
});

export default connect(mapStateToProps, { editStage, getStage })(EditStage);
