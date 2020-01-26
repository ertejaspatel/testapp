import React, { Component } from "react";
import Link from "next/link";
import VendorLayout from "../components/vendor/VendorLayout";
import PublicLayout from "../components/layouts/PublicLayout";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <PublicLayout>
          <div className="container">
            <br />
            <h1> Home Page </h1>
          </div>
        </PublicLayout>
      </>
    );
  }
}
