import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import StudentItem from './StudentItem';
import { getStudentProfiles } from '../../actions/profileActions';

class Students extends Component {
  componentDidMount() {
    this.props.getStudentProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let studentItems;

    if (profiles === null || loading) {
      studentItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        studentItems = profiles.map(profile => (
          <StudentItem key={profile._id} profile={profile} />
        ));
      } else {
        studentItems = <h4>Nincsenek diákok...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Diákok</h1>
              <div className="row col-12">
              {studentItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Students.propTypes = {
  getStudentProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getStudentProfiles })(Students);
