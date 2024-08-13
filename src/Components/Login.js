import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import './css/Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Img from './images/GCISC-Vertical-Logo.png'


const Login = () => {
    const [isDbConnected, setIsDbConnected] = useState(false);
    const [forcheck,setforchect]=useState('')

    const checklocalstorage = () =>{
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            nav('/dashboard')
        }else{
            nav('/')
        }
    }

    useEffect(()=>{
        checklocalstorage();
       axios.get('/Justcheck').then((res)=>{
        setforchect(res.data.message)
        }
        )
        .catch((error)=>{console.log(error)})
    },[])

    useEffect(() => {
        // Make a request to your server to check the DB connection status
        fetch(`${process.env.REACT_APP_API_KEY}/api/connect/check-db-connection`)
            .then((response) => response.json())
            .then((data) => {
                setIsDbConnected(data.connected);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    const nav = useNavigate();
    //
    // const [passshow,setpasshow]=useState(false)

    const [inputval, setinputval] = useState({
        email: '',
        password: ''
    })
    // console.log(inputval);

    const setval = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target
        setinputval(() => {
            return {
                ...inputval,
                [name]: value
            }
        })
    }

    const [isChecked, setIsChecked] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
    // login button function
    const loginfun = async (e) => {
        e.preventDefault();
        const { email, password } = inputval

        if (email === "" || !email.includes('@')) {
            // alert("Please fill the email inputfield")
            toast.warning("Fill the email...")
        } else if (password === "") {
            // alert("Please fill the password")
            toast.warning("Enter password...")

        } else if (!isChecked){
            toast.warning(`Please accept "User Agreement"`)
        }else {
            // console.log(`loged in successfully... ${email} , ${password}`);
            const dataToSend = { email, password }
            // alert(`Congratulation you are loged in successfully... ${email} , ${password}`)
            axios.post(`${process.env.REACT_APP_API_KEY}/users/login`, dataToSend)
                .then(response => {
                    //   console.log('Data sent successfully',response.data);
                    //   console.log('Data sent successfully',response.data.result);
                    //   console.log('Data sent successfully',response.data.result.token);
                    //   console.log('Data sent successfully',response.data.user);
                    console.log(response.data.userr)
                    const username = response.data.userr;
                    console.log(username)
                    const token = response.data.result.token;
                    console.log(token)
                    const usernamee = username.user;
                    console.log(usernamee)
                    const permissions = username.permissions;
                    console.log(permissions)
                    console.log(response.data.status)
                    const log=response.data.status
                    console.log(response.data.userr.type)

                    const type = response.data.userr.type
                    if (log === 201 || token !== "") {
                        localStorage.setItem('username', usernamee);
                        localStorage.setItem('token', token);
                        localStorage.setItem('type', type);
                        localStorage.setItem('permissions', permissions);
                        console.log("user login successfully")
                        toast.success("User Login Successfully")
                        setTimeout(() => {
                            //     window.location.reload();

                            nav('/dashboard')
                        }, 1500)
                    }
                })
                .catch(error => {
                    // showerror("Check Your Email Or Password Please")
                    console.log("not login user")
                    console.error('Error sending data', error);
                    toast.warning("Check Your Email Or Password Please")
                    // setTimeout(()=>{
                    //     window.location.reload();
                    // },1500)
                });
        }
    }

    //
    return (
        <div id="container">

            <form id="Loginfrom" >
                {/* <h4 className='text-center'>{forcheck}</h4> */}
                
                {/* <h3>
                    {isDbConnected ? (
                            <p className='text-center'>Database is connected</p>
                       
                    ) : (
                        <p className='text-center'>Database is not connected</p>
                    )}
                </h3> */}
                <h4 style={{ textAlign: 'center',paddingTop:'30px' }}>GCISC</h4>
                <div className='form-img text-center'>
                <img src={Img} style={{ borderRadius: '50%', height: '10rem', textAlign: 'center' , width:'15rem'}} alt='this is logo' />
                </div>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <hr />
                <div class="Login-from-item">
                    <label for="email">Email address</label>
                    <input type="email" class="form-control" name="email" onChange={setval} placeholder="Enter email" required />
                </div>
                <div class="Login-from-item" >
                    <label for="username">Password</label>
                    <input type="password" class="form-control" name="password" onChange={setval} placeholder="Password" required />
                </div>
                <div class="Login-from-item" style={{display:'flex'}}>
                <input type="checkbox" id="acceptAgreements" name="acceptAgreements"  checked={isChecked}
          onChange={handleCheckboxChange} required />
                 <label for="acceptAgreements" style={{marginLeft:'3rem'}}>I Accept <a href='#'>User Agreement</a></label>
                </div>
                <hr id="Line"></hr>
                <div class="Login-from-item">
                    <button type="submit" class="btn btn-primary form-control" onClick={loginfun}>Login</button>
                </div>
                {/* <div class="Login-from-item">
                    <button type="button" class="btn btn-success form-control" >Create New Account</button>
                </div> */}
            </form>
        </div>
    );
}
export default Login;