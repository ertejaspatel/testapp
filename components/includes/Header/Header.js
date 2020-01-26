import React, { Component } from "react";
import Link from "next/link";
import { observer } from "mobx-react";

const Header = props => {
  console.log("Render", props);
  //console.log(props.user.profile, props.user.profile.name);
  if (!props.user || !props.user.profile) {
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
        <button
          className="navbar-toggler sidebar-toggler d-md-down-none"
          type="button"
          data-toggle="sidebar-lg-show"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </header>
    );
  }
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
      <button
        className="navbar-toggler sidebar-toggler d-md-down-none"
        type="button"
        data-toggle="sidebar-lg-show"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* <ul className="nav navbar-nav d-md-down-none">
        <li className="nav-item px-3">
          <a className="nav-link" href="#">
            Dashboard
          </a>
        </li>
        <li className="nav-item px-3">
          <a className="nav-link" href="#">
            Users
          </a>
        </li>
        <li className="nav-item px-3">
          <a className="nav-link" href="#">
            Settings
          </a>
        </li>
      </ul> */}
      <ul className="nav navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a
            className="nav-link nav-link"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {props.user.profile.name}
          </a>
          <div className="dropdown-menu dropdown-menu-right">
            <div className="dropdown-header text-center">
              <strong>Settings</strong>
            </div>

            <Link href="/account/profile">
              <a className="dropdown-item">
                <i className="fa fa-user"></i> Profile
              </a>
            </Link>

            <a className="dropdown-item">
              <i className="fa fa-wrench"></i> Settings
            </a>

            <Link href="/logout">
              <a className="dropdown-item">
                <i className="fa fa-lock"></i> Logout
              </a>
            </Link>
          </div>
        </li>
      </ul>
      <button
        className="navbar-toggler aside-menu-toggler d-md-down-none"
        type="button"
        data-toggle="aside-menu-lg-show"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
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

export default observer(Header);
