import React, { useEffect, useState } from 'react';
import '../css/Dashboard.css';
import Sidebar from '../Sidebar';
import Top from '../Top';
import '../css/style.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import '../css/joditeditor.css'





function Allusers() {
  const [users, setUsers] = useState([]);
  const type = localStorage.getItem('type')
// 
const itemsPerPage = 10;
const [searchInput, setSearchInput] = useState('');
const [currentPage, setCurrentPage] = useState(0);
const filteredData = users.filter((user) =>
  user.username.toLowerCase().includes(searchInput.toLowerCase())
);
const totalPages = Math.ceil(filteredData.length / itemsPerPage);
const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedItems = filteredData.slice(startIndex, endIndex);

const handleSearchChange = (e) => {
  setSearchInput(e.target.value);
  setCurrentPage(0); // Reset to the first page when searching
};

const handlePageChange = (selectedPage) => {
  setCurrentPage(selectedPage.selected);
};
// 


  const nav=useNavigate();

//

function getuser(){
  axios.get(`${process.env.REACT_APP_API_KEY}/users/getallusers`)
  .then((response) => {
    setUsers(response.data);
  })
  .catch((error) => {
    console.error('Error fetching users:', error);
  });
}
// 


  useEffect(() => {
    getuser();
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
        nav('/')
    }
   
  }, []);

  const Deletehandler = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_KEY}/users/delete/`+id,{timeout:1000})
      console.log("user deleted");

    } catch (err) {
      console.log(err);
      
    }
    console.log("user deleted");
    toast.success("User deleted");
    // window.location.reload();
    getuser();

  
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

                <div className='k'>
                  <table class="table display" id="example" >
                    <thead>
                      <tr>
                        <td style={{ textAlign: 'center' }}>
                          Search User With Username
                        </td>
                        <td colSpan={4}>
                          <input
                            class="form-control"
                            type="text"
                            placeholder="Search items"
                            value={searchInput}
                            onChange={handleSearchChange}
                          />
                        </td>
                        </tr>

                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Email</th>
                            <th scope="col">UserType</th>
                            {
                              type && type == "user" ?(''):(<th scope="col">Actions</th>)
                            }
                            
                          </tr>

                    </thead>
                    <tbody>
                    {displayedItems.map((user,index) => (
                      <tr >
                        <th scope="row">{index+1}</th>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.usertype}</td>
                        {

                        type && type == "user" ?(''):( <td>
                          <Link to={`/updateuser/${user._id}`} className='btn btn-primary'>Edit Record</Link>
                          <input type='button' value="Delete" className='btn btn-danger' onClick={e=>Deletehandler(user._id)} style={{ marginLeft: '10px' }} />
                        </td>)
                        }

                       
                      </tr>
                       ))}

                    </tbody>
                  </table>
                  {/* paginator */}
                  <ReactPaginate
                    previousLabel={<button className='btn btn-outline-primary'>'Previous'</button>}
                    nextLabel={<button className='btn btn-outline-primary'>'Next'</button>}
                    breakLabel={'...'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageChange}
                    containerClassName={'pagination justify-content-center'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  />
                  
                  {/* end paginator */}
                </div>
                {/* end of the contents */}

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

export default Allusers;
