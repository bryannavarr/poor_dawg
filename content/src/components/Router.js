import React from "react";
import { Route, Redirect } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import Hackers from "../containers/Hackers";
import Interactions from "../containers/Interactions";
import Notifications from "../containers/Notifications";
import Challenges from "../containers/Challenges";
import DogOwners from "../containers/DogOwners"

export default function Router() {
  return (
    <React.Fragment>
      {/* <Redirect exact from="/" exact to="/dashboard" /> */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/hackers" component={Hackers} />
      <Route path="/interactions" component={Interactions} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/dogOwners" component={DogOwners} />
    </React.Fragment>
  );
}
