import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Dashboard.css";
import Sidebar from "./Sidebar";
import "./css/library.css";
import Top from "./Top";
import axios from "axios";
import Logout from "./Logout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Calender() {
  const nav = useNavigate();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      nav("/");
    }
  }, []);
  const [date, setdate] = useState();
  const [shortdescription, setshortdescription] = useState();
  const [selectcountry, setselectcountry] = useState();
  const [selectcity, setselectcity] = useState();
  const [longdescription, setlongdescription] = useState();
  const [check, setIsChecked] = useState("");
  const approve = "0";

  const handleCheckboxChange = () => {
    setIsChecked(!check); // Toggle the state
  };
  const Addcalender = async (e) => {
    e.preventDefault();

    try {
      const dataa = {
        date,
        shortdescription,
        selectcountry,
        selectcity,
        longdescription,
        approve,
        check,
      };

      // Check if any field is empty
      const isEmptyField = Object.values(dataa).some((value) => !value);
      if (isEmptyField) {
        toast.warning("Please fill in all the fields");
        return;
      }

      console.log(dataa);
      const response = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/calender/addcalender`,
        dataa,
        { timeout: 3000 }
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
        // toast.error("Request timeout. Please try again.");
      } else {
        console.error("Error sending data", error);
        toast.error("Failed to add Calender");
        return;
      }
    }
    toast.success("Calendar Added Successfully");
    nav("../allcalender");
  };

  // const Addcalender = async (e) => {
  //     e.preventDefault();
  //     try {
  //         const dataa = { date, shortdescription, selectcountry, selectcity, longdescription, approve, check };
  //         console.log(dataa);
  //         const response = await axios.post(`${process.env.REACT_APP_API_KEY}/api/calender/addcalender`, dataa, { timeout: 3000 });

  //         if (response.status === 200) {
  //             console.log('Data sent successfully', response.data);

  //             // window.location.reload();
  //         } else {
  //             console.error('Unexpected response status:', response.status);
  //             // toast.error("Failed to add library");
  //         }
  //     }
  //     catch (error) {
  //         if (axios.isCancel(error)) {
  //             console.log('Request canceled', error.message);
  //             return;
  //         }

  //         if (error.code === 'ECONNABORTED') {
  //             console.log('Request timeout');
  //             // toast.error("Request timeout. Please try again.");
  //         } else {
  //             console.error('Error sending data', error);
  //             // toast.error("Failed to add library");
  //         }
  //     }

  //     toast.success("Calendar Added Successfully")
  //     nav('../allcalender')
  //     // window.location.reload();

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
                  id="k"
                  style={{ width: "60%", marginLeft: "20%", marginTop: "3%" }}
                >
                  <h1>Add Calendar</h1>
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
                      <label htmlFor="Description">Description</label>
                      <input
                        type="text"
                        className="form-control"
                        id="shortDescription"
                        name="shortdescription"
                        placeholder="Short description"
                        onChange={(e) => setshortdescription(e.target.value)}
                        required
                      />
                    </div>

                    <div class="form-item">
                      <label htmlFor="Description">Country</label>
                      <input
                        type="text"
                        className="form-control"
                        id="countrySelect"
                        name="countrySelect"
                        placeholder="Country"
                        onChange={(e) => setselectcountry(e.target.value)}
                        required
                      />
                    </div>
                    {/* <div class="from-item">
                                            <label htmlFor="Country">Country</label>
                                            <select className="form-control" id="countrySelect" name="countrySelect" onChange={e=>setselectcountry(e.target.value)} >
                                                <option value="" selected disabled hidden>Choose Country</option>
                                                <option value="USA">Afghanistan</option>
                                                <option value="China">China</option>
                                                <option value="Iran">Iran</option>
                                                <option value="Pakistan">Pakistan</option>
                                            </select>
                                        </div> */}
                    <div class="form-item">
                      <label htmlFor="Description">City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="citiesDropdown"
                        name="select"
                        placeholder="City"
                        onChange={(e) => setselectcity(e.target.value)}
                        required
                      />
                    </div>
                    {/* <div class="from-item">
                                            <label htmlFor="Cities">City</label>
                                            <option value="" selected disabled hidden>Choose City</option>
                                            <select className="form-control" id="citiesDropdown" name='select' onChange={e=>setselectcity(e.target.value)}>
                                                <option value="" selected disabled hidden>Choose Cities</option>
                                                <option value="karachi">Karachi</option>
                                                <option value="Lahor">Lahor</option>
                                                <option value="Islamabad">Islamabad</option>
                                                <option value="Rawalpindi">Rawalpindi</option>
                                                <option value="Faisalabad">Faisalabad</option>
                                                <option value="Multan"> Multan</option>
                                                <option value="Peshawar">Peshawar</option>
                                                <option value="Quetta">Quetta</option>
                                                <option value="Sialkot">Sialkot</option>
                                                <option value="Gujranwala">Gujranwala</option>
                                            </select>
                                        </div> */}
                    <div class="from-item">
                      <label htmlFor="longDescription">Link </label>
                      <textarea
                        className="form-control"
                        id="longDescription"
                        name="longdescription"
                        rows="3"
                        placeholder="Enter long description"
                        onChange={(e) => setlongdescription(e.target.value)}
                        required
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
                        type="submit"
                        className="btn btn-primary form-control"
                        onClick={Addcalender}
                        value="Add Calender"
                      />
                    </div>
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

export default Calender;
