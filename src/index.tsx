import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import App from "./Components/App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://server-address-book.herokuapp.com/"
      : "http://localhost:4000/",
});

//centralise graphQL error management
const errorLink = onError(({ graphQLErrors, networkError }) => {
  let error = "";

  if (graphQLErrors) {
    error += "An error occured, please try again later\n";
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      if (message.includes("email")) {
        error = "Please try with a different email\n";
      }
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
  window.location.reload();
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
