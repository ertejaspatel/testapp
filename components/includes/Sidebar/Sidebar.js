import Link from "next/link";

const Sidebar = () => {
  return (
    <nav className="sidebar-nav ps ps--active-y">
      <ul className="nav">
        <li className="nav-item">
          <Link href="/dashboard">
            <a className="nav-link">
              <i className="fas fa-tachometer-alt"></i> Dashboard
              {/* <span className="badge badge-info">NEW</span> */}
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/account/profile">
            <a className="nav-link">
              <i className="fas fa-user"></i> My Profile
              {/* <span className="badge badge-info">NEW</span> */}
            </a>
          </Link>
        </li>
      </ul>
      {/* <li className="nav-title">Theme</li>
        <li className="nav-item">
          <a className="nav-link" href="colors.html">
            <i className="nav-icon icon-drop"></i> Colors
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="typography.html">
            <i className="nav-icon icon-pencil"></i> Typography
          </a>
        </li>
        <li className="nav-title">Components</li>
        <li className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#">
            <i className="nav-icon icon-puzzle"></i> Base
          </a>
          <ul className="nav-dropdown-items">
            <li className="nav-item">
              <a className="nav-link" href="base/breadcrumb.html">
                <i className="nav-icon icon-puzzle"></i> Breadcrumb
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/cards.html">
                <i className="nav-icon icon-puzzle"></i> Cards
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/carousel.html">
                <i className="nav-icon icon-puzzle"></i> Carousel
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/collapse.html">
                <i className="nav-icon icon-puzzle"></i> Collapse
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/jumbotron.html">
                <i className="nav-icon icon-puzzle"></i> Jumbotron
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/list-group.html">
                <i className="nav-icon icon-puzzle"></i> List group
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/navs.html">
                <i className="nav-icon icon-puzzle"></i> Navs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/pagination.html">
                <i className="nav-icon icon-puzzle"></i> Pagination
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/popovers.html">
                <i className="nav-icon icon-puzzle"></i> Popovers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/progress.html">
                <i className="nav-icon icon-puzzle"></i> Progress
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/scrollspy.html">
                <i className="nav-icon icon-puzzle"></i> Scrollspy
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/switches.html">
                <i className="nav-icon icon-puzzle"></i> Switches
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/tabs.html">
                <i className="nav-icon icon-puzzle"></i> Tabs
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="base/tooltips.html">
                <i className="nav-icon icon-puzzle"></i> Tooltips
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#">
            <i className="nav-icon icon-cursor"></i> Buttons
          </a>
          <ul className="nav-dropdown-items">
            <li className="nav-item">
              <a className="nav-link" href="buttons/buttons.html">
                <i className="nav-icon icon-cursor"></i> Buttons
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="buttons/brand-buttons.html">
                <i className="nav-icon icon-cursor"></i> Brand Buttons
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="buttons/button-group.html">
                <i className="nav-icon icon-cursor"></i> Buttons Group
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="buttons/dropdowns.html">
                <i className="nav-icon icon-cursor"></i> Dropdowns
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="buttons/loading-buttons.html">
                <i className="nav-icon icon-cursor"></i> Loading Buttons
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="charts.html">
            <i className="nav-icon icon-pie-chart"></i> Charts
          </a>
        </li>
        <li className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#">
            <i className="nav-icon fa fa-code"></i> Editors
          </a>
          <ul className="nav-dropdown-items">
            <li className="nav-item">
              <a className="nav-link" href="editors/code-editor.html">
                <i className="nav-icon icon-note"></i> Code Editor
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="editors/markdown-editor.html">
                <i className="nav-icon fa fa-code"></i> Markdown
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="editors/text-editor.html">
                <i className="nav-icon icon-note"></i> Rich Text Editor
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item nav-dropdown open">
          <a className="nav-link nav-dropdown-toggle" href="#">
            <i className="nav-icon icon-note"></i> Forms
          </a>
          <ul className="nav-dropdown-items">
            <li className="nav-item">
              <a className="nav-link active" href="forms/basic-forms.html">
                <i className="nav-icon icon-note"></i> Basic Forms
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="forms/advanced-forms.html">
                <i className="nav-icon icon-note"></i> Advanced
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="forms/validation.html">
                <i className="nav-icon icon-note"></i> Validation
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="google-maps.html">
            <i className="nav-icon icon-map"></i> Google Maps
            <span className="badge badge-danger">PRO</span>
          </a>
        </li>
        <li className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#">
            <i className="nav-icon icon-star"></i> Icons
          </a>
          <ul className="nav-dropdown-items">
            <li className="nav-item">
              <a className="nav-link" href="icons/coreui-icons.html">
                <i className="nav-icon icon-star"></i> CoreUI Icons
                <span className="badge badge-success">NEW</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="icons/flags.html">
                <i className="nav-icon icon-star"></i> Flags
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="icons/font-awesome.html">
                <i className="nav-icon icon-star"></i> Font Awesome
                <span className="badge badge-secondary">4.7</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="icons/simple-line-icons.html">
                <i className="nav-icon icon-star"></i> Simple Line Icons
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#">
            <i className="nav-icon icon-bell"></i> Notifications
          </a>
          <ul className="nav-dropdown-items">
            <li className="nav-item">
              <a className="nav-link" href="notifications/alerts.html">
                <i className="nav-icon icon-bell"></i> Alerts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="notifications/badge.html">
                <i className="nav-icon icon-bell"></i> Badge
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="notifications/modals.html">
                <i className="nav-icon icon-bell"></i> Modals
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="notifications/toastr.html">
                <i className="nav-icon icon-bell"></i> Toastr
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#">
            <i className="nav-icon icon-energy"></i> Plugins
          </a>
          <ul className="nav-dropdown-items">
            <li className="nav-item">
              <a className="nav-link" href="plugins/calendar.html">
                <i className="nav-icon icon-calendar"></i> Calendar
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="plugins/draggable-cards.html">
                <i className="nav-icon icon-cursor-move"></i> Draggable
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="plugins/sliders.html">
                <i className="nav-icon icon-equalizer"></i> Sliders
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="plugins/spinners.html">
                <i className="nav-icon fa fa-spinner"></i> Spinners
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#">
            <i className="nav-icon icon-list"></i> Tables
          </a>
          <ul className="nav-dropdown-items">
            <li className="nav-item">
              <a className="nav-link" href="tables/tables.html">
                <i className="nav-icon icon-list"></i> Standard Tables
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="tables/datatables.html">
                <i className="nav-icon icon-list"></i> DataTables
                <span className="badge badge-danger">PRO</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="widgets.html">
            <i className="nav-icon icon-calculator"></i> Widgets
            <span className="badge badge-info">NEW</span>
          </a>
        </li>
        <li className="nav-divider"></li>
        <li className="nav-title">Extras</li>
        <li className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#">
            <i className="nav-icon icon-star"></i> Pages
          </a>
          <ul className="nav-dropdown-items">
            <li className="nav-item">
              <a className="nav-link" href="login.html" target="_top">
                <i className="nav-icon icon-star"></i> Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="register.html" target="_top">
                <i className="nav-icon icon-star"></i> Register
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="404.html" target="_top">
                <i className="nav-icon icon-star"></i> Error 404
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="500.html" target="_top">
                <i className="nav-icon icon-star"></i> Error 500
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item nav-dropdown">
          <a className="nav-link nav-dropdown-toggle" href="#">
            <i className="nav-icon icon-layers"></i> Apps
          </a>
          <ul className="nav-dropdown-items">
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#">
                <i className="nav-icon icon-speech"></i> Invoicing
              </a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <a className="nav-link" href="apps/invoicing/invoice.html">
                    <i className="nav-icon icon-speech"></i> Invoice
                    <span className="badge badge-danger">PRO</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="#">
                <i className="nav-icon icon-speech"></i> Email
              </a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <a className="nav-link" href="apps/email/inbox.html">
                    <i className="nav-icon icon-speech"></i> Inbox
                    <span className="badge badge-danger">PRO</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="apps/email/message.html">
                    <i className="nav-icon icon-speech"></i> Message
                    <span className="badge badge-danger">PRO</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="apps/email/compose.html">
                    <i className="nav-icon icon-speech"></i> Compose
                    <span className="badge badge-danger">PRO</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="nav-divider"></li>
        <li className="nav-title">Labels</li>
        <li className="nav-item d-compact-none d-minimized-none">
          <a className="nav-label" href="#">
            <i className="fa fa-circle text-danger"></i> Label danger
          </a>
        </li>
        <li className="nav-item d-compact-none d-minimized-none">
          <a className="nav-label" href="#">
            <i className="fa fa-circle text-info"></i> Label info
          </a>
        </li>
        <li className="nav-item d-compact-none d-minimized-none">
          <a className="nav-label" href="#">
            <i className="fa fa-circle text-warning"></i> Label warning
          </a>
        </li>
        <li className="nav-divider"></li>
        <li className="nav-title">System Utilization</li>
        <li className="nav-item px-3 d-compact-none d-minimized-none">
          <div className="text-uppercase mb-1">
            <small>
              <b>CPU Usage</b>
            </small>
          </div>
          <div className="progress progress-xs">
            <div
              className="progress-bar bg-info"
              role="progressbar"
              style={{ width: "25%" }}
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </li>
        <li className="nav-item px-3 d-compact-none d-minimized-none">
          <div className="text-uppercase mb-1">
            <small>
              <b>Memory Usage</b>
            </small>
          </div>
          <div className="progress progress-xs">
            <div
              className="progress-bar bg-warning"
              role="progressbar"
              style={{ width: "70%" }}
              aria-valuenow="70"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <small className="text-muted">11444GB/16384MB</small>
        </li>
        <li className="nav-item px-3 mb-3 d-compact-none d-minimized-none">
          <div className="text-uppercase mb-1">
            <small>
              <b>SSD 1 Usage</b>
            </small>
          </div>
          <div className="progress progress-xs">
            <div
              className="progress-bar bg-danger"
              role="progressbar"
              style={{ width: "95%" }}
              aria-valuenow="95"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <small className="text-muted">243GB/256GB</small>
        </li>
      </ul>
      <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
        <div
          className="ps__thumb-x"
          tabindex="0"
          style={{ left: 0, width: 0 }}
        ></div>
      </div>
      <div className="ps__rail-y" style={{ top: 0, height: "834px", right: 0 }}>
        <div
          className="ps__thumb-y"
          tabindex="0"
          style={{ top: 0, height: "525px;" }}
        ></div>
  </div> */}
    </nav>
  );
};

export default Sidebar;
