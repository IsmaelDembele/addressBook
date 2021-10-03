import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import App from "./Components/App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useHistory } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { PATH } from "./helper/helper";

const httpLink = new HttpLink({
  uri: "http://localhost:4000",
  // uri: "http://localhost:4000/graphql"
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  const history = useHistory();
  let error = "";
  if (graphQLErrors) {
    error += "something went wrong please try again\n";
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }

  if (networkError && !navigator.onLine) {
    error += "Please connect to the internet and try again\n";
  }

  if (networkError && navigator.onLine) {
    console.log(`[Network error]: ${networkError}`);
    error += "Network error";
  }
  alert(error);
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
