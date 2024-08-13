import React from 'react'
import { useNavigate } from 'react-router-dom';


const Logout = () => {
    const nav=useNavigate();
    // const handleLogout = () => {
    //     // Clear the token cookie
    //     document.cookie = 'usertoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure;';
      
    //     // Clear localStorage items
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('username');
    //     localStorage.removeItem('type');
      
    //     // Redirect or perform other actions as needed
    //     nav('/');
    //     window.location.reload();
    //   };
      
  return (
    <div>
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
                                {/* <input type='button' className="btn btn-primary" onClick={handleLogout} value='Logout'/> */}
                            </div>
                        </div>
                    </div>
                </div>
    </div>
  )
}

export default Logout
