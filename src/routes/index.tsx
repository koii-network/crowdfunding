import { Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
// pages
import { Funding } from "pages";

export const Routes = () => {
  return (
    <>
      <Switch>
        <PublicRoute exact path="/" component={Funding} />
      </Switch>
    </>
  );
};
