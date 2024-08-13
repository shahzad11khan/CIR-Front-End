import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import '../css/Register.css';
import Sidebar from '../Sidebar';
import Top from '../Top';
import '../css/style.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'

const UpdateCalender = () => {

    const { id } = useParams();
    console.log(id)
    const nav = useNavigate()
    const [date, setdate] = useState();
    const [shortdescription, setshortdescription] = useState();
    const [selectcountry, setselectcountry] = useState();
    const [selectcity, setselectcity] = useState();
    const [longdescription, setlongdescription] = useState();
    const [check, setIsChecked] = useState(false);

    // console.log(date)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}/api/calender/getspecific/` + id)
            .then((response) => {
                // console.log(response.data.date);
                const date = response.data.date;
                setdate(date);
                setshortdescription(response.data.description)
                setselectcountry(response.data.country)
                setselectcity(response.data.city)
                setIsChecked(response.data.check)
                setlongdescription(response.data.longDescription)
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);


    const Addcalender = async (e) => {

        e.preventDefault();
        try {
            console.log(id)
            const data = { date, shortdescription, selectcountry, selectcity, longdescription, check };
            console.log(data);

            const response = await axios.put(`${process.env.REACT_APP_API_KEY}/api/calender/put/update/${id}`, data, { timeout: 2000 });

            if (response.status === 200) {
                console.log('Data sent successfully', response.data);

                // window.location.reload();

            } else {
                console.error('Unexpected response status:', response.status);
                // toast.error("Failed to add library");
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
                return;
            }

            if (error.code === 'ECONNABORTED') {
                console.log('Request timeout');
                toast.error("Request timeout. Please try again.");
            } else {
                console.error('Error sending data', error);
                // toast.error("Failed to add library");
            }
        }

        console.log('Data sent successfully');
        nav('../allcalender')

    }


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
                                <div id='k' style={{ width: '60%', marginLeft: '20%', marginTop: '3%' }}>
                                    <h1>Add Calender</h1>
                                    <hr />

                                    {/* Project form */}
                                    <form id="Add-project-from">
                                        <div class="form-item">
                                            <label htmlFor="date">Date</label>
                                            <input type="date" className="form-control" id="projectTitle" name="date"
                                                placeholder='select date' value={date} onChange={e => setdate(e.target.value)} />
                                        </div>

                                        <div class="form-item">
                                            <label htmlFor="Description">Description</label>
                                            <input type="text" className="form-control" id="shortDescription" name="shortdescription"
                                                placeholder="Short description" value={shortdescription} onChange={e => setshortdescription(e.target.value)} />
                                        </div>
                                        <div class="form-item">
                                            <label htmlFor="Description">Country</label>
                                            <input type="text" className="form-control" id="countrySelect" name="countrySelect"
                                                placeholder="Country" value={selectcountry} onChange={e => setselectcountry(e.target.value)} required />
                                        </div>

                                        {/* <div class="from-item">
                                            <label htmlFor="Country">Country</label>
                                            <select className="form-control" id="countrySelect" name="countrySelect" value={selectcountry} onChange={e => setselectcountry(e.target.value)} >
                                                <option value="" selected disabled hidden>Choose Country</option>
                                                <option value="USA">Afghanistan</option>
                                                <option value="China">China</option>
                                                <option value="Iran">Iran</option>
                                                <option value="Pakistan">Pakistan</option>
                                            </select>
                                        </div> */}

                                        <div class="form-item">
                                            <label htmlFor="Description">City</label>
                                            <input type="text" className="form-control" id="citiesDropdown" name="select"
                                                placeholder="Country" value={selectcity} onChange={e => setselectcity(e.target.value)} required />
                                        </div>
                                        {/* <div class="from-item">
                                            <label htmlFor="Cities">City</label>
                                            <option value="" selected disabled hidden>Choose City</option>
                                            <select className="form-control" id="citiesDropdown" value={selectcity} name='select' onChange={e => setselectcity(e.target.value)}>
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
                                            <label htmlFor="longDescription">Long Description</label>
                                            <textarea className="form-control" id="longDescription" value={longdescription} name="longdescription" rows="3"
                                                placeholder="Enter long description" onChange={e => setlongdescription(e.target.value)} />
                                        </div>
                                        <br />
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value={check} checked={check}
                                                onChange={e => setIsChecked(!check)} id="flexCheckDefault" />
                                            To Be Featured
                                        </div>
                                        <br />
                                        <div class="from-item">
                                            <input type="submit" className="btn btn-primary form-control" onClick={Addcalender} value='Update Calender' />
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
                <div className="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>

            </body>
        </div>
    )
}

export default UpdateCalender
