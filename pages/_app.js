import App from "next/app";
import React from "react";
import { fetchInitialStoreState, AppStore } from "../stores/AppStore";
import { Provider } from "mobx-react";
// import Axios from "axios";
import "../public/css/site.scss";

class MyApp extends App {
  state = {
    store: new AppStore()
  };
  // Fetching serialized(JSON) store state
  static async getInitialProps(appContext) {
    // calls page's `getInitialProps` and fills `appProps.pageProps`
    const appProps = await App.getInitialProps(appContext);
    let initialStoreState = await fetchInitialStoreState(appContext);

    // console.log(appProps, initialStoreState);

    appProps.pageProps["user"] = initialStoreState.user;

    const propsForComponent = {
      ...appProps,
      initialStoreState
    };

    //console.log(propsForComponent);

    return propsForComponent;
  }

  // Hydrate serialized state to store
  static getDerivedStateFromProps(props, state) {
    state.store.hydrate(props.initialStoreState);
    return state;
  }

  render() {
    // console.log("App Props", this.props);
    const { Component, pageProps } = this.props;
    return (
      <Provider store={this.state.store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}
export default MyApp;
