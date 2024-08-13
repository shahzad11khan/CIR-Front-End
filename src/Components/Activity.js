import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Dashboard.css";
import "./css/editor.css";
import Sidebar from "./Sidebar";
import Top from "./Top";
import "./css/style.css";
import axios from "axios";
import Logout from "./Logout";
import "./css/joditeditor.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { useRef } from "react";
//
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins/image.min";
import FroalaEditor from "react-froala-wysiwyg";
//
function Activity() {
  const editor = useRef(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/");
    }
  }, []);
  const nav = useNavigate();
  //
  const [title, setTitle] = useState("");
  const [shortdescription, setShortDescription] = useState("");
  const [imageupload, setImageUpload] = useState(null);
  const [longdescription, setLongDescription] = useState("");
  const [metatitle, setmetatitle] = useState("");
  const [metashortdescription, setmetashortdescription] = useState("");
  const [metaimage, setmetaimage] = useState(null);
  const [metalongdescription, setmetalongdescription] = useState("");
  const [check, setIsChecked] = useState("");
  const approve = "0";

  const handleCheckboxChange = () => {
    setIsChecked(!check); // Toggle the state
  };
  const addproject = async (e) => {
    e.preventDefault();
    try {
      const fileName = imageupload.name;

      const fields = [
        { name: "title", message: "Enter title" },
        { name: "shortdescription", message: "Enter Short Description" },
        { name: "imageupload", message: "Select Image" },
        { name: "longdescription", message: "Enter Long Description" },
      ];

      const errors = fields.filter((field) => !eval(field.name));
      if (errors.length > 0) {
        errors.forEach((error) => toast.warning(error.message));
        return;
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("shortdescription", shortdescription);
      formData.append("file1", imageupload);

      // console.log(longdescription);
      // // Assuming longdescription contains the HTML content as a string
      // const htmlContent = longdescription;

      // // Regular expression to match the img tag and its src attribute, along with the text inside the <p> tag
      // // const regex =
      // //   /<p>(.*?)<img.*?src="blob:http:\/\/localhost:3000\/(.*?)".*?>(.*?)<\/p>/g;
      // const regex = /<p>(.*?)<img.*?src="blob:(.*?)".*?>(.*?)<\/p>/g;

      // // Extracting all matches
      // const matches = htmlContent.matchAll(regex);

      // // Iterate through each match
      // for (const match of matches) {
      //   const textBeforeImage = match[1];
      //   const imageSrc = match[2];
      //   const textAfterImage = match[3];

      //   console.log("Text before image:", textBeforeImage.trim());
      //   console.log("Image src:", imageSrc);
      //   console.log("Text after image:", textAfterImage.trim());
      //   // }

      //   // Concatenating the extracted information
      //   var longdescription = `Text before image: ${textBeforeImage} | Image src: ${imageSrc} | Text after image: ${textAfterImage}\n`;
      // }

      // console.log(longdescription);

      //
      // formData.append("longdescription", longdescription);
      formData.append("longdescription", longdescription);

      formData.append("metatitle", metatitle);
      formData.append("metashortdescription", metashortdescription);
      formData.append("file2", metaimage ? metaimage : "");
      formData.append("metalongdescription", metalongdescription);
      formData.append("check", check);
      formData.append("approve", approve);

      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/activites/uploadfiles`,
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
        toast.error("Failed to add library");
        return;
      }
    }
    // Move the success message and navigation inside the try block to ensure they're executed only after successful form submission
    toast.success("Add Activity Successfully");
    nav("../allactivity");
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
              <div className="container">
                {/* main contents */}
                <div className="k" style={{ width: "70%", marginLeft: "10%" }}>
                  <h1>Add Activity</h1>
                  <hr />

                  {/* Project form */}
                  <form id="Add-project-from">
                    <div class="form-item">
                      <label htmlFor="projectTitle">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="projectTitle"
                        name="projectTitle"
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
                        name="projectImage"
                        onChange={(e) => setImageUpload(e.target.files[0])}
                        required
                      />
                    </div>
                    {/* <div class="from-item">
                                            <label htmlFor="longDescription">Long Description</label>
                                            <textarea className="form-control" id="longDescription" name="longDescription" rows="3"
                                                placeholder="Enter long description" onChange={e => setLongDescription(e.target.value)} required />
                                        </div> */}
                    {/* text editor one */}
                    <div class="form-group">
                      <label class="from-label" for="longDescription">
                        Long Description:
                      </label>
                      <br />
                      <br />
                      <JoditEditor
                        ref={editor}
                        value={longdescription}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(description) =>
                          setLongDescription(description)
                        } // preferred to use only this option to update the content for performance reasons
                        // onChange={description => setLongDescription(description)}
                        config={{
                          // Apply custom styles to the editor elements
                          styleTags: [
                            "fr-wrapper",
                            "fr-footer",
                            "fr-command",
                            "fr-btn",
                            "jodit-status-bar", // Add custom style tag if needed
                          ],
                          customClass: {
                            "fr-footer": "jodit-footer", // Add the custom class here
                            "jodit-status-bar": "jodit-status-bar", // Add the custom class here
                          },
                          buttons: [
                            "source",
                            "fullsize",
                            "|",
                            "bold",
                            "italic",
                            "|",
                            "ul",
                            "ol",
                            "|",
                            "outdent",
                            "indent",
                            "|",
                            "image",
                            "video",
                            "|",
                            "link",
                            "|",
                            "align",
                            "|",
                            "undo",
                            "redo",
                            "|",
                            "cut",
                            "copy",
                            // "paste", // Remove 'paste' to exclude "Paste as HTML" option
                          ],
                          disablePlugins: ["contextmenu"], // Disable context menu plugin
                        }}
                      />
                    </div>

                    {/* */}
                    {/* text editor two

                    {/* <div className="form-group">
                      <label className="from-label" htmlFor="longDescription">
                        Long Description:
                      </label>
                      <br />
                      <br />
                      <FroalaEditor
                        value={longdescription}
                        model={longdescription}
                        onModelChange={(newModel) =>
                          setLongDescription(newModel)
                        }
                        config={{
                          // Apply custom styles to the editor elements
                          styleTags: [
                            "fr-wrapper",
                            "fr-footer",
                            "fr-command",
                            "fr-btn",
                          ],
                          customClass: {
                            "fr-wrapper": "custom-fr-wrapper",
                            "fr-footer": "custom-fr-footer",
                            "fr-command": "custom-fr-command",
                            "fr-btn": "custom-fr-btn",
                          },
                        }}
                      />
                    </div> */}
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
                          setmetashortdescription(e.target.value)
                        }
                        hidden
                      />
                      <input
                        type="file"
                        id="metaImage"
                        name="metaimage"
                        onChange={(e) => setmetaimage(e.target.files[0])}
                        hidden
                      />
                      <input
                        type="text"
                        id="metaLongDescription"
                        name="metalongdescription"
                        onChange={(e) => setmetalongdescription(e.target.value)}
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
                        onClick={addproject}
                      >
                        {" "}
                        Add Activity
                      </button>
                    </div>
                  </form>
                </div>
                {/* End main contents */}
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

export default Activity;
