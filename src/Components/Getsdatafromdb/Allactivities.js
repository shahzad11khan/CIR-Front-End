import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import "../css/tdbreak.css";
import Sidebar from "../Sidebar";
import Top from "../Top";
import "../css/style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "../css/joditeditor.css";

function Allactivities() {
  const type = localStorage.getItem("type");

  const nav = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/");
    }
  }, []);
  const [users, setUsers] = useState([]);
  const [smg, setmsg] = useState(false);
  //
  //
  const itemsPerPage = 10;
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortByTitle, setSortByTitle] = useState(false);
  const [sortByNumber, setSortByNumber] = useState(false);
  //

  const handleSortByTitle = () => {
    setSortByTitle(true);
    setSortByNumber(false);
  };

  const handleSortByNumber = () => {
    setSortByTitle(false);
    setSortByNumber(true);
  };

  const sortedData = [...users].sort((a, b) => {
    if (sortByTitle) {
      // Check if both titles contain digits or numerics
      const isANumeric = /\d/.test(a.title);
      const isBNumeric = /\d/.test(b.title);

      // If both are alphanumeric or both are purely alphabetic, sort alphabetically
      if ((isANumeric && isBNumeric) || (!isANumeric && !isBNumeric)) {
        return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1;
      }
      // If 'a' contains digits or numerics, it should come after 'b'
      return isANumeric ? 1 : -1;
    } else if (sortByNumber) {
      // Assuming there's a field called 'projectNumber' for sorting by project number
      return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    }
    return 0;
  });
  //
  const filteredData = sortedData.filter(
    (user) =>
      user.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      (user.approve === "1"
        ? "approve"
        : user.approve === "0"
        ? "not approve"
        : ""
      )
        .toLowerCase()
        .includes(searchInput.toLowerCase()) ||
      user.shortDescription.toLowerCase().includes(searchInput.toLowerCase()) ||
      (user.check === "true" ? "check" : "uncheck")
        .toLowerCase()
        .includes(searchInput.toLowerCase())
  );
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = filteredData.slice(startIndex, endIndex);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  //
  //
  // activity Api
  function activitydata() {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/activites/getuploadedallfiles`)
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  useEffect(() => {
    activitydata();
    //
    // Function to be executed every second
  }, []);

  const Deletehandler = async (id) => {
    console.log(id);

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/activites/deleteuploadedfile/` +
          id,
        { timeout: 1000 }
      );
      console.log("Activity deleted");
    } catch (err) {
      console.log(err);
      console.log(err);
      console.log("Error deleting activity");
      // toast.error("Error deleting activity");
    }
    toast.success("Activity deleted");
    console.log("Activity deleted");
    activitydata();
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

                <div className="k">
                  <div className="sorting-buttons">
                    <button onClick={handleSortByTitle}>
                      Sort by Title
                      <span>{/* Icon for A to Z // a to z */}</span>
                    </button>
                    <button onClick={handleSortByNumber}>
                      Sort by Number
                      <span>{/* Icon for 1 to 100 // 100 to 1 */}</span>
                    </button>
                  </div>
                  <div className="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <td style={{ textAlign: "center" }} colSpan={3}>
                            Search Activity Item
                          </td>
                          <td colSpan={4}>
                            <input
                              class="form-control"
                              type="text"
                              placeholder="Search items"
                              value={searchInput}
                              onChange={handleSearchChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Activity Title</th>
                          <th scope="col">Activity Image</th>
                          <th scope="col">Long Desc</th>
                          <th scope="col">Short Desc</th>
                          <th scope="col">Approve/Not Approve</th>
                          <th scope="col">On Top</th>
                          {type && type == "user" ? (
                            ""
                          ) : (
                            <th scope="col">Actions</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {displayedItems.map((user, index) => (
                          <tr>
                            <th scope="row">{index + 1}</th>
                            <td className="break">{user.title}</td>
                            <td>
                              <img
                                src={
                                  `${process.env.REACT_APP_API_KEY}/activities/images/` +
                                  user.image
                                }
                                style={{ width: "50px", height: "50px" }}
                                alt={user.image}
                              />
                            </td>
                            <td className="break">{user.longDescription}</td>
                            <td className="break">{user.shortDescription}</td>
                            <td>
                              {user.approve == "1" ? "approve" : "not approve"}
                            </td>
                            <td>
                              {user.check == "true" ? "check" : "uncheck"}
                            </td>

                            {type && type == "user" ? (
                              ""
                            ) : (
                              <td>
                                <Link
                                  to={`/Updates/Updateactivity/${user._id}`}
                                  className="btn btn-primary"
                                >
                                  Edit Record
                                </Link>
                                <input
                                  type="button"
                                  value="Delete"
                                  className="btn btn-danger"
                                  onClick={(e) => Deletehandler(user._id)}
                                  style={{ marginLeft: "10px" }}
                                />
                              </td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* paginator */}
                  <ReactPaginate
                    previousLabel={
                      <button className="btn btn-outline-primary">
                        'Previous'
                      </button>
                    }
                    nextLabel={
                      <button className="btn btn-outline-primary">
                        'Next'
                      </button>
                    }
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination justify-content-center"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />

                  {/* end paginator */}
                </div>
                {/* end of the contents */}
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
}

export default Allactivities;
