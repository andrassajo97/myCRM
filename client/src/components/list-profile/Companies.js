import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import CompanyItem from './CompanyItem';
import { getCompanyProfiles } from '../../actions/profileActions';

class Companies extends Component {
  componentDidMount() {
    this.props.getCompanyProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let companyItems;

    if (profiles === null || loading) {
      companyItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        companyItems = profiles.map(profile => (
          <CompanyItem key={profile._id} profile={profile} />
        ));
      } else {
        companyItems = <h4>Nincsenek cégek...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Cégek</h1>
              <div className="col-12 row">
              {companyItems}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Companies.propTypes = {
  getCompanyProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCompanyProfiles })(Companies);
