import React, { useEffect, useState } from "react";
import "./css/Dashboard.css";
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Top from "./Top";
import axios from "axios";
import Logout from "./Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Nature() {
  const nav = useNavigate();
  //
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/");
    }
  }, []);
  const [categoryname, setNature] = useState("");
  const [shortdescription, setshortdescription] = useState("");
  const Addnature = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!categoryname) {
      toast.warning("Please fill in all the fields");
      return;
    }

    const datacate = { categoryname, shortdescription };
    console.log(datacate);

    axios
      .post(`${process.env.REACT_APP_API_KEY}/api/nature/natures`, datacate)
      .then((response) => {
        console.log("Data sent successfully", response.data);
        toast.success("Add Nature Successfully");
        nav("../allnature");
      })
      .catch((error) => {
        toast.warning("Nature Not Added");
        console.error("Error sending data", error);
      });
  };

  //   const  Addnature =(e) =>{
  //     e.preventDefault();
  //     const datacate ={categoryname,shortdescription}
  //     console.log(datacate)

  //         axios.post(`${process.env.REACT_APP_API_KEY}/api/nature/natures`,datacate)
  //         .then(response => {
  //             console.log('Data sent successfully', response.data);
  //             toast.success("Add Nature Successfully")
  //             nav('../allnature')
  //         })
  //         .catch(error => {
  //             toast.warning("Nature Not Added")
  //             console.error('Error sending data', error);

  //         })

  //     }

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
                  <h1>Add Nature</h1>
                  <form>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Add New Nature
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name="name"
                        onChange={(e) => setNature(e.target.value)}
                        required
                      />
                      {/* <div id="emailHelp" class="form-text">Add New Nature Which You Want To Show</div> */}
                    </div>
                    {/* <div class="mb-3">
                                            <label for="exampleInputEmail1" class="form-label">Add Nature Description</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='shortdescription' onChange={e=>setshortdescription(e.target.value)} required />
                                         </div> */}
                    <input
                      type="button"
                      class="btn btn-primary"
                      value="Add Naute"
                      onClick={Addnature}
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

export default Nature;
