import React, { Fragment, ReactNode } from "react";
import { Route } from "react-router-dom";

type PublicRouteProps = {
  component?: any;
  layout?: any | typeof Fragment;
  exact?: boolean;
  path?: string;
};

interface Props {
  children: ReactNode;
}
function EmptyLayout({ children }: Props) {
  return <div>{children}</div>;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component, layout: Layout = EmptyLayout, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <Layout {...props}>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);
export default PublicRoute;
