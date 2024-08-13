import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import "../css/Register.css";
import Sidebar from "../Sidebar";
import Top from "../Top";
import "../css/style.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Updateuser = () => {
  const { id } = useParams();
  const nav = useNavigate();

  //get data
  const [getuser, setgetuser] = useState();
  const [getuseremail, setgetuseremail] = useState();
  const [getuserpassword, setgetuserpassword] = useState();
  const [getuserselect, setgetuserselect] = useState();
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/users/specificuser/` + id)
      .then((response) => {
        // setgetuser(response.data._id)
        console.log(response.data);
        setgetuser(response.data.username);
        setgetuseremail(response.data.email);
        setgetuserpassword(response.data.confrompassword);
        setgetuserselect(response.data.usertype);
        setSelectedPermissions(response.data.permissions);
        // console.log(response.data.usertype);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  //
  //
  // get specific user data

  //
  const handleCheckboxChange = (permission) => {
    // Toggle the selected permission
    if (selectedPermissions.includes(permission)) {
      setSelectedPermissions(
        selectedPermissions.filter((item) => item !== permission)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };
  //
  const Updateuser = async (e) => {
    e.preventDefault();
    console.log(
      getuser,
      getuseremail,
      getuserpassword,
      getuserselect,
      selectedPermissions
    );
    const values = {
      getuser,
      getuseremail,
      getuserpassword,
      getuserselect,
      selectedPermissions,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/users/update/` + id,
        values
      );
      console.log("updated user");
      nav("../alluser");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <body id="page-top">
        {/*  <!-- Page Wrapper --> */}
        <div id="wrapper">
          {/*  <!-- Sidebar --> */}
          <Sidebar />
          {/*  <!-- End of Sidebar --> */}

          {/*  <!-- Content Wrapper --> */}
          <div id="content-wrapper" className="d-flex flex-column">
            {/*  <!-- Main Content --> */}
            <div id="content">
              {/*  <!-- Topbar --> */}
              <Top />
              {/*  <!-- End of Topbar --> */}

              {/* <!-- Begin Page Content --> */}
              <div className="container-fluid">
                {/* main contents */}
                <div className="khan" style={{ width: "70%", marginTop: "2%" }}>
                  <h2 class="my-title">update User</h2>
                  <hr />
                  <form id="RegistranFrom">
                    <div class="Register_from-item">
                      <label htmlFor="UserName">UserName</label>
                      <input
                        type="text"
                        class="form-control"
                        value={getuser}
                        id="username"
                        placeholder="Enter UserName"
                        onChange={(e) => setgetuser(e.target.value)}
                      />
                    </div>
                    <div class="Register_from-item">
                      <label htmlFor="Email">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        value={getuseremail}
                        id="email"
                        placeholder="Enter Email"
                        onChange={(e) => setgetuseremail(e.target.value)}
                      />
                    </div>
                    <div class="Register_from-item">
                      <label htmlFor="Password" style={{ display: "flex" }}>
                        Password
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        name="password"
                        value={getuserpassword}
                        id="password"
                        placeholder="Enter Password"
                        onChange={(e) => setgetuserpassword(e.target.value)}
                      />
                      <br />
                      <span style={{ fontSize: "15px", color: "red" }}>
                        Rewrite the password
                      </span>
                    </div>
                    <div class="Register_from-item">
                      <label htmlFor="usertype">User Type</label>
                      <br />
                      <select
                        class="form-control"
                        value={getuserselect}
                        onChange={(e) => setgetuserselect(e.target.value)}
                      >
                        <option selected>Select</option>
                        <option value="manager">Manager</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                    <div className="Register_from-item">
                      <label>Permissions</label>
                      <br />
                      {/* Your existing checkbox logic */}
                      {[
                        "user",
                        "projects",
                        "activity",
                        "news",
                        "library",
                        "calendar",
                        "message",
                        "partner",
                        "category",
                        "nature",
                        "projectlibrary",
                      ].map((permission) => (
                        <label key={permission}>
                          <input
                            type="checkbox"
                            value={permission}
                            checked={selectedPermissions.includes(permission)}
                            onChange={(e) => handleCheckboxChange(permission)}
                          />
                          {" " +
                            permission.charAt(0).toUpperCase() +
                            permission.slice(1) +
                            "    "}
                        </label>
                      ))}
                    </div>
                    <br />
                    <hr />
                    <div class="Register_from-item">
                      <input
                        type="button"
                        class="btn btn-primary form-control"
                        value="Update Account"
                        onClick={Updateuser}
                      />
                    </div>
                  </form>
                </div>

                {/* end of main contents */}
              </div>
              {/*   <!-- /.container-fluid --> */}
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
        <div
          className="modal fade"
          id="logoutModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="login.html">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};
export default Updateuser;
