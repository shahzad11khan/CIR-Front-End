import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Dashboard.css";
import Sidebar from "./Sidebar";
import Top from "./Top";
import axios from "axios";
import "./css/style.css";
import Logout from "./Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { useRef } from "react";

function Projects() {
  const editor = useRef(null);

  const nav = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/");
    }
  }, []);
  const [title, setTitle] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [imageupload, setImageUpload] = useState("");
  const [longdescription, setLongDescription] = useState("");
  const [metatitle, setmetatitle] = useState("");
  const [metashortdescription, setmetashortDescription] = useState("");
  const [metaimageupload, setmetaimageUpload] = useState("");
  const [metalongdescription, setmetalongDescription] = useState("");
  const [check, setIsChecked] = useState("");
  const approve = "0";

  const handleCheckboxChange = () => {
    setIsChecked(!check); // Toggle the state
  };
  const Adduser = async (e) => {
    e.preventDefault();
    try {
      const fields = [
        { name: "title", message: "Enter Title" },
        { name: "shortdescription", message: "Enter Short Description" },
        { name: "imageupload", message: "Select One Image" },
        { name: "longdescription", message: "Enter Long Description" },
      ];

      const errors = fields.filter((field) => !eval(field.name));
      if (errors.length > 0) {
        errors.forEach((error) => toast.warning(error.message));
        return;
      }

      const fileName = imageupload.name;
      if (!fileName) {
        toast.warning("Select the image");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("shortdescription", shortdescription);
      formData.append("file1", imageupload);
      formData.append("longdescription", longdescription);
      formData.append("check", check);
      formData.append("approve", approve);
      formData.append("metatitle", metatitle);
      formData.append("metashortdescription", metashortdescription);
      formData.append("file2", metaimageupload || ""); // Use metaimageupload if available, otherwise an empty string
      formData.append("metalongdescription", metalongdescription);

      // Send the data
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/project/uploadfiles`,
        formData,
        { timeout: 1000 }
      );

      if (response.status === 200) {
        console.log("Data sent successfully", response.data);
      } else {
        console.error("Unexpected response status:", response.status);
        // toast.error("Failed to add library");
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
        return;
      }

      if (error.code === "ECONNABORTED") {
        console.log("Request timeout");
        // toast.error("Request timeout. Please try again.");
      } else {
        console.error("Error sending data", error);
        // toast.error("Failed to add library");
      }
    }
    toast.success("Project Added Successfully");
    nav("../allproject");
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
                <div className="k" style={{ width: "70%", marginLeft: "10%" }}>
                  <h1>Add Project</h1>
                  <hr />

                  {/* Project form */}
                  <form id="Add-project-from">
                    <div class="form-item">
                      <label htmlFor="projectTitle">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="projectTitle"
                        name="title"
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
                        name="shortdescription"
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
                        name="file1"
                        onChange={(e) => setImageUpload(e.target.files[0])}
                        required
                      />
                    </div>

                    {/* <div class="from-item">
                                            <label htmlFor="longDescription">Long Description</label>
                                            <textarea className="form-control" id="longDescription" name="longdescription" rows="3"
                                                placeholder="Enter long description" onChange={e => setLongDescription(e.target.value)} required />
                                        </div> */}
                    <div class="form-group">
                      <label class="from-label" for="longDescription">
                        Long Description:
                      </label>
                      <br />
                      <br></br>

                      <JoditEditor
                        ref={editor}
                        value={longdescription}
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
                        onChange={(e) => setmetatitle(e.target.value)}
                        hidden
                      />
                      <input
                        type="text"
                        id="metaShortDescription"
                        name="metashortdescription"
                        onChange={(e) =>
                          setmetashortDescription(e.target.value)
                        }
                        hidden
                      />
                      <input
                        type="file"
                        id="metaImage"
                        name="file2"
                        onChange={(e) => setmetaimageUpload(e.target.files[0])}
                        hidden
                      />
                      <input
                        type="text"
                        id="metaLongDescription"
                        name="metalongdescription"
                        onChange={(e) => setmetalongDescription(e.target.value)}
                        hidden
                      />
                    </div>
                    <br />
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
                    <br />
                    <div class="from-item">
                      <input
                        type="button"
                        className="btn btn-primary form-control"
                        onClick={Adduser}
                        value={"Add Project"}
                      />
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

export default Projects;
