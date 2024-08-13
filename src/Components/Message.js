import React, { useEffect, useState } from "react";
import "./css/Dashboard.css";
import Sidebar from "./Sidebar";
import Top from "./Top";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Message = () => {
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/");
    }
  }, []);
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };
  const Addmessage = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!formData.name || !formData.message || !formData.image) {
      toast.warning("Please fill in all the fields");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("message", formData.message);
    data.append("image", formData.image);

    console.log(data);

    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_KEY}/api/message/post/message`,
          data,
          { timeout: 1000 }
        )
        .then((response) => {
          console.log("Data sent successfully", response.data);
        })
        .catch((error) => {
          console.error("Error sending data", error);
        });
    } catch (error) {
      console.error("Error uploading data:", error);
    }

    toast.success("Message Added Successfully");
    nav("../allmessage");
  };

  // const Addmessage = async (e) =>{
  //     // alert("this is message")
  //     e.preventDefault();

  //     const data = new FormData();
  //     data.append('name', formData.name);
  //     data.append('message', formData.message);
  //     data.append('image', formData.image);
  //     console.log(data)
  //     try {
  //       await axios.post(`${process.env.REACT_APP_API_KEY}/api/message/post/message`, data , {timeout:1000})
  //       // Handle success, maybe redirect or update state
  //       .then(response => {
  //         // toast.success("Category Added Successfully")
  //         console.log('Data sent successfully', response.data);
  //         // window.location.reload();
  //     })
  //     .catch(error => {
  //         // toast.warning("Category Not Added")
  //         console.error('Error sending data', error);
  //     })
  //     } catch (error) {
  //       // Handle error
  //       console.error('Error uploading data:', error);
  //     }
  //     toast.success("Message Added Successfully")
  //     nav('../allmessage')
  // }
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
                  <h1>Add Message</h1>
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

                    <div class="form-item">
                      <label htmlFor="projectTitle">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="projectTitle"
                        name="name"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div class="form-item">
                      <label htmlFor="shortDescription">Message</label>
                      <textarea
                        name="message"
                        className="form-control"
                        id="projectTitle"
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                    <br />
                    <input
                      type="button"
                      class="btn btn-primary"
                      value="Add Message"
                      onClick={Addmessage}
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

export default Message;
