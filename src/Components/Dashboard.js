import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './css/Dashboard.css';
import Sidebar from './Sidebar';
import Logout from './Logout';
import Top from './Top';




function Dashboard() {
    // 
    const nav = useNavigate();
    const [usrnm, stusername] = useState();

    
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const usrname = localStorage.getItem('username');

        if (usrname) {
            stusername(usrname)
            console.log(usrname)
        }

        if (!storedToken) {
            nav('/')
        }
        setInterval(() => {
            generateRandomNumber();
            generatefiles()
            generatecate()
            generatepor()
        }, 3000);
    }, []);
    const [rand, setrand] = useState()
    const generateRandomNumber = () => {
        const min = 1;
        const max = 20;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        setrand(randomNum);
    };
    //   total files
    const [randfile, setrandfile] = useState()
    const generatefiles = () => {
        const min = 1;
        const max = 500;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        setrandfile(randomNum);
    };
    //   total category
    const [randcate, setrandcate] = useState()
    const generatecate = () => {
        const min = 1;
        const max = 500;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        setrandcate(randomNum);
    };
    // Catrgory  
    const [randpro, setrandpro] = useState()
    const generatepor = () => {
        const min = 1;
        const max = 5;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        setrandpro(randomNum);
    };



    // const Dash = async () => {
    //     let gettoken = localStorage.getItem("token");
    //     const res = await fetch("/users/validuser", {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Authorization": gettoken
    //         }
    //     });
    //     const data = await res.json();
    //     const info = data.validuser;
    //     // console.log(data.validuser);
    //     if (data.status === 401 || !data) {
    //         console.log("redirect to error page");
    //         nav('/')
    //     } else {
    //         console.log("user valid");
    //         nav('/dashboard')
    //     }
    // }
    useEffect(() => {
        Dash();
    }, [])
    // 
    // const Dash = async () => {
    //     try {
    //       let gettoken = localStorage.getItem("token");
    //       console.log(gettoken);
    //       const res = await fetch("/users/validuser", {
    //         method: 'GET',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Authorization': gettoken,
    //         },
    //       });

    //       const data = await res.json();

    //       if (res.status === 401 || !data) {
    //         console.log("User not valid, redirecting to the error page");
    //         nav('/');
    //       } else if (res.status >= 400) {
    //         console.log("Server error, redirecting to the error page");
    //         nav('/');
    //       } else {
    //         console.log("User is valid, redirecting to the dashboard");
    //         nav('/dashboard');
    //       }
    //     } catch (error) {
    //       console.error("An unexpected error occurred:", error);
    //       // Handle unexpected errors, perhaps redirect to an error page
    //       nav('/');
    //     }
    //   };
    // Frontend code
    const Dash = async () => {
        try {
            let gettoken = localStorage.getItem("token");
            console.log(gettoken);
            if (!gettoken) {
                console.log("Token not found, redirecting to the error page");
                nav('/');
                return;
            }

            const res = await fetch(`${process.env.REACT_APP_API_KEY}/users/validuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${gettoken}`, // Add "Bearer " before the token
                },
            });

            // Rest of your code remains unchanged
        } catch (error) {
            console.error("An unexpected error occurred:", error);
            nav('/');
        }
    };


    // 



    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };
    const changeStyle1 = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
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

                                {/*  <!-- Page Heading --> */}
                                {/* <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                                        className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
                                </div> */}

                                {/*  <!-- Content Row --> */}
                                {/* <div className="row">

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Total User</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{rand}</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-success shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                            Total Files</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{randfile}</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-info shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Projects
                                                        </div>
                                                        <div className="row no-gutters align-items-center">
                                                            <div className="col-auto">
                                                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{randcate}</div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-warning shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                            Pending Requests</div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{randpro}</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                                {/*  <!-- Content Row --> */}

                                <div className="row">

                                    {/*   <!-- Area Chart --> */}
                                    <div className="col-xl-12 col-lg-7">
                                        <div className="card shadow mb-4">
                                            {/*  <!-- Card Header - Dropdown --> */}
                                            <div
                                                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                                <h6 className="m-0 font-weight-bold text-primary">GCISC</h6>
                                                <div className="dropdown no-arrow">
                                                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                                    </a>
                                                </div>
                                            </div>
                                            {/*  <!-- Card Body --> */}
                                            <div className="card-body">
                                                <div className="chart-area" style={{ textAlign: 'center', marginTop: '5rem' }}>

                                                    <h1>Welcome: <b><u>{usrnm}</u></b></h1>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*  <!-- Pie Chart --> */}

                                </div>

                                {/*   <!-- Content Row --> */}
                                <div className="row">

                                    {/*   <!-- Content Column --> */}
                                    <div className="col-lg-6 mb-4">

                                        {/* <!-- Project Card Example --> */}


                                        {/* <!-- Color System --> */}


                                    </div>

                                </div>

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
                {/* <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a> */}

                {/*  <!-- Logout Modal--> */}
                <Logout />

            </body>
        </div>
    )
}

export default Dashboard;
