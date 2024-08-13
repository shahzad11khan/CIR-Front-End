import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import '../css/Register.css';
import Sidebar from '../Sidebar';
import Top from '../Top';
import '../css/style.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import { useRef } from 'react';

const Updatenews = () => {
    const { id } = useParams()
    const editor = useRef(null);

    console.log(id);
    const nav = useNavigate();

    //get data
    const [title, setTitle] = useState('');
    const [date,setdate]=useState();
    const [shortdescription, setShortDescription] = useState('');
    const [imageupload, setImageUpload] = useState('');
    const [longdescription, setLongDescription] = useState('');
    const [metatitle, setmetatitle] = useState('');
    const [metashortdescription, setmetashortDescription] = useState('');
    const [metaimageupload, setmetaimageUpload] = useState('');
    const [metalongdescription, setmetalongDescription] = useState('');
    const [check, setIsChecked] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_KEY}/api/news/specificuploadednews/`+id)
            .then((response) => {
                console.log(response.data)
                const date=response.data.date;
                setdate(date);
                setTitle(response.data.title)
                setShortDescription(response.data.shortDescription)
                setImageUpload(response.data.image)
                setLongDescription(response.data.longDescription)
                setmetatitle(response.data.metaTitle)
                setIsChecked(response.data.check)
                setmetaimageUpload(response.data.coverimage)
                setmetashortDescription(response.data.metashortDescription)
                setmetalongDescription(response.data.metalongDescription)
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const Adduser = async (e) => {
        e.preventDefault();
        console.log(date,title, shortdescription, longdescription, imageupload, metatitle, metashortdescription, metalongdescription, metaimageupload)
        const formData = new FormData();
        formData.append('date', date);
        formData.append('title', title);
        formData.append('shortdescription', shortdescription);
        formData.append('file1', imageupload);
        formData.append('longdescription', longdescription);
        formData.append('check', check);
        formData.append('metatitle', metatitle);
        formData.append('metashortdescription', metashortdescription);
        formData.append('file2', metaimageupload ? metaimageupload : '');
        formData.append('metalongdescription', metalongdescription);


        try {
            await axios.put(`${process.env.REACT_APP_API_KEY}/api/news/updatenew/` + id, formData)
            console.log("updated news")

            nav('../allnews')
            // window.location.reload();
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
                                <div className='k' style={{ width: '70%', marginLeft: '10%' }}>
                                    <h1>Update News</h1>
                                    <hr />

                                    {/* Project form */}
                                    <form id="Add-project-from">
                                    <div class="form-item">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" className="form-control" id="projectTitle" name="date"
                                    placeholder='select date' value={date}  onChange={e=>setdate(e.target.value)}  />
                                </div>
                                        <div class="form-item">
                                            <label htmlFor="projectTitle">Title</label>
                                            <input type="text" className="form-control" id="projectTitle" name="title"
                                                placeholder="Enter project title" value={title} onChange={e => setTitle(e.target.value)}  />
                                        </div>

                                        <div class="form-item">
                                            <label htmlFor="shortDescription">Short Description</label>
                                            <input type="text" className="form-control" id="shortDescription" name="shortdescription"
                                                placeholder="Short description" value={shortdescription} onChange={e => setShortDescription(e.target.value)}  />
                                        </div>
                                        <br/>
                                        <div class="form-item">
                                        {/* <label htmlFor="shortDescription">Image</label>  */}
                                        <img src={`${process.env.REACT_APP_API_KEY}/news/images/`+imageupload} style={{ width: '70px', height: '70px' }} alt={imageupload} />
                                        </div>
                                        <div class="from-item">
                                            <label htmlFor="projectImage">Image Upload</label>
                                            <input type="file" className="form-control form-control-file" id="projectImage"
                                                name="file1"  onChange={e => setImageUpload(e.target.files[0])}  />
                                        </div>

                                        {/* <div class="from-item">
                                            <label htmlFor="longDescription">Long Description</label>
                                            <textarea className="form-control" id="longDescription" name="longdescription" rows="3"
                                                placeholder="Enter long description" value={longdescription} onChange={e => setLongDescription(e.target.value)}  />
                                        </div> */}

<div class="form-group">
                                            <label class="from-label" for="longDescription">Long Description:</label>
                                            <br />
                                            <br></br>

                                            <JoditEditor
                                                ref={editor}
                                                value={longdescription}
                                                tabIndex={1} // tabIndex of textarea
                                                // onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                onChange={desciption => setLongDescription(desciption)}
                                            />
                                        </div>

                                        {/* Hidden feilds for meta data */}
                                        <div id="metadata">
                                            <input type="text" id="metaTitle" name="metatitle" value={metatitle} onChange={e => setmetatitle(e.target.value)} hidden />
                                            <input type="text" id="metaShortDescription" name="metashortdescription" value={metashortdescription} onChange={e => setmetashortDescription(e.target.value)} hidden />
                                            <input type="file" id="metaImage" name="file2"  onChange={e => setmetaimageUpload(e.target.files[0])} hidden />
                                            <input type="text" id="metaLongDescription" value={metalongdescription} name="metalongdescription" onChange={e => setmetalongDescription(e.target.value)} hidden />
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox" value={check} checked={check}
                                                onChange={e=>setIsChecked(!check)} id="flexCheckDefault" />
                                            To Be Featured
                                        </div>
                                        <div class="from-item">
                                            <button type="submit" className="btn btn-primary form-control" onClick={Adduser}> Update News</button>
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

export default Updatenews
