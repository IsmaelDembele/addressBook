import { Route, Redirect, RouteProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";
import { logOutUser } from "../features/connectionSlice";
import CircularProgress from '@material-ui/core/CircularProgress';

interface ProtectedProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component?: any;
  // tslint:disable-next-line:no-any
  children?: any;
}

const VERIFY_TOKEN_QUERY = gql`
  query Query($token: String!, $useremail: String!) {
    verifyToken(token: $token, useremail: $useremail)
  }
`;

const Protected = (props: ProtectedProps) => {
  const { component: Component, children, ...rest } = props;
  const dispatch = useDispatch();
  const connection = useSelector((state: RootState) => state.connection);
  const useremail = useSelector((state: RootState) => state.userData.email);

  const { loading, /*error,*/ data } = useQuery(VERIFY_TOKEN_QUERY, {
    variables: { token: connection.token, useremail: useremail },
    pollInterval: 3600000, //we check every hour to see if the user token is still valid
  });

  useEffect(() => {
    if (data?.verifyToken === false) {
      console.log("disconnect");
      dispatch(logOutUser());
    }
  }, [data, dispatch]);

  // if (loading) return <div>loading...</div>;
  if (loading) return <div><CircularProgress/></div>;

  return (
    <Route
      {...rest}
      render={routeProps =>
        connection.value ? (
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
