import React, { Component } from "react";
import logo from "../../img/student.svg";
import logo2 from "../../img/work.svg";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();

    this.props.logoutUser();

    window.location = "/";
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav>
        {isAuthenticated ? (
          user.isStudent ? (
            <nav
              className="navbar navbar-expand-md navbar-dark mb-4"
              style={{ backgroundColor: "rgb(51, 181, 229)" }}
            >
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                  <img src={logo} width="40" height="40" alt="logo" />
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/dashboard">
                      Kezdőlap
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-white"
                      to="#"
                      data-toggle="dropdown"
                    >
                      Profil
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                      <Link
                        className="dropdown-item"
                        to={`/studentProfile/${user.id}`}
                      >
                        Megtekintés
                      </Link>
                      <Link className="dropdown-item" to="/edit-studentProfile">
                        Szerkesztés
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-white"
                      to="#"
                      data-toggle="dropdown"
                    >
                      Kutatások
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                      <Link className="dropdown-item" to="/in-progress">
                        Folyamatban
                      </Link>
                      <Link className="dropdown-item" to="/waitlist">
                        Jelentkezésre váró!
                      </Link>
                      <Link className="dropdown-item" to="/completed">
                        Lezárt
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/companies">
                      Cégek
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/students">
                      Hallgatók
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-white"
                      to="#"
                      data-toggle="dropdown"
                    >
                      Teendők
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                      <Link className="dropdown-item" to="/tasks">
                        Megtekintés
                      </Link>
                      <Link className="dropdown-item" to="/add-task">
                        Létrehozás
                      </Link>
                    </div>
                  </li>
                </ul>
                <div className="text-white">{user.username}</div>
                <Link
                  className="nav-link text-white"
                  style={{ textDecoration: "none" }}
                  to="/"
                  onClick={this.onLogoutClick.bind(this)}
                >
                  Kijelentkezés
                </Link>
              </div>
            </nav>
          ) : (
            <nav
              className="navbar navbar-expand-md navbar-dark mb-4"
              style={{ backgroundColor: "rgb(51, 181, 229)" }}
            >
              <div className="collapse navbar-collapse" id="navbarCollapse">
                <ul className="navbar-nav mr-auto">
                  <img src={logo2} width="40" height="40" alt="logo" />
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/dashboard">
                      Kezdőlap
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-white"
                      to="#"
                      data-toggle="dropdown"
                    >
                      Profil
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                      <Link
                        className="dropdown-item"
                        to={`/companyProfile/${user.id}`}
                      >
                        Megtekintés
                      </Link>
                      <Link className="dropdown-item" to="/edit-companyProfile">
                        Szerkesztés
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-white"
                      to="#"
                      data-toggle="dropdown"
                    >
                      Kutatások
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                      <Link className="dropdown-item" to="/in-progress">
                        Folyamatban
                      </Link>
                      <Link className="dropdown-item" to="/waitlist">
                        Jelentkezésre vár
                      </Link>
                      <Link className="dropdown-item" to="/completed">
                        Lezárt
                      </Link>
                      <Link className="dropdown-item" to="/add-research">
                        Létrehozás
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/companies">
                      Cégek
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/students">
                      Hallgatók
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-white"
                      to="#"
                      data-toggle="dropdown"
                    >
                      Teendők
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="dropdown01">
                      <Link className="dropdown-item" to="/tasks">
                        Megtekintés
                      </Link>
                      <Link className="dropdown-item" to="/add-task">
                        Létrehozás
                      </Link>
                    </div>
                  </li>
                </ul>
                <div className="text-white">{user.username}</div>
                <Link
                  className="nav-link text-white"
                  style={{ textDecoration: "none" }}
                  to="/landing"
                  onClick={this.onLogoutClick.bind(this)}
                >
                  Kijelentkezés
                </Link>
              </div>
            </nav>
          )
        ) : null}
      </nav>
    );
  }
}

Navbar.propTypes = {
  clearCurrentProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { logoutUser, clearCurrentProfile })(
  Navbar
);
