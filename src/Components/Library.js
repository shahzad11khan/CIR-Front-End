import React, { useEffect, useState } from "react";
import "./css/Dashboard.css";
import Sidebar from "./Sidebar";
import "./css/library.css";
// import './css/lib.css'
import Top from "./Top";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import Logout from "./Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { useRef } from "react";

function Library() {
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
  const [category, setCategory] = useState("");
  const [nature, setNature] = useState("");
  const [project, setProject] = useState("");
  const [selectvalues, setselectValues] = useState(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [longdescription, setLongDescription] = useState("");
  const [ccategory, setcCategory] = useState([]);
  const [nnature, setnnatures] = useState([]);
  const [pprojects, setpprojects] = useState([]);
  const approve = "0";
  // console.log(longdescription)
  const [selectedOptions, setSelectedOptions] = useState([]);
  // Sample list of options with "name" instead of "label"
  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(selectedValues);
  };
  // console.log(selectedOptions)
  const AddLibrary = async (e) => {
    e.preventDefault();

    try {
      const fileName = image.name;
      const fields = [
        { name: "title", message: "Please enter title" },
        { name: "shortdescription", message: "Please enter short description" },
        { name: "selectedOptions", message: "Please select category" },
        { name: "nature", message: "Please select nature" },
        { name: "selectvalues", message: "Please select value" },
        { name: "file", message: "Please select file" },
        { name: "image", message: "Please select image" },
      ];

      const errors = fields.filter((field) => !eval(field.name));
      if (errors.length > 0) {
        errors.forEach((error) => toast.warning(error.message));
        return;
      }
      if (file && file.type !== "application/pdf") {
        toast.warning("Only PDF files are allowed!");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("shortdescription", shortdescription);
      formData.append("category", selectedOptions);
      formData.append("nature", nature);
      formData.append("project", project);
      formData.append("selectvalues", selectvalues);
      formData.append("file", file);
      formData.append("image", image);
      formData.append("approve", approve);
      formData.append("longdescription", longdescription);

      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/libraryItem/postlibrary`,
        formData,
        { timeout: 60000 }
      );

      if (response.status === 200) {
        console.log("Data sent successfully", response.data);
        // window.location.reload();
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
        toast.error("Request timeout. Please try again.");
      } else {
        console.error("Error sending data", error);
        toast.error("Failed are missing");
        return;
      }
    }
    toast.success("Repository Added Successfully");
    nav("../alllibrary");
  };

  // category
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/category/categories`)
      .then((response) => {
        setcCategory(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  //   nature
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/nature/natures`)
      .then((response) => {
        setnnatures(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  //   projects
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/api/projectlibrary/projectlibraries`
      )
      .then((response) => {
        setpprojects(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

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
              <div className="container">
                {/* main contents */}
                <div
                  id="k"
                  style={{ width: "90%", marginLeft: "10%", marginTop: "1px" }}
                >
                  <h1>Add Repository</h1>

                  {/* Project form */}
                  <hr />

                  {/*  Title  */}
                  <form id="Add-project-from">
                    <div class="form-group">
                      <label class="from-label" for="title">
                        Title
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>

                    {/*  Short Description  */}
                    <div class="form-group">
                      <label class="from-label" for="shortDescription">
                        Author
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="shortDescription"
                        name="shortdescription"
                        placeholder="Enter short description"
                        onChange={(e) => setShortDescription(e.target.value)}
                        required
                      />
                    </div>

                    {/*  Category Dropdown */}
                    {/* <div class="form-group">
                                            <label class="from-label" for="category">Category:</label>
                                            <select class="form-select" id="category" onChange={e => setCategory(e.target.value)} required>
                                                <option selected>Select </option>
                                                <option value="nature">Water,Sanitation,Hygiene(WASH)</option>
                                                <option value="projects">Agriculture</option>
                                                <option value="projects">Health</option>
                                                <option value="projects">Urban Settlements</option>
                                                <option value="projects">Climate Modeling & Slimulation</option>
                                            </select>
                                        </div> */}

                    {/*  */}
                    {/* <div class="Register_from-item">
                                            <label htmlFor="usertype" className='form-label'>Category</label><br />
                                            <select class="form-control selectpicker" name='selectcategory' onChange={e => setCategory(e.target.value)} data-live-search="true">
                                                <option selected>Select </option>
                                                {
                                                    ccategory.map((cat) => {
                                                        return (

                                                            <option value={cat.name}>{cat.name}</option>
                                                        )
                                                    })
                                                }

                                            </select>
                                        </div> */}
                    <div className="Register_from-item">
                      <label htmlFor="usertype" className="form-label">
                        Category{" "}
                      </label>
                      <br />

                      <select
                        class="form-control selectpicker"
                        name="selectcategory"
                        onChange={handleSelectChange}
                        data-live-search="true"
                        size={1}
                      >
                        <option selected>Select </option>

                        {ccategory.map((option) => (
                          <option value={option.name}>{option.name}</option>
                        ))}
                      </select>
                    </div>

                    {/*  Nature Dropdown  */}
                    {/* <div class="form-group">
                                            <label class="from-label" for="nature">Nature:</label>
                                            <select class="form-select" id="nature" onChange={e => setNature(e.target.value)} required>
                                                 Add nature options as needed 
                                                <option selected>Select </option>
                                                <option value="option2">Journals</option>
                                                <option value="option3">Research Papers</option>
                                                <option value="option4">Confernce Papers</option>
                                                <option value="option5">Agreements</option>
                                                <option value="option6">Reports</option>
                                            </select>
                                        </div> */}
                    {/*  */}
                    <div class="Register_from-item">
                      <label htmlFor="usertype">Nature</label>
                      <br />
                      <select
                        class="form-control"
                        name="selectnature"
                        onChange={(e) => setNature(e.target.value)}
                      >
                        <option selected>Select </option>

                        {nnature.map((natu) => {
                          return <option value={natu.name}>{natu.name}</option>;
                        })}
                      </select>
                    </div>

                    {/*  Projects Dropdown  */}
                    {/* <div class="form-group">
                                            <label class="from-label" for="projects">Projects:</label>
                                            <select class="form-select" id="projects" onChange={e => setProject(e.target.value)} required>
                                                 Add project options as needed 
                                                <option selected>Select</option>
                                                <option value="project1">Project 1</option>
                                                <option value="project2">Project 2</option>
                                                <option value="project3">Project 3</option>
                                                <option value="project4">Project 4</option>
                                            </select>
                                        </div> */}

                    {/*  */}
                    <div class="Register_from-item">
                      <label htmlFor="usertype">Projects</label>
                      <br />
                      <select
                        class="form-control"
                        name="selectproject"
                        onChange={(e) => setProject(e.target.value)}
                      >
                        <option selected>Select </option>

                        {pprojects.map((project) => {
                          return (
                            <option value={project.name}>{project.name}</option>
                          );
                        })}
                      </select>
                    </div>
                    {/*  */}

                    {/* Credentials Radio Buttons  */}
                    {/* <div class="form-group">
                                            <label style={{
                                                float: "left", paddingTop: "10px", paddingBottom: "1px",
                                                fontWeight: "bolder", fontFamily: "sans-serif"
                                            }} >Credentials:</label>
                                            <div id="radio-label">
                                                <br />
                                                <div class="form-check" >
                                                    <br />
                                                    <input style={{ cursor: "pointer" }} class="form-check-input" onChange={e => setselectValues(e.target.value)} type="radio" name="credentials" id="privateCredentials" value="private" />
                                                    <label class="form-check-label" for="privateCredentials">Private</label>
                                                </div>
                                                <div  class="form-check">
                                                    <br />
                                                    <input style={{ cursor: "pointer" }} class="form-check-input" onChange={e => setselectValues(e.target.value)} type="radio" name="credentials" id="publicCredentials" value="public" />
                                                    <label class="form-check-label" for="publicCredentials">Public</label>
                                                </div>
                                            </div>
                                        </div> */}
                    <div style={{ display: "flex" }}>
                      <b>Stauts:</b>
                      <div class="form-check" style={{ marginLeft: "20%" }}>
                        <input
                          class="form-check-input"
                          type="radio"
                          name="credentials"
                          id="flexRadioDefault1"
                          value="private"
                          onChange={(e) => setselectValues(e.target.value)}
                        />
                        {/* <label style={{ marginLeft: '20%' }} class="form-check-label" for="flexRadioDefault1"> */}
                        Private
                        {/* </label> */}
                      </div>
                      <div class="form-check" style={{ marginLeft: "20%" }}>
                        <input
                          class="form-check-input"
                          type="radio"
                          name="credentials"
                          id="flexRadioDefault2"
                          value="public"
                          onChange={(e) => setselectValues(e.target.value)}
                        />
                        Public
                      </div>
                    </div>

                    {/*  File Input  */}
                    <div class="form-group">
                      <label
                        style={{ marginRight: "100%" }}
                        class="from-label"
                        for="file"
                      >
                        File
                      </label>
                      <input
                        type="file"
                        class="form-control"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        required
                      />
                    </div>

                    {/* Image Input  */}
                    <div class="form-group">
                      <label class="from-label" for="image">
                        Image
                      </label>
                      <input
                        type="file"
                        class="form-control"
                        id="image"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                      />
                    </div>

                    {/*  Long Description Textarea  */}
                    {/* <div class="form-group">
                                            <label class="from-label" for="longDescription">Long Description:</label>
                                            <br />
                                            <br/> */}
                    {/* <br /> */}
                    {/* <textarea class="form-control" id="longDescription" rows="2" placeholder="Enter long description" onChange={e => setLongDescription(e.target.value)} required /> */}
                    {/* <JoditEditor
                                                ref={editor}
                                                value={longdescription}
                                                tabIndex={1} // tabIndex of textarea
                                                // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                onChange={desciption => setLongDescription(desciption)}
                                            /> */}

                    {/* <div>{longdescription}</div> */}
                    {/* </div> */}

                    {/* Submit Button  */}
                    <button
                      type="submit"
                      class="btn btn-primary form-control"
                      onClick={AddLibrary}
                    >
                      Submit
                    </button>
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

export default Library;
