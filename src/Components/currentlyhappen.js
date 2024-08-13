import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Dashboard.css";
import Sidebar from "./Sidebar";
import "./css/style.css";
import Top from "./Top";
import axios from "axios";
import Logout from "./Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { useRef } from "react";

function News() {
  //
  const editor = useRef(null);
  const nav = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/");
    }
  }, []);
  const [date, setdate] = useState();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [image, setImageUpload] = useState(null);
  const [longDescription, setLongDescription] = useState("");

  const [metatitle, setmetaTitle] = useState("");
  const [metashortdescription, setmetaShortDescription] = useState("");
  const [metaimageupload, setmetaImageUpload] = useState(null);
  const [metalongdescription, setmetaLongDescription] = useState("");
  const [check, setIsChecked] = useState("");
  const approve = "0";

  const handleCheckboxChange = () => {
    setIsChecked(!check); // Toggle the state
  };

  const Adduser = async (e) => {
    e.preventDefault();
    try {
      const fields = [
        { name: "date", message: "Select Date" },
        { name: "title", message: "Enter Title" },
        { name: "shortDescription", message: "Enter Short Description" },
        { name: "image", message: "Select Image" },
        { name: "longDescription", message: "Enter Long Description" },
      ];

      // Check if any required fields are empty
      const errors = fields.filter((field) => !eval(field.name));
      if (errors.length > 0) {
        errors.forEach((error) => toast.warning(error.message));
        return;
      }

      const formData = new FormData();
      formData.append("date", date);
      formData.append("title", title);
      formData.append("shortDescription", shortDescription);
      formData.append("image", image);
      formData.append("longDescription", longDescription);
      formData.append("check", check);
      formData.append("approve", approve);

      // Send the POST request to the server
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/currently/addcurrentlyhappen`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Handle the response
      if (response.status === 201) {
        console.log("Data sent successfully", response.data);
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error sending data", error);
      toast.error("Failed to add News");
    }
    toast.success("Currently added successfully");
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
                <div className="K" style={{ width: "70%", marginLeft: "10%" }}>
                  <h1>Add Currently Happening</h1>
                  <hr />

                  {/* Project form */}
                  <form id="Add-project-from">
                    <div class="form-item">
                      <label htmlFor="date">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="projectTitle"
                        name="date"
                        dateFormat="MM/dd/yyyy"
                        placeholder="select date"
                        onChange={(e) => setdate(e.target.value)}
                        required
                      />
                    </div>
                    <div class="form-item">
                      <label htmlFor="projectTitle">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="projectTitle"
                        name="Title"
                        placeholder="Enter project title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div class="form-item">
                      <label htmlFor="shortDescription">
                        Short Description
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="shortDescription"
                        name="shortDescription"
                        placeholder="Short description"
                        onChange={(e) => setShortDescription(e.target.value)}
                        required
                      />
                    </div>

                    <div class="from-item">
                      <label htmlFor="projectImage">Image Upload</label>
                      <input
                        type="file"
                        className="form-control form-control-file"
                        id="projectImage"
                        name="Image"
                        accept="image/*"
                        onChange={(e) => setImageUpload(e.target.files[0])}
                        required
                      />
                    </div>

                    <div class="form-group">
                      <label class="from-label" for="longDescription">
                        Long Description:
                      </label>
                      <br />
                      <br></br>

                      <JoditEditor
                        ref={editor}
                        value={longDescription}
                        tabIndex={1} // tabIndex of textarea
                        // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        onChange={(desciption) =>
                          setLongDescription(desciption)
                        }
                      />
                    </div>

                    {/* Hidden feilds for meta data */}
                    <div id="metadata">
                      <input
                        type="text"
                        id="metaTitle"
                        name="metatitle"
                        onChange={(e) => setmetaTitle(e.target.value)}
                        hidden
                      />
                      <input
                        type="text"
                        id="metaShortDescription"
                        name="metashortdescription"
                        onChange={(e) =>
                          setmetaShortDescription(e.target.value)
                        }
                        hidden
                      />
                      <input
                        type="file"
                        id="metaImage"
                        name="metaimage"
                        onChange={(e) => setmetaImageUpload(e.target.files[0])}
                        hidden
                      />
                      <input
                        type="text"
                        id="metaLongDescription"
                        name="metalongdescription"
                        onChange={(e) => setmetaLongDescription(e.target.value)}
                        hidden
                      />
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="check"
                        checked={check}
                        onChange={handleCheckboxChange}
                        id="flexCheckDefault"
                      />
                      To Be Featured
                    </div>

                    <div class="from-item">
                      <button
                        type="submit"
                        className="btn btn-primary form-control"
                        onClick={Adduser}
                      >
                        {" "}
                        Add Currently
                      </button>
                    </div>
                  </form>
                </div>
                {/* end main contents */}
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

export default News;
