import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './css/Dashboard.css';
import './css/Register.css';
import Sidebar from './Sidebar';
import Top from './Top';
import axios from 'axios';
import Logout from './Logout';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Adduser() {
    // 
    // 
    const nav = useNavigate();
    const [showDiv1, setShowDiv1] = useState(false);
    const [select, setselect] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            nav('/')
        }
    }, []);
    const [values, Setvalues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const selection = (e) => {
        setselect(e.target.value);
        if (e.target.value === "user") {
            setShowDiv1(true)
        } else {
            setShowDiv1(!true)

        }
    }

    // 
    const handleCheckboxChange = (permission) => {
        // Toggle the selected permission
        if (selectedPermissions.includes(permission)) {
            setSelectedPermissions(selectedPermissions.filter((item) => item !== permission));
        } else {
            setSelectedPermissions([...selectedPermissions, permission]);
        }
    };
    // 

    // console.log(selectedPermissions);


    const submithandler = (e) => {
        e.preventDefault();
        if (!values.username) {
            toast.warning("Enter Username")
        }
        else if (!values.email || !values.email.includes('@')) {
            toast.warning("Enter Email")
        } else if (!values.password) {
            toast.warning("Enter Passowrd")
        } else if (!select) {
            toast.warning("Choice One Of Them in UserType")
        } else {
            const dataa = { ...values, select, selectedPermissions }
            console.log(dataa)


            axios.post(`${process.env.REACT_APP_API_KEY}/users/registeruser`, dataa, { timeout: 5000 })
                .then(response => {
                    console.log('Data sent successfully', response.data);
                    toast.success('User added successfully');
                    nav('../alluser');
                    // window.location.reload();
                })
                .catch(error => {
                    if (axios.isCancel(error)) {
                        console.log('Request canceled', error.message);
                    } else {
                        console.error('Error sending data', error);
                        toast.error('Failed to add user');
                    }
                });



        }

    }

    // 

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
                                <div className='khan' style={{ width: '70%', marginTop: '2%' }}>
                                    <h2 class="my-title">Add User</h2>
                                    <hr />
                                    <form id="RegistranFrom" onSubmit={submithandler}>
                                        <div class="Register_from-item" >
                                            <label htmlFor="UserName">Username</label>
                                            <input type="text" class="form-control" name="userName" id="username" placeholder="Enter UserName" onChange={e => Setvalues({ ...values, username: e.target.value })} required />
                                        </div>
                                        <div class="Register_from-item">
                                            <label htmlFor="Email">Email</label>
                                            <input type="email" class="form-control" name="email" id="email" placeholder="Enter Email" onChange={e => Setvalues({ ...values, email: e.target.value })} required />
                                        </div>
                                        <div class="Register_from-item">
                                            <label htmlFor="Password">Password</label>
                                            <input type="password" class="form-control" name="password" id="password" placeholder="Enter Password" onChange={e => Setvalues({ ...values, password: e.target.value })} required />
                                        </div>
                                        <div class="Register_from-item">
                                            <label htmlFor="usertype">User Type</label><br />
                                            <select class="form-control" onChange={selection}>
                                                <option selected>Select</option>
                                                <option value="superadmin" >Super Admin</option>
                                                <option value="manager" >Manager</option>
                                                {/* <option value="admin" >Admin</option> */}
                                                <option value="user">User</option>
                                                {/* <option value="manager" >Manager</option> */}
                                            </select>
                                        </div>
                                        {showDiv1 && (
                                            // <div style={{ display: 'flex' }}>
                                            //     <div className="Register_from-item">
                                            //         <label>Permissions</label>
                                            //         <br />
                                            //         <label>
                                            //             <input
                                            //                 type="checkbox"
                                            //                 value="activity"
                                            //             checked={selectedPermissions.includes('activity')}
                                            //             onChange={() => handleCheckboxChange('activity')}
                                            //             />
                                            //             Activity
                                            //         </label>
                                            //         <label>
                                            //             <input
                                            //                 type="checkbox"
                                            //                 value="news"
                                            //                 checked={selectedPermissions.includes('news')}
                                            //                 onChange={() => handleCheckboxChange('news')}
                                            //             />
                                            //             News
                                            //         </label>
                                            //         <br />
                                            //         <label>
                                            //             <input
                                            //                 type="checkbox"
                                            //                 value="library"
                                            //                 checked={selectedPermissions.includes('library')}
                                            //                 onChange={() => handleCheckboxChange('library')}
                                            //             />
                                            //             Library
                                            //         </label>
                                            //         <br />
                                            //         <label>
                                            //             <input
                                            //                 type="checkbox"
                                            //                 value="projects"
                                            //             checked={selectedPermissions.includes('projects')}
                                            //             onChange={() => handleCheckboxChange('projects')}
                                            //             />
                                            //             Projects
                                            //         </label>
                                            //         <br />
                                            //         <label>
                                            //         <input
                                            //                 type="checkbox"
                                            //                 value="user"
                                            //             checked={selectedPermissions.includes('user')}
                                            //             onChange={() => handleCheckboxChange('user')}
                                            //             />
                                            //             User
                                            //         </label>
                                            //         <br />
                                            //         <label>
                                            //             <input
                                            //                 type="checkbox"
                                            //                 value="projectlibrary"
                                            //             checked={selectedPermissions.includes('projectlibrary')}
                                            //             onChange={() => handleCheckboxChange('projectlibrary')}
                                            //             />
                                            //             Project Library
                                            //         </label>
                                            //         <br />
                                            //         <label>
                                            //             <input
                                            //                 type="checkbox"
                                            //                 value="calendar"
                                            //             checked={selectedPermissions.includes('calendar')}
                                            //             onChange={() => handleCheckboxChange('calendar')}
                                            //             />
                                            //             Calendar
                                            //         </label>
                                            //         <br />
                                            //         <label>
                                            //             <input
                                            //                 type="checkbox"
                                            //                 value="category"
                                            //             checked={selectedPermissions.includes('category')}
                                            //             onChange={() => handleCheckboxChange('category')}
                                            //             />
                                            //             Category
                                            //         </label>
                                            //         <br />
                                            //         <label>
                                            //             <input
                                            //                 type="checkbox"
                                            //                 value="nature"
                                            //             checked={selectedPermissions.includes('nature')}
                                            //             onChange={() => handleCheckboxChange('nature')}
                                            //             />
                                            //             Nature
                                            //         </label>
                                            //     </div>

                                            // </div>
                                            <div className='Register_from-item'>
                                            <label>Permissions</label>
                                            <br />
                                            {/* Your existing checkbox logic */}
                                            {['user', 'projects','activity', 'news', 'library', 'calendar', 'message','partner', 'category','nature','projectlibrary'].map(
                                              (permission) => (
                                                <label key={permission}>
                                                  <input
                                                    type='checkbox'
                                                    value={permission}
                                                    checked={selectedPermissions.includes(permission)}
                                                    onChange={() => handleCheckboxChange(permission)}
                                                  />
                                                  {permission.charAt(0).toUpperCase() + permission.slice(1)}
                                                </label>
                                              )
                                            )}
                                          </div>
                                        )}
                                        <br/>
                                    
                                        <hr />
                                        <div class="Register_from-item">
                                            <button type="Create Account" class="btn btn-primary form-control">Create Account</button>
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
                <Logout />

            </body>
        </div>
    )
}

export default Adduser;

