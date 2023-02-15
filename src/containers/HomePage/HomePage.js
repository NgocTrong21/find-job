import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { history } from "../../redux";
import HomeHeader from "../Header/HomeHeader";
import Job from "./Section/Job";
import Profile from "./Section/Profile";
import Company from "./Section/Company";
import DetailJob from "./Section/DetailJob";

const HomePage = () => {
  return (
    <>
      <Router history={history}>
        <HomeHeader />
        <Switch>
          <Route path="/jobs" component={Job}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/companies" component={Company}></Route>
          <Route path="/job/:id" component={DetailJob}></Route>
        </Switch>
      </Router>
    </>
  );
};

export default HomePage;
