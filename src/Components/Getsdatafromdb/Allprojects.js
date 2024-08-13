import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import Sidebar from "../Sidebar";
import Top from "../Top";
import "../css/style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import "../css/joditeditor.css";
import "../css/tdbreak.css";

function Allprojects() {
  const [users, setUsers] = useState([]);
  const type = localStorage.getItem("type");

  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sortByTitle, setSortByTitle] = useState(false);
  const [sortByNumber, setSortByNumber] = useState(false);

  const itemsPerPage = 10;

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleSortByTitle = () => {
    if (!sortByTitle) {
      setSortByTitle(true);
    } else {
      setSortByTitle(false);
    }
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

  const nav = useNavigate();

  function getprojects() {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/project/getuploadedallfiles`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }

  useEffect(() => {
    getprojects();
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/");
    }
  }, []);

  const Deletehandler = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/project/deleteuploadedfile/` + id,
        { timeout: 1000 }
      );
      console.log("project deleted");
    } catch (err) {
      console.log(err);
    }
    toast.success("Project deleted");

    getprojects();
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
                    <table className="table">
                      <thead>
                        <tr>
                          <td style={{ textAlign: "center" }} colSpan={3}>
                            Search Project
                          </td>
                          <td colSpan={4}>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Search items"
                              value={searchInput}
                              onChange={handleSearchChange}
                            />
                          </td>
                        </tr>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Project Title</th>
                          <th scope="col">Project Image</th>
                          <th scope="col">Short Desc</th>
                          <th scope="col">Long Desc</th>
                          <th scope="col">Approve/Not Approve</th>
                          <th scope="col">On Top</th>
                          {type && type === "user" ? (
                            ""
                          ) : (
                            <th scope="col">Actions</th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {displayedItems.map((user, index) => (
                          <tr key={index} className="rowheight">
                            <th scope="row">{index + 1}</th>
                            <td className="break">{user.title}</td>
                            <td>
                              <img
                                src={`${process.env.REACT_APP_API_KEY}/projects/images/${user.image}`}
                                alt="Project Image"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </td>
                            <td className="break">
                              <div className="scrollable-column">
                                {/* {user.longDescription} */}
                                {user.shortDescription}
                              </div>
                            </td>
                            <td className="long">
                              <div className="scrollable-column">
                                {user.longDescription}
                              </div>
                            </td>
                            <td>
                              {user.approve === "1" ? "approve" : "not approve"}
                            </td>
                            <td>
                              {user.check === "true" ? "check" : "uncheck"}
                            </td>
                            {type && type === "user" ? (
                              ""
                            ) : (
                              <td>
                                <Link
                                  to={`/Updates/updateproject/${user._id}`}
                                  className="btn btn-primary"
                                >
                                  Edit Record
                                </Link>
                                <input
                                  type="button"
                                  value="Delete"
                                  className="btn btn-danger"
                                  onClick={() => Deletehandler(user._id)}
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
                        Previous
                      </button>
                    }
                    nextLabel={
                      <button className="btn btn-outline-primary">Next</button>
                    }
                    breakLabel={"..."}
                    pageCount={`${totalPages}`}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination justify-content-center"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                  />
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
      </body>
    </div>
  );
}

export default Allprojects;
