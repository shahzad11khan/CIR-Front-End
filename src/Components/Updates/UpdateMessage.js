import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import '../css/Register.css';
import Sidebar from '../Sidebar';
import Top from '../Top';
import '../css/style.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'


const UpdateMessage = () => {

    const { id } = useParams()
    console.log(id);

    const nav = useNavigate();
    //get data
    const [title, setTitle] = useState('');
    const [message, setmessage] = useState('');
    const [image, setimage] = useState('');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}/api/message/get/specific/` + id)
            .then((response) => {
                console.log(response.data);
                setTitle(response.data.name)
                setmessage(response.data.message)
                setimage(response.data.image)

            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const Updateuser = async (e) => {
        const values = { title, message, image }
        console.log(values);
        const formData = new FormData();
        formData.append('name', title);
        formData.append('message', message);
        formData.append('image', image);
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_API_KEY}/api/message/put/message/` + id, formData)
            //   window.location.reload();
            console.log("message updated")
            nav('../allmessage')
        } catch (err) {
            console.log(err);
        }
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

                                <div className='k' style={{ width: '60%', marginLeft: '20%', marginTop: '5%' }}>
                                <h1>Update Message</h1>
                                    <hr />
                                    <form>
                                        <div className='from-item' style={{display:'flex',justifyContent:'center'}}>
                                        <img src={`${process.env.REACT_APP_API_KEY}/message/images/` +image} style={{ width: '70px', height: '70px' }} alt={image} />
                                        </div>
                                        <div class="from-item">
                                            <label htmlFor="projectImage" style={{ display: 'flex' }} >Image Upload</label>
                                            <input type="file" className="form-control form-control-file" id="projectImage"
                                                name="image" onChange={e => setimage(e.target.files[0])} />
                                        </div>
                                        <div class="form-item">
                                            <label htmlFor="projectTitle">Name</label>
                                            <input type="text" className="form-control" id="projectTitle" name="name" value={title}
                                                placeholder="Enter project title" onChange={e => setTitle(e.target.value)} />
                                        </div>

                                        <div class="form-item">
                                            <label htmlFor="shortDescription">Message</label>
                                            <input type="text" className="form-control" id="shortDescription" name="shortdescription" value={message}
                                                placeholder="Short description" onChange={e => setmessage(e.target.value)} />
                                        </div>
        <br/>
                                        <input type="button" class="btn btn-primary" value='Update Category' onClick={Updateuser} />
                                    </form>
                                    <br />
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

export default UpdateMessage
