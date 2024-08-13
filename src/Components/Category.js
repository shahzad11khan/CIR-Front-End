import React, { useEffect, useState } from "react";
import "./css/Dashboard.css";
import Sidebar from "./Sidebar";
import Top from "./Top";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Category() {
  const nav = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/");
    }
  }, []);
  const [categoryname, setcategory] = useState("");
  const [shortdescription, setshortdescription] = useState("");
  const AddCategory = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!categoryname) {
      toast.warning("Please fill in all the fields");
      return;
    }

    const datacate = { categoryname, shortdescription };
    console.log(datacate);

    axios
      .post(
        `${process.env.REACT_APP_API_KEY}/api/category/categories`,
        datacate
      )
      .then((response) => {
        console.log("Data sent successfully", response.data);
        toast.success("Category Added Successfully");
        nav("../allcategory");
      })
      .catch((error) => {
        console.error("Error sending data", error);
        toast.warning("Category Not Added");
      });
  };

  //   const  AddCategory =(e) =>{
  //     e.preventDefault();
  //     const datacate ={categoryname,shortdescription}
  //     console.log(datacate)

  //         axios.post(`${process.env.REACT_APP_API_KEY}/api/category/categories`,datacate)
  //         .then(response => {
  //             // toast.success("Category Added Successfully")
  //             console.log('Data sent successfully', response.data);
  //         })
  //         .catch(error => {
  //             // toast.warning("Category Not Added")
  //             console.error('Error sending data', error);
  //         })
  //         toast.success("Category Added Successfully")
  //         nav('../allcategory')
  //         // window.location.reload();

  //     }

  //

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

                <div
                  className="k"
                  style={{ width: "60%", marginLeft: "20%", marginTop: "5%" }}
                >
                  <h1>Add Category</h1>
                  <hr />
                  <form>
                    <div class="form-item">
                      <label htmlFor="projectTitle">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="projectTitle"
                        name="name"
                        placeholder="Enter project title"
                        onChange={(e) => setcategory(e.target.value)}
                        required
                      />
                    </div>

                    {/* <div class="form-item">
                                            <label htmlFor="shortDescription">Short Description</label>
                                            <input type="text" className="form-control" id="shortDescription" name="shortdescription"
                                                placeholder="Short description" onChange={e => setshortdescription(e.target.value)} required />
                                        </div> */}
                    <br />
                    <input
                      type="button"
                      class="btn btn-primary"
                      value="Add Category"
                      onClick={AddCategory}
                    />
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
        <Logout />
      </body>
    </div>
  );
}

export default Category;
