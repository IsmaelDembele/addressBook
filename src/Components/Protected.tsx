import { Route, Redirect, RouteProps } from "react-router-dom";
// import { fakeAuth } from '../api/Auth';
import { useSelector } from "react-redux";
// import { logInUser, logOutUser } from "../features/connectionSlice";
import { RootState } from "../app/store";

interface ProtectedProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component?: any;
  // tslint:disable-next-line:no-any
  children?: any;
}

const Protected = (props: ProtectedProps) => {
  const { component: Component, children, ...rest } = props;

  // const dispatch = useDispatch();
  const isConnected = useSelector((state: RootState) => state.connection.value);

  return (
    <Route
      {...rest}
      render={routeProps =>
        isConnected ? (
          Component ? (
            <Component {...routeProps} />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export default Protected;
