import React from "react";
import Header from "../includes/Header/Header";
import Head from "next/head";
import Sidebar from "../includes/Sidebar/Sidebar";
import "../../public/css/site.css";
import axios from "axios";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

@inject("store")
@observer
class MerchantLayout extends React.Component {
  render() {
    console.log("Props", this.props);
    return (<>
        <Head>
          <title>Test App</title>
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
        <div className="app sidebar-show">
          <Header user={toJS(this.props.store.user)} />
          <div className="app-body">
            <div className="sidebar">
              <Sidebar />
            </div>

            <main className="main">{this.props.children}</main>
            <aside className="aside-menu"></aside>
          </div>
          <footer className="app-footer">Powered by Varni Infotech</footer>
        </div>
      </>
    );
  }
}

export default MerchantLayout;
