import React from "react";
import { Route } from "react-router-dom";

import Dashboard from "../components/Dashboard";
import Hackers from "../containers/Hackers";
import Interactions from "../containers/Interactions";
import Notifications from "../containers/Notifications";
import Vets from "../containers/Vets";
import Dogs from "../containers/Dogs";
import Challenges from "../containers/Challenges";
import Breeds from "../containers/Breeds";
import Rewards from "../containers/Rewards";
import DogOwners from "../containers/DogOwners"

export default function Router() {
  return (
    <React.Fragment>
      {/* <Redirect exact from="/" exact to="/dashboard" /> */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/hackers" component={Hackers} />
      <Route path="/interactions" component={Interactions} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/vets" component={Vets} />
      <Route path="/dogs" component={Dogs} />
      <Route path="/breeds" component={Breeds} />
      <Route path="/challenges" component={Challenges} />
      <Route path="/rewards" component={Rewards} />
      <Route path="/dogOwners" component={DogOwners} />
    </React.Fragment>
  );
}
