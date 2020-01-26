import React from "react";
import PublicHeader from "../includes/Header/PublicHeader";
import Head from "next/head";
// import "../../public/css/site.css";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
class PublicLayout extends React.Component {
  render() {
    return (
      <>
        <Head>
          <title>Test App</title>

          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          ></link>

          <style>{`@import url(https://use.fontawesome.com/releases/v5.6.3/css/all.css)`}</style>
          <link
            rel="stylesheet"
            href="https://unpkg.com/@coreui/coreui/dist/css/coreui.min.css"
          />

          <script
            src="http://code.jquery.com/jquery-3.3.1.min.js"
            integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
            crossOrigin="anonymous"
          ></script>

          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
            integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
            crossOrigin="anonymous"
          ></script>

          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
            integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
            crossOrigin="anonymous"
          ></script>

          <script src="https://unpkg.com/@coreui/coreui/dist/js/coreui.min.js"></script>
        </Head>
        <div className="app">
          <PublicHeader {...this.props} />
          <div className="app-body">
            <main className="main">{this.props.children}</main>
          </div>
          <footer className="app-footer">Footer</footer>
        </div>
      </>
    );
  }
}

export default PublicLayout;
