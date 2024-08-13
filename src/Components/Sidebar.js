import React, { useState } from "react";
import Img from "./images/GCISC-Vertical-Logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const type = localStorage.getItem("type");
  const permissions = localStorage.getItem("permissions");

  // console.log(permissions)

  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
    // Toggle the sidebar by changing the style state
    setStyle((prevStyle) =>
      prevStyle.includes("toggled")
        ? prevStyle.replace("toggled", "")
        : prevStyle + " toggled"
    );
  };
  const changeStyle1 = () => {
    if (
      style == "navbar-nav bg-primary-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1"
      );
    } else {
      setStyle("navbar-nav bg-primary-primary sidebar sidebar-blue accordion");
    }
  };
  const changeStyle = () => {
    if (
      style == "navbar-nav bg-primary-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-primary-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-primary-primary sidebar sidebar-dark accordion");
    }
  };
  return (
    <div>
      {/* Add a button to toggle the sidebar */}
      <button
        id="sidebarToggle"
        className="btn btn-link d-md-none rounded-circle mr-3"
        onClick={toggleSidebar}
      >
        <i className="fa fa-bars"></i>
      </button>

      <ul
        className={style + (sidebarVisible ? "" : " bg-primary")}
        id="accordionSidebar"
      >
        {/* ... Your existing sidebar content ... */}

        {/*  <!-- Sidebar - Brand --> */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            {/* <i className="fas fa-laugh-wink"></i> */}
            <Link to="/dashboard">
              <img
                src={Img}
                style={{ borderRadius: "50%", height: "2rem" }}
                alt="this is logo"
              />
            </Link>
          </div>
          <Link to="/dashboard">
            <div className="sidebar-brand-text mx-3" style={{ color: "white" }}>
              GCISC
            </div>
          </Link>

          {/* <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle1}></button>
                    </div> */}
          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
              onClick={changeStyle}
            ></button>
          </div>
        </a>

        {/*  <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link className="nav-link" to="/dashboard">
            {/* <i className="fas fa-fw fa-tachometer-alt"></i> */}
            <span>Dashboard</span>
          </Link>
        </li>

        {/*   <!-- Heading --> */}
        <div className="sidebar-heading">Sections</div>

        {/*  <!-- Nav Item - Pages Collapse Menu --> */}

        {/*  <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
        {/* users dropdown */}
        <li></li>
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to="#"
            data-toggle="collapse"
            data-target="#collapsePages"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            {/* <i className="fas fa-fw fa-folder"></i> */}
            Users
          </Link>
          <div
            id="collapsePages"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Users Details:</h6>
              {type && type == "user" && permissions.includes("user") ? (
                <>
                  <Link className="collapse-item" to="/adduser">
                    Add User
                  </Link>
                  <Link className="collapse-item" to="/alluser">
                    All Users
                  </Link>
                </>
              ) : null}

              {type && type == "superadmin" ? (
                <>
                  <Link className="collapse-item" to="/adduser">
                    Add User
                  </Link>
                  <Link className="collapse-item" to="/alluser">
                    All Users
                  </Link>
                  <Link
                    className="collapse-item"
                    to="/superadmin"
                    color="white"
                  >
                    Super Admin
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </li>

        {/* project dropdown */}

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseProject"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            {/* <i className="fas fa-fw fa-folder"></i> */}
            Projects
          </Link>
          <div
            id="collapseProject"
            className="collapse"
            aria-labelledby="headingPages"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Projects Details:</h6>

              {type && type == "user" && permissions.includes("projects") ? (
                <>
                  <Link className="collapse-item" to="/project">
                    Add Project
                  </Link>
                  <Link className="collapse-item" to="/allproject">
                    All Projects
                  </Link>
                </>
              ) : (type && type == "superadmin") ||
                (type && type == "manager") ? (
                <>
                  <Link className="collapse-item" to="/project">
                    Add Project
                  </Link>
                  <Link className="collapse-item" to="/allproject">
                    All Projects
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </li>

        {/* activities dropdown */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to="#"
            data-toggle="collapse"
            data-target="#collapseActivity"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            {/* <i className="fas fa-fw fa-cog"></i> */}
            Activities
          </Link>
          <div
            id="collapseActivity"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Activity Details:</h6>
              {type && type == "user" && permissions.includes("activity") ? (
                <>
                  <Link className="collapse-item" to="/activity">
                    Add Activity
                  </Link>
                  <Link className="collapse-item" to="/allactivity">
                    All Activities
                  </Link>
                </>
              ) : (type && type == "superadmin") ||
                (type && type == "manager") ? (
                <>
                  <Link className="collapse-item" to="/activity">
                    Add Activity
                  </Link>
                  <Link className="collapse-item" to="/allactivity">
                    All Activities
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </li>
        {/* news detatils */}
        {/* <!-- Nav Item - Utilities Collapse Menu --> */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to="#"
            data-toggle="collapse"
            data-target="#collapsenews"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            {/* <i className="fas fa-fw fa-wrench"></i> */}
            News
          </Link>
          <div
            id="collapsenews"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">News Details:</h6>
              {type && type == "user" && permissions.includes("news") ? (
                <>
                  <Link className="collapse-item" to="/news">
                    Add News
                  </Link>
                  <Link className="collapse-item" to="/allnews">
                    All News
                  </Link>
                </>
              ) : (type && type == "superadmin") ||
                (type && type == "manager") ? (
                <>
                  <Link className="collapse-item" to="/news">
                    Add News
                  </Link>
                  <Link className="collapse-item" to="/allnews">
                    All News
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </li>

        {/* library details */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to="#"
            data-toggle="collapse"
            data-target="#collapslibrary"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            {/* <i className="fas fa-fw fa-folder"></i> */}
            Repository
          </Link>
          <div
            id="collapslibrary"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Repository Details:</h6>
              {type && type == "user" && permissions.includes("library") ? (
                <>
                  <Link className="collapse-item" to="/library">
                    Add Repository
                  </Link>
                  <Link className="collapse-item" to="/alllibrary">
                    All Repositories
                  </Link>
                </>
              ) : (type && type == "superadmin") ||
                (type && type == "manager") ? (
                <>
                  <Link className="collapse-item" to="/library">
                    Add Repository
                  </Link>
                  <Link className="collapse-item" to="/alllibrary">
                    All Repositories
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </li>

        {/* library details */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to="#"
            data-toggle="collapse"
            data-target="#collapscalender"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            {/* <i className="fas fa-fw fa-folder"></i> */}
            Calendar
          </Link>
          <div
            id="collapscalender"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Calender Details:</h6>
              {type && type == "user" && permissions.includes("calendar") ? (
                <>
                  <Link className="collapse-item" to="/calender">
                    Add Calendar
                  </Link>
                  <Link className="collapse-item" to="/allcalender">
                    All Calendar
                  </Link>
                </>
              ) : (type && type == "superadmin") ||
                (type && type == "manager") ? (
                <>
                  <Link className="collapse-item" to="/calender">
                    Add Calendar
                  </Link>
                  <Link className="collapse-item" to="/allcalender">
                    All Calendar
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </li>
        {/* messages */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to="#"
            data-toggle="collapse"
            data-target="#collapsmessage"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            {/* <i className="fas fa-fw fa-folder"></i> */}
            Message
          </Link>
          <div
            id="collapsmessage"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Message Details:</h6>
              {type && type == "user" && permissions.includes("message") ? (
                <>
                  <Link className="collapse-item" to="/message">
                    Add Message
                  </Link>
                  <Link className="collapse-item" to="/allmessage">
                    All Messages
                  </Link>
                </>
              ) : (type && type == "superadmin") ||
                (type && type == "manager") ? (
                <>
                  <Link className="collapse-item" to="/message">
                    Add Message
                  </Link>
                  <Link className="collapse-item" to="/allmessage">
                    All Messages
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </li>
        {/* end message */}
        {/* partners */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to="#"
            data-toggle="collapse"
            data-target="#collapspartner"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            {/* <i className="fas fa-fw fa-folder"></i> */}
            Partner
          </Link>
          <div
            id="collapspartner"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Partners Details:</h6>
              {type && type == "user" && permissions.includes("partner") ? (
                <>
                  <Link className="collapse-item" to="/partner">
                    Add Partner
                  </Link>
                  <Link className="collapse-item" to="/allpartner">
                    All Partners
                  </Link>
                </>
              ) : (type && type == "superadmin") ||
                (type && type == "manager") ? (
                <>
                  <Link className="collapse-item" to="/partner">
                    Add Partner
                  </Link>
                  <Link className="collapse-item" to="/allpartner">
                    All Partners
                  </Link>
                </>
              ) : null}
            </div>
          </div>
        </li>
        {/* end partners */}
        {/* library details */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapsnature"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            Options
          </Link>
          <div
            id="collapsnature"
            className="collapse"
            aria-labelledby="headingUtilities"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Options Details:</h6>
              {type && type == "user" && permissions.includes("partner") ? (
                <>
                  <Link className="collapse-item" to="/nature">
                    Add Nature
                  </Link>
                  <Link className="collapse-item" to="/allnature">
                    All Natures
                  </Link>
                </>
              ) : null}

              {type && type == "user" && permissions.includes("category") ? (
                <>
                  <Link className="collapse-item" to="/category">
                    Add Category
                  </Link>
                  <Link className="collapse-item" to="/allcategory">
                    All Categories
                  </Link>
                </>
              ) : null}

              {type &&
              type == "user" &&
              permissions.includes("projectlibrary") ? (
                <>
                  <Link className="collapse-item" to="/projectlib">
                    Add ProjectForLib
                  </Link>
                  <Link className="collapse-item" to="/allprojectlib">
                    All ProjectsForLib
                  </Link>
                </>
              ) : null}

              {(type && type == "superadmin") || (type && type == "manager") ? (
                <>
                  <Link className="collapse-item" to="/nature">
                    Add Nature
                  </Link>
                  <Link className="collapse-item" to="/allnature">
                    All Natures
                  </Link>
                  <Link className="collapse-item" to="/category">
                    Add Category
                  </Link>
                  <Link className="collapse-item" to="/allcategory">
                    All Categories
                  </Link>
                  <Link className="collapse-item" to="/projectlib">
                    Add ProjectForLib
                  </Link>
                  <Link className="collapse-item" to="/allprojectlib">
                    All ProjectsForLib
                  </Link>

                  {/* <Link className="collapse-item" to="/Currentlyhappen">
                    Currently Happen
                  </Link> */}
                </>
              ) : null}

              {/* <Link className="collapse-item" to="/message">Add Message</Link>
                            <Link className="collapse-item" to="/allmessage">All Messages</Link> */}
              {/* <Link className="collapse-item" to="/partner">Add Partner</Link>
                            <Link className="collapse-item" to="/allpartner">All Partners</Link> */}
            </div>
          </div>
        </li>

        {/* <!-- Divider --> */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/*   <!-- Sidebar Toggler (Sidebar) --> */}

        {/*  <!-- Sidebar Message --> */}
        <div className="sidebar-card d-none d-lg-flex">
          {/* <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." /> */}
          <p className="text-center mb-2">
            <strong>GCISC</strong>
          </p>
          {/* <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a> */}
        </div>
        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={changeStyle}
          ></button>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
