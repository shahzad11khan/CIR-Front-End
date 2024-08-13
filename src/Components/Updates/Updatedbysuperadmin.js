import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import '../css/Register.css';
import Sidebar from '../Sidebar';
import Top from '../Top';
import '../css/style.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom';

const Updatedbysuperadmin = () => {
    const { id } = useParams()
    const nav =useNavigate()
    console.log(id);

    const [title, setTitle] = useState();
    const [shortdescription, setshortdescription] = useState();

    const [category, setcategory] = useState([]);
    const [selectedcategory, setselectedcategory] = useState('');

    const [nature, setnature] = useState([]);
    const [selectednature, setselectdnature] = useState('');

    const [project, setproject] = useState([]);
    const [selectedproject, setselectedproject] = useState('');

    const [credentials, setcredentials] = useState();
    const [file, setfile] = useState();
    const [image, setimage] = useState();
    const [longdescription, setlongdescription] = useState();
    const [approve,setapprove]=useState();

    console.log(selectedcategory,selectednature,selectedproject)

    useEffect(() => {
        axios.get('/api/libraryItem/getspecificlibrary/' + id)
            .then((response) => {
                console.log(response.data);
                setTitle(response.data.title)
                setfile(response.data.file)
                setimage(response.data.image)
                setshortdescription(response.data.shortDescription)
                setselectedcategory(response.data.category)
                setselectdnature(response.data.nature)
                setselectedproject(response.data.project)
                setcredentials(response.data.credentials)
                setlongdescription(response.data.longDescription)
                setapprove(response.data.approve)
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, []);


    // 

    // get all categories
    useEffect(() => {
        axios.get('/api/category/categories')
          .then((response) => {
            setcategory(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      }, []);

    //   get all nature
    useEffect(() => {
        axios.get('/api/nature/natures')
          .then((response) => {
            setnature(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      }, []);

    //   get all projects
    useEffect(() => {
        axios.get('/api/projectlibrary/projectlibraries')
          .then((response) => {
            setproject(response.data);
            console.log(response.data);
          })
          .catch((error) => {
            console.error('Error fetching users:', error);
          });
      }, []);
    // 

    const Adduser = async (e) => {
        e.preventDefault();
        // console.log(title, shortdescription, longdescription, imageupload, metatitle, metashortdescription, metalongdescription, metaimageupload)
        const formData = new FormData();

        formData.append('title', title);
        formData.append('shortdescription', shortdescription);
        formData.append('selectedcategory', selectedcategory);
        formData.append('selectednature', selectednature);


        formData.append('selectedproject', selectedproject);
        // console.log(credentials)
        formData.append('credentials', credentials);
        formData.append('approve', approve);


        formData.append('file', file);
        formData.append('image', image);

        formData.append('longdescription', longdescription);


        try {
            await axios.put('/api/libraryItem/updatelibrary/' + id, formData)
            console.log("record updated")

        } catch (err) {
            console.log(err);
        }
        window.location.reload();
        nav('../alllibrary')
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
                            <div className="container">

                                {/* main contents */}
                                <div id='k' style={{ width: '60%', marginLeft: '20%', marginTop: '4%' }}>
                                    <h1>Update Library</h1>

                                    {/* Project form */}
                                    <hr />

                                    {/*  Title  */}
                                    <form id="Add-project-from">
                                        <div class="form-group">
                                            <label class="from-label" for="title">Title:</label>
                                            <input type="text" class="form-control" id="title" value={title} name='title' placeholder="Enter title" onChange={e => setTitle(e.target.value)} />
                                        </div>

                                        {/*  Short Description  */}
                                        <div class="form-group">
                                            <label class="from-label" for="shortDescription">Short Description:</label>
                                            <input type="text" class="form-control" id="shortDescription" value={shortdescription} name='shortdescription' placeholder="Enter short description" onChange={e => setshortdescription(e.target.value)} />
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
                                        <div class="Register_from-item">
                                            <label htmlFor="usertype">Category</label><br />
                                            <select class="form-control" name='selectcategory' value={selectedcategory} onChange={e => setselectedcategory(e.target.value)}>
                                                <option selected>Select </option>
                                                {/* <option value="nature">Water,Sanitation,Hygiene(WASH)</option> */}
                                                {
                                                    category.map((i)=>(
                                                    <option value={i.name}>{i.name}</option>

                                                    ))
                                                }
                                                {/* <option value="projects">Agriculture</option>
                                                <option value="projects">Health</option>
                                                <option value="projects">Urban Settlements</option>
                                                <option value="projects">Climate Modeling & Slimulation</option> */}
                                            </select>
                                        </div>
                                        {/*  */}

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
                                            <label htmlFor="usertype">Nature</label><br />
                                            <select class="form-control" name='selectnature' value={selectednature} onChange={e => setselectdnature(e.target.value)} >
                                                <option selected>Select </option>
                                                {
                                                    nature.map((i)=>(

                                                        <option value={i.name}>{i.name}</option>
                                                    ))
                                                }
                                          
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
                                            <label htmlFor="usertype">Projects</label><br />
                                            <select class="form-control" name='selectproject' value={selectedproject} onChange={e => setselectedproject(e.target.value)} >
                                                <option selected>Select:</option>
                                                {
                                                    project.map((i)=>(

                                                        <option value={i.name}>{i.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        {/*  */}

                                        {/* Credentials Radio Buttons  */}
                                        {/* <div class="form-group">
                                            <label style={{
                                                float: "left", paddingTop: "10px", paddingBottom: "1px",
                                                fontWeight: "bolder", fontFamily: "sans-serif"
                                            }} >Credentials:</label>
                                            <div id="radio-label" >
                                                <br />
                                                <div class="form-check">
                                                    <br />
                                                    <input style={{ cursor: "pointer" }} class="form-check-input"   onChange={e => setcredentials(e.target.value)} type="radio" name="credentials" id="privateCredentials" value={credentials} /> 
                                                    <label class="form-check-label" for="privateCredentials" >Private</label>
                                                </div>
                                                <div style={{ marginLeft: "30%" }} class="form-check" >
                                                    <br />
                                                    <input style={{ cursor: "pointer" }} class="form-check-input"  onChange={e => setcredentials(e.target.value)} type="radio" name="credentials" id="publicCredentials" value={credentials}/> 
                                                    <label class="form-check-label" for="publicCredentials">Public</label>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div class="form-check-label" for="flexRadioDefault1">
                                                   credentials:
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="credentials" id="flexRadioDefault1" value={credentials} onChange={e=>setcredentials(e.target.value)} />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Private
                                            </label>
                                        </div>
                                        <div class="form-check" >
                                            <input class="form-check-input" style={{marginLeft:'10px'}} type="radio" name="credentials" id="flexRadioDefault2" value={credentials} onChange={e=>setcredentials(e.target.value)} />
                                            <label class="form-check-label" for="flexRadioDefault2" style={{marginLeft:'10px'}}>
                                                Public
                                            </label>
                                        </div>
                                        </div> */}
                                        {/* new code */}
                                        <div class="form-check-label" style={{display:'flex'}}>
                                            credentials:
                                            <div class="form-check" style={{marginLeft:'5rem'}}>
                                                <input class="form-check-input" type="radio"
                                                    name="credentials"
                                                    id="flexRadioDefault1"
                                                    value="private"
                                                    checked={credentials == 'private'}
                                                    onChange={(e) => setcredentials(e.target.value)}
                                                />
                                                    Private
                                              
                                            </div>
                                            <div class="form-check" style={{marginLeft:'3rem'}}>
                                                <input
                                                    class="form-check-input"
                                                    type="radio"
                                                    name="credentials"
                                                    id="flexRadioDefault2"
                                                    value="public"
                                                    checked={credentials == 'public'}
                                                    onChange={(e) => setcredentials(e.target.value)}
                                                />
                                                    Public
                                            </div>
                                            <br/>
                                        </div>
                                        {/* new code end */}
                                        <div class="form-check-label" style={{display:'flex'}}>
                                            Requesting :
                                            <div class="form-check" style={{marginLeft:'5rem'}}>
                                                <input class="form-check-input" type="radio"
                                                    name="approve"
                                                    id="flexRadioDefault1"
                                                    value="1"
                                                    checked={approve == '1'}
                                                    onChange={(e) => setapprove(e.target.value)}
                                                />
                                                    Approve
                                              
                                            </div>
                                            <div class="form-check" style={{marginLeft:'3rem'}}>
                                                <input
                                                    class="form-check-input"
                                                    type="radio"
                                                    name="approve"
                                                    id="flexRadioDefault2"
                                                    value="0"
                                                    checked={approve == '0'}
                                                    onChange={(e) => setapprove(e.target.value)}
                                                />
                                                    Not Approve
                                            </div>
                                        </div>
                                        {/*  File Input  */}
                                        <div class="form-group">
                                            <label style={{ marginRight: "100%",display:'flex' }} class="from-label" for="file" >File:</label> {file}
                                            <input type="file" class="form-control" id="file" onChange={e => setfile(e.target.files[0])} />
                                        </div>

                                        {/* Image Input  */}
                                        <div class="form-group">
                                            <label class="from-label" for="image" style={{ marginRight: "100%",display:'flex' }} >Image:</label>{image}
                                            <input type="file" class="form-control" id="image" onChange={e => setimage(e.target.files[0])} />
                                        </div>

                                        {/*  Long Description Textarea  */}
                                        <div class="form-group">
                                            <label class="from-label" for="longDescription">Long Description:</label>
                                            <textarea class="form-control" id="longDescription" value={longdescription} rows="2" placeholder="Enter long description" onChange={e => setlongdescription(e.target.value)} />
                                        </div>

                                        {/* Submit Button  */}
                                        <button type="submit" class="btn btn-primary form-control" onClick={Adduser}>Update Approval</button>

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

export default Updatedbysuperadmin
