import React, { useEffect, useState } from "react";
import "./css/Dashboard.css";
import Sidebar from "./Sidebar";
import Top from "./Top";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Partners = () => {
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/");
    }
  }, []);
  const nav = useNavigate();
  //   const [name, setName] = useState('');
  //   const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if image is not selected
    if (!image) {
      toast.warning("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/partners/post/partners`,
          formData
        )
        .then((response) => {
          console.log("Data sent successfully", response.data);
        })
        .catch((error) => {
          console.error("Error sending data", error);
        });
    } catch (error) {
      console.error(error);
    }

    toast.success("Partners Added Successfully");
    nav("../allpartner");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   // formData.append('name', name);
  //   // formData.append('description', description);
  //   formData.append("image", image);

  //   try {
  //     await axios
  //       .post(
  //         `${process.env.REACT_APP_API_KEY}/api/partners/post/partners`,
  //         formData
  //       )
  //       .then((response) => {
  //         // toast.success("Category Added Successfully")
  //         console.log("Data sent successfully", response.data);
  //         // window.location.reload();
  //       })
  //       .catch((error) => {
  //         // toast.warning("Category Not Added")
  //         console.error("Error sending data", error);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   toast.success("Partners Added Successfully");
  //   nav("../allpartner");
  // };

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
                  <h1>Add Partner</h1>
                  <hr />
                  <form>
                    <div class="form-group">
                      <label class="from-label" for="image">
                        Image
                      </label>
                      <input
                        type="file"
                        class="form-control"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        required
                      />
                    </div>

                    {/* <div class="form-item">
                                    <label htmlFor="projectTitle">Name</label>
                                    <input type="text" className="form-control" id="projectTitle" name="name"
                                        placeholder="Enter Your Name" value={formData.name} onChange={handleChange}
                                        required />
                                </div> */}
                    {/* 
                                <div class="form-item">
                                    <label htmlFor="shortDescription">Message</label>
                                    <textarea name="message" className="form-control" id="projectTitle" value={formData.message} onChange={handleChange} />
                                </div> */}
                    <br />
                    <input
                      type="button"
                      class="btn btn-primary"
                      value="Add Partner"
                      onClick={handleSubmit}
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
};
export default Partners;
