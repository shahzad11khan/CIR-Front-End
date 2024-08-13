import React from "react";
import "./css/Dashboard.css";
import Sidebar from "./Sidebar";
import Top from "./Top";
import "./css/style.css";
import Logout from "./Logout";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Superadmin = () => {
  // const nav = useNavigate();
  const [user, setuser] = useState([]);
  const [Act, setAct] = useState([]);
  const [Cal, setCal] = useState([]);
  const [Pro, setPro] = useState([]);
  const [News, setNews] = useState([]);
  const [Email, setemial] = useState([]);

  const approve = "1";

  useEffect(() => {
    Libraryy();
    Activity();
    ApproveCalendar();
    ApproveProjects();
    ApproveNews();
    ApproveEmail();
  }, []);

  function Libraryy() {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/libraryItem/getalllibrary`)
      .then((response) => {
        // console.log(response.data);
        setuser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  const ApproveHandler = async (id) => {
    console.log(id);
    const formData = new FormData();

    formData.append("approve", approve);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/api/libraryItem/updatelibrary/` + id,
        formData
      );
      console.log("updated library");
    } catch (err) {
      console.log(err);
    }
    // nav('../alllibrary')
    // window.location.reload();
    Libraryy();
  };

  const Deletehandler = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/libraryItem/deletelibrary/` + id
      );
      console.log("libarary deleted");
    } catch (err) {
      console.log(err);
    }
    console.log("conform libarary deleted");
    // window.location.reload();
    Libraryy();
  };

  const ApproveAll = async () => {
    console.log("approve all");
    try {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/api/libraryItem/update-all`
      );

      console.log("updated library");
      // nav('../alllibrary')
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    console.log("updated library");
    Libraryy();
  };

  // for activities
  function Activity() {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/activites/getuploadedallfiles`)
      .then((response) => {
        console.log(response.data);
        setAct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }
  // For Emails
  function ApproveEmail() {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/emails/emails`)
      .then((response) => {
        console.log("Emails", response.data);
        setemial(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }
  // /library/images/
  const approveEmail = async (iddd) => {
    console.log(iddd);
    const formData = new FormData();

    formData.append("approve", approve);
    const approval = "1";
    try {
      await axios
        .put(`${process.env.REACT_APP_API_KEY}/api/emails/emails/` + iddd, {
          approval: approval,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      console.log("Email approve");
      // window.location.reload();
      ApproveEmail();
    } catch (err) {
      console.log(err);
    }
  };
  // All email approves
  const approveAllEmails = async () => {
    console.log("approve all");
    try {
      await axios.put(`${process.env.REACT_APP_API_KEY}/api/emails/update-all`);

      console.log("updated all Emails");
    } catch (err) {
      console.log(err);
    }
    console.log("updated Emails");
    // window.location.reload();
    ApproveEmail();
  };

  // delete email
  const DeleteEmail = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/emails/emails/` + id
      );
      console.log("Email deleted");
    } catch (err) {
      console.log(err);
    }
    console.log("conform Email deleted");
    // window.location.reload();
    ApproveEmail();
  };

  const ApproveActivityHandler = async (id) => {
    console.log(id);
    const formData = new FormData();

    formData.append("approve", approve);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/api/activites/updateactivity/` + id,
        formData
      );
      console.log("updated Activity");
    } catch (err) {
      console.log(err);
    }
    // nav('../allactivity')
    // window.location.reload();
    Activity();
  };

  const Deleteactivityhandler = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/activites/deleteuploadedfile/` +
          id
      );
      console.log("Activity deleted");
    } catch (err) {
      console.log(err);
    }
    console.log("conform Activity deleted");
    // window.location.reload();
    Activity();
  };

  const ApproveAllActivity = async () => {
    console.log("approve all");
    try {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/api/activites/update-all`
      );

      console.log("updated all activities");
    } catch (err) {
      console.log(err);
    }
    console.log("updated activities");
    // nav('../allactivity')
    // window.location.reload();
    Activity();
  };

  // for calendar
  const ApproveCalendar = async () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/calender/getallcalender`)
      .then((response) => {
        setCal(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  const ApproveCalendarHandler = async (cid) => {
    try {
      await axios
        .put(
          `${process.env.REACT_APP_API_KEY}/api/calender/put/update/` + cid,
          { approve: approve }
        )
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

      console.log("updated Calendar");
      // window.location.reload();
      ApproveCalendar();
    } catch (err) {
      console.log(err);
    }
    // ApproveCalendar();
    ApproveCalendar();
  };

  const DeleteCalendarhandler = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/calender/deletecalender/` + id
      );
      console.log("Calendar deleted");
    } catch (err) {
      console.log(err);
    }
    console.log("conform Activity deleted");
    // window.location.reload();
    ApproveCalendar();
  };

  const ApproveAllCalendar = async () => {
    console.log("approve all");
    try {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/api/calender/update-all`
      );

      console.log("updated all Calender");
    } catch (err) {
      console.log(err);
    }
    console.log("updated Calender");
    // window.location.reload();
    ApproveCalendar();
    // nav('../allcalender')
  };

  // for projects
  const ApproveProjects = async () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/project/getuploadedallfiles`)
      .then((response) => {
        setPro(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  const ApproveProjectHandler = async (id) => {
    console.log(id);
    const formData = new FormData();

    formData.append("approve", approve);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/api/project/updateproject/` + id,
        formData
      );
      console.log("updated Project");
      // nav('../allproject')
    } catch (err) {
      console.log(err);
    }
    // window.location.reload();
    ApproveProjects();
  };
  const DeleteProjecthandler = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/project/deleteuploadedfile/` + id
      );
      console.log("Project deleted");
    } catch (err) {
      console.log(err);
    }
    console.log("conform project deleted");
    // window.location.reload();
    ApproveProjects();
  };
  const ApproveAllProjects = async () => {
    console.log("approve all");
    try {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/api/project/update-all`
      );
      console.log("updated all Projects");
    } catch (err) {
      console.log(err);
    }
    console.log("updated Calender");
    // nav('../allproject')
    // window.location.reload();
    ApproveProjects();
  };

  // for news
  const ApproveNews = async () => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/news/getuploadedallnews`)
      .then((response) => {
        setNews(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  const ApproveNewsHandler = async (id) => {
    console.log(id);
    const formData = new FormData();

    formData.append("approve", approve);
    try {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/api/news/updatenew/` + id,
        formData
      );
      console.log("updated News");
      // nav('../allnews')
    } catch (err) {
      console.log(err);
    }
    // window.location.reload();
    ApproveNews();
  };
  const DeleteNewshandler = async (id) => {
    console.log(id);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/news/deleteuploadednews/` + id
      );
      console.log("News deleted");
    } catch (err) {
      console.log(err);
    }
    console.log("conform News deleted");
    // window.location.reload();
    ApproveNews();
  };
  const ApproveAllNews = async () => {
    console.log("approve all");
    try {
      await axios.put(`${process.env.REACT_APP_API_KEY}/api/news/update-all`);
      console.log("updated all news");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    console.log("updated News");
    // nav('../allnews')
    ApproveNews();
  };
  return (
    <div>
      <body id="page-top">
        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Top />
              {/*  <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fulid">
                {/* Email approvals  */}
                <div className="k">
                  <table class="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          Emails Not Approval List
                        </td>
                        <td>
                          {/* <input
                            class="form-control"
                            type="text"
                            placeholder="Search items"
                            value={searchInput}
                            onChange={handleSearchChange}
                          /> */}
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">File Name</th>
                        <th scope="col">Approve</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Email.map((i, index) => {
                        if (i.approval === "0") {
                          console.log(i);
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{i.name}</td>
                              <td>{i.email}</td>
                              {/* <td>{i.category}</td> */}
                              <td>
                                {/* <a href={`/library/images/` + i.file}> */}
                                {i.file}
                                {/* </a> */}
                              </td>
                              <td>{i.approval ? "No" : "Yes"}</td>
                              <td>
                                {/* <Link to={`/Updates/Updatedbysuperadmin/${i._id}`} className='btn btn-primary'>Update Record</Link> */}
                                <Link
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  className="btn btn-info"
                                  onClick={(e) => approveEmail(i._id)}
                                >
                                  Approve Record
                                </Link>
                                <input
                                  type="button"
                                  value="Delete"
                                  className="btn btn-danger"
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  onClick={(e) => DeleteEmail(i._id)}
                                />
                              </td>
                            </tr>
                          );
                        }
                      })}
                      <tr>
                        <label>Emails Approves</label>
                        <input
                          type="button"
                          value="Approve All"
                          className="btn btn-info"
                          style={{ marginLeft: "10px", marginTop: "3px" }}
                          onClick={approveAllEmails}
                        />
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end of email approvals */}
                <div className="k">
                  <table class="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          library Not Approval List
                        </td>
                        <td>
                          {/* <input
                            class="form-control"
                            type="text"
                            placeholder="Search items"
                            value={searchInput}
                            onChange={handleSearchChange}
                          /> */}
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Short Desc</th>
                        <th scope="col">Category</th>
                        <th scope="col">Nature</th>
                        <th scope="col">Project Name</th>
                        <th scope="col">Private / Public</th>
                        <th scope="col">Image</th>
                        <th scope="col">File</th>
                        <th scope="col">Long Desc</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.map((i, index) => {
                        if (i.approve === "0") {
                          console.log(i);
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{i.title}</td>
                              <td>{i.shortDescription}</td>
                              <td>{i.category}</td>
                              <td>{i.nature}</td>
                              <td>{i.project}</td>
                              <td>{i.credentials}</td>
                              <td>
                                <img
                                  src={
                                    `${process.env.REACT_APP_API_KEY}/library/images/` +
                                    i.image
                                  }
                                  style={{ width: "50px", height: "50px" }}
                                  alt={i.image}
                                />
                              </td>
                              <td>
                                <a href={`/library/images/` + i.file}>
                                  {i.file}
                                </a>
                              </td>
                              <td>{i.longDescription}</td>
                              <td>
                                {/* <Link to={`/Updates/Updatedbysuperadmin/${i._id}`} className='btn btn-primary'>Update Record</Link> */}
                                <Link
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  className="btn btn-info"
                                  onClick={(e) => ApproveHandler(i._id)}
                                >
                                  Approve Record
                                </Link>
                                <input
                                  type="button"
                                  value="Delete"
                                  className="btn btn-danger"
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  onClick={(e) => Deletehandler(i._id)}
                                />
                              </td>
                            </tr>
                          );
                        }
                      })}
                      <tr>
                        <label>Repository Approves</label>
                        <input
                          type="button"
                          value="Approve All"
                          className="btn btn-info"
                          style={{ marginLeft: "10px", marginTop: "3px" }}
                          onClick={ApproveAll}
                        />
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*   <!-- /.container- Activity -fluid --> */}
                <div className="k">
                  <table class="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          Activity Not Approval List
                        </td>
                        <td>
                          {/* <input
                            class="form-control"
                            type="text"
                            placeholder="Search items"
                            value={searchInput}
                            onChange={handleSearchChange}
                          /> */}
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Image</th>
                        <th scope="col">Long Desc</th>
                        <th scope="col">Short Desc</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Act.map((i, index) => {
                        if (i.approve === "0") {
                          console.log(i);
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{i.title}</td>
                              <td>
                                <img
                                  src={
                                    `${process.env.REACT_APP_API_KEY}/activities/images/` +
                                    i.image
                                  }
                                  style={{ width: "50px", height: "50px" }}
                                  alt={i.image}
                                />
                              </td>
                              <td>{i.longDescription}</td>
                              <td>{i.shortDescription}</td>

                              <td>
                                {/* <Link to={`/Updates/Updatedbysuperadmin/${i._id}`} className='btn btn-primary'>Update Record</Link> */}
                                <Link
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  className="btn btn-info"
                                  onClick={(e) => ApproveActivityHandler(i._id)}
                                >
                                  Approve Record
                                </Link>
                                <input
                                  type="button"
                                  value="Delete"
                                  className="btn btn-danger"
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  onClick={(e) => Deleteactivityhandler(i._id)}
                                />
                              </td>
                            </tr>
                          );
                        }
                      })}
                      <tr>
                        <label>Activities Approves</label>
                        <input
                          type="button"
                          value="Approve All"
                          className="btn btn-info"
                          style={{ marginLeft: "10px", marginTop: "3px" }}
                          onClick={ApproveAllActivity}
                        />
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*   <!-- /.container-Calender-fluid --> */}
                <div className="k">
                  <table class="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          Calendar Not Approval List
                        </td>
                        <td>
                          {/* <input
                            class="form-control"
                            type="text"
                            placeholder="Search items"
                            value={searchInput}
                            onChange={handleSearchChange}
                          /> */}
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Dates</th>
                        <th scope="col">Short Desc</th>
                        <th scope="col">Countries</th>
                        <th scope="col">Cities</th>
                        <th scope="col">Long Desc</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Cal.map((i, index) => {
                        if (i.approve === "0") {
                          console.log(i);
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{i.date}</td>
                              <td>{i.description}</td>
                              <td>{i.country}</td>
                              <td>{i.city}</td>
                              <td>{i.longDescription}</td>

                              <td>
                                {/* <Link to={`/Updates/Updatedbysuperadmin/${i._id}`} className='btn btn-primary'>Update Record</Link> */}
                                <Link
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  className="btn btn-info"
                                  onClick={(e) => ApproveCalendarHandler(i._id)}
                                >
                                  Approve Record
                                </Link>
                                <input
                                  type="button"
                                  value="Delete"
                                  className="btn btn-danger"
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  onClick={(e) => DeleteCalendarhandler(i._id)}
                                />
                              </td>
                            </tr>
                          );
                        }
                      })}
                      <tr>
                        <label>Calendar Approves</label>
                        <input
                          type="button"
                          value="Approve All"
                          className="btn btn-info"
                          style={{ marginLeft: "10px", marginTop: "3px" }}
                          onClick={ApproveAllCalendar}
                        />
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*   <!-- /.container-Projects-fluid --> */}
                <div className="k">
                  <table class="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          Projects Not Approval List
                        </td>
                        <td>
                          {/* <input
                            class="form-control"
                            type="text"
                            placeholder="Search items"
                            value={searchInput}
                            onChange={handleSearchChange}
                          /> */}
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Pro Titles</th>
                        <th scope="col">Pro Image</th>
                        <th scope="col">Short Desc</th>
                        <th scope="col">Long Desc</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Pro.map((i, index) => {
                        if (i.approve === "0") {
                          console.log(i);
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{i.title}</td>
                              <img
                                src={
                                  `${process.env.REACT_APP_API_KEY}/projects/images/` +
                                  i.image
                                }
                                style={{ width: "50px", height: "50px" }}
                              />
                              <td>{i.shortDescription}</td>
                              <td>{i.longDescription}</td>
                              <td>
                                {/* <Link to={`/Updates/Updatedbysuperadmin/${i._id}`} className='btn btn-primary'>Update Record</Link> */}
                                <Link
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  className="btn btn-info"
                                  onClick={(e) => ApproveProjectHandler(i._id)}
                                >
                                  Approve Record
                                </Link>
                                <input
                                  type="button"
                                  value="Delete"
                                  className="btn btn-danger"
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  onClick={(e) => DeleteProjecthandler(i._id)}
                                />
                              </td>
                            </tr>
                          );
                        }
                      })}
                      <tr>
                        <label>Projects Approves</label>
                        <input
                          type="button"
                          value="Approve All"
                          className="btn btn-info"
                          style={{ marginLeft: "10px", marginTop: "3px" }}
                          onClick={ApproveAllProjects}
                        />
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*   <!-- /.container-News-fluid --> */}
                <div className="k">
                  <table class="table">
                    <thead>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          News Not Approval List
                        </td>
                        <td>
                          {/* <input
                            class="form-control"
                            type="text"
                            placeholder="Search items"
                            value={searchInput}
                            onChange={handleSearchChange}
                          /> */}
                        </td>
                      </tr>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Titles</th>
                        <th scope="col">Image</th>
                        <th scope="col">Short Desc</th>
                        <th scope="col">Long Desc</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {News.map((i, index) => {
                        if (i.approve === "0") {
                          console.log(i);
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{i.title}</td>
                              <img
                                src={
                                  `${process.env.REACT_APP_API_KEY}/news/images/` +
                                  i.image
                                }
                                style={{ width: "50px", height: "50px" }}
                              />
                              <td>{i.shortDescription}</td>
                              <td>{i.longDescription}</td>
                              <td>
                                {/* <Link to={`/Updates/Updatedbysuperadmin/${i._id}`} className='btn btn-primary'>Update Record</Link> */}
                                <Link
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  className="btn btn-info"
                                  onClick={(e) => ApproveNewsHandler(i._id)}
                                >
                                  Approve Record
                                </Link>
                                <input
                                  type="button"
                                  value="Delete"
                                  className="btn btn-danger"
                                  style={{
                                    marginLeft: "10px",
                                    marginTop: "3px",
                                  }}
                                  onClick={(e) => DeleteNewshandler(i._id)}
                                />
                              </td>
                            </tr>
                          );
                        }
                      })}
                      <tr>
                        <label>News Approves</label>
                        <input
                          type="button"
                          value="Approve All"
                          className="btn btn-info"
                          style={{ marginLeft: "10px", marginTop: "3px" }}
                          onClick={ApproveAllNews}
                        />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/*   <!-- End of Main Content -->

                                <!-- Footer --> */}
            <footer className="sticky-footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto">
                  {/* <span>Copyright &copy; Your Website 2021</span> */}
                  <span>Powered by Arure Technologies</span>
                </div>
              </div>
            </footer>
            {/* <!-- End of Footer --> */}
          </div>
          {/*  <!-- End of Content Wrapper --> */}
        </div>
        {/*  <!-- End of Page Wrapper -->

                        <!-- Scroll to Top Button--> */}
        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>

        {/*  <!-- Logout Modal--> */}
        <Logout />
      </body>
    </div>
  );
};

export default Superadmin;
