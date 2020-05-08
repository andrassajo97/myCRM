import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./util/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";

import { Provider } from "react-redux";
import store from "./store";

import PrivateRoute from "./components/common/PrivateRoute";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import CompanyRegister from "./components/auth/CompanyRegister";
import CompanyLogin from "./components/auth/CompanyLogin";
import StudentRegister from "./components/auth/StudentRegister";
import StudentLogin from "./components/auth/StudentLogin";
import Dashboard from "./components/dashboard/Dashboard";
import CreateStudentProfile from './components/create-profile/CreateStudentProfile';
import CreateCompanyProfile from './components/create-profile/CreateCompanyProfile';
import EditStudentProfile from './components/edit-profile/EditStudentProfile';
import EditCompanyProfile from './components/edit-profile/EditCompanyProfile';
import AddResearch from './components/add-research/AddResearch';
import EditResearch from "./components/edit-research/EditResearch";
import Research from "./components/list-research/Research";
import Waitlist from "./components/list-research/Waitlist";
import InProgress from "./components/list-research/InProgress";
import Completed from "./components/list-research/Completed";
import StudentProfile from "./components/list-profile/StudentProfile";
import CompanyProfile from "./components/list-profile/CompanyProfile";
import Companies from "./components/list-profile/Companies";
import Students from "./components/list-profile/Students";
import StageFrom from "./components/add-stage/StageForm";
import Stages from "./components/list-stages/Stages";
import EditStage from "./components/edit-stage/EditStage";
import Stage from "./components/list-stages/Stage";
import AddTask from "./components/add-task/AddTask";
import Tasks from "./components/list-task/Tasks";

import "./App.css";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and experation
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to landing
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="App">
          <Route exact path="/" component={Landing} />
          <Route exact path="/companyRegister" component={CompanyRegister} />
          <Route exact path="/studentRegister" component={StudentRegister} />
          <Route exact path="/companyLogin" component={CompanyLogin} />
          <Route exact path="/studentLogin" component={StudentLogin} />
          <Switch>
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/create-studentProfile"
            component={CreateStudentProfile}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/create-companyProfile"
            component={CreateCompanyProfile}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/edit-studentProfile"
            component={EditStudentProfile}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/edit-companyProfile"
            component={EditCompanyProfile}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/add-research"
            component={AddResearch}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/edit-research/:id"
            component={EditResearch}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/research/:id"
            component={Research}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/studentProfile/:id"
            component={StudentProfile}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/companyProfile/:id"
            component={CompanyProfile}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/companies"
            component={Companies}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/students"
            component={Students}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/waitlist"
            component={Waitlist}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/in-progress"
            component={InProgress}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/completed"
            component={Completed}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/research/:id/add-stage"
            component={StageFrom}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/research/:id/stages"
            component={Stages}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/research/:id/edit-stage/:num"
            component={EditStage}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/research/:id/stage/:num"
            component={Stage}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/add-task"
            component={AddTask}
          />
          </Switch>
          <Switch>
          <PrivateRoute
            exact
            path="/tasks"
            component={Tasks}
          />
          </Switch>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;
