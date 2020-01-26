import React, { Component } from "react";
import Link from "next/link";
import { observer } from "mobx-react";

const PublicHeader = props => {
  // console.log("Public Header", props);
  return (
    <header className="app-header navbar">
      <button
        className="navbar-toggler sidebar-toggler d-lg-none mr-auto"
        type="button"
        data-toggle="sidebar-show"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand" href="#">
        Test App
      </a>

      <ul className="nav navbar-nav ml-auto">
        {props.store.user ? (
          <li className="nav-item">
            <Link href="/account/profile">
              <a className="dropdown-item">
                <i className="fa fa-user"></i> {props.store.user.profile.name}
              </a>
            </Link>
          </li>
        ) : (
          <>
            <li className="nav-item">
              <Link href="/auth/login">
                <a className="dropdown-item" style={{ minWidth: "80px" }}>
                  Login
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/auth/signup">
                <a className="dropdown-item" style={{ minWidth: "90px" }}>
                  Create Account
                </a>
              </Link>
            </li>
          </>
        )}
      </ul>

      <button
        className="navbar-toggler aside-menu-toggler d-lg-none"
        type="button"
        data-toggle="aside-menu-show"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </header>
  );
};

export default observer(PublicHeader);
