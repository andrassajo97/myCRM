import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { addStage } from "../../actions/stageActions";

class StageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: "",
      title: "",
      desc: "",
      deadline: "",
      isCompleted: false,
      company: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const newStage = {
      num: this.state.num,
      title: this.state.title,
      desc: this.state.desc,
      deadline: this.state.deadline,
      isCompleted: this.state.isCompleted,
      company: this.state.company
    };

    this.props.addStage(
      this.props.match.params.id,
      newStage,
      this.props.history
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="container" style={{width: "35%"}}>
          <h3 className="display-4 text-center">Munkafolyamat hozzáadása</h3>
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
            </div>
            <button type="submit" className="btn btn-info btn-block">
              Létrehozás 
            </button>
          </form>
        </div>
      </div>
    );
  }
}

StageForm.propTypes = {
  addStage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addStage })(StageForm);
