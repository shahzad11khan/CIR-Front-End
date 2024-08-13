/* import logo from './logo.svg'; */
import "./App.css";
import Activity from "./Components/Activity";
import Adduser from "./Components/Adduser";
import Calender from "./Components/Calender";
import Category from "./Components/Category";
import Dashboard from "./Components/Dashboard";
import Allactivities from "./Components/Getsdatafromdb/Allactivities";
import Allcalenders from "./Components/Getsdatafromdb/Allcalenders";
import Allcategory from "./Components/Getsdatafromdb/Allcategory";
import Allnatures from "./Components/Getsdatafromdb/Allnatures";
import Allnews from "./Components/Getsdatafromdb/Allnews";
import Allprojects from "./Components/Getsdatafromdb/Allprojects";
import Allusers from "./Components/Getsdatafromdb/Allusers";
import Library from "./Components/Library";
import Login from "./Components/Login";
import Nature from "./Components/Nature";
import News from "./Components/News";
import Projects from "./Components/Projects";
import { Routes, Route } from "react-router-dom";
import Updateuser from "./Components/Updates/Updateuser";
import Updateproject from "./Components/Updates/Updateproject";
import Updateactivity from "./Components/Updates/Updateactivity";
import Updatenews from "./Components/Updates/Updatenews";
import Updatecategory from "./Components/Updates/Updatecategory";
import UpdateCalender from "./Components/Updates/UpdateCalender";
import Updatenature from "./Components/Updates/Updatenature";
import Alllibrary from "./Components/Getsdatafromdb/Alllibrary";
import Updatelibrary from "./Components/Updates/Updatelibrary";
import Projectlib from "./Components/Projectlibrary";
import Allprojectforlib from "./Components/Getsdatafromdb/Allprojectforlib";
import Updateprojectlib from "./Components/Updates/Updateprojectlib";
import Superadmin from "./Components/superadmin";
import Updatedbysuperadmin from "./Components/Updates/Updatedbysuperadmin";
import Message from "./Components/Message";
import Allmesssges from "./Components/Getsdatafromdb/Allmessages";
import UpdateMessage from "./Components/Updates/UpdateMessage";
import Partners from "./Components/Partners";
import Allpartners from "./Components/Getsdatafromdb/Allpartners";
import Updatepartners from "./Components/Updates/Updatepartners";
import Currentlyhappen from "./Components/currentlyhappen";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/adduser" element={<Adduser />} />
        <Route path="/alluser" element={<Allusers />} />
        <Route path="/updateuser/:id" element={<Updateuser />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/project" element={<Projects />} />
        <Route path="/allproject" element={<Allprojects />} />
        <Route path="/Updates/updateproject/:id" element={<Updateproject />} />

        <Route path="/activity" element={<Activity />} />
        <Route path="/allactivity" element={<Allactivities />} />
        <Route
          path="/Updates/Updateactivity/:id"
          element={<Updateactivity />}
        />

        <Route path="/library" element={<Library />} />
        <Route path="/alllibrary" element={<Alllibrary />} />
        <Route path="/Updates/Updatelibrary/:id" element={<Updatelibrary />} />

        <Route path="/news" element={<News />} />
        <Route path="/allnews" element={<Allnews />} />
        <Route path="/Updates/Updatenews/:id" element={<Updatenews />} />

        <Route path="/Currentlyhappen" element={<Currentlyhappen />} />

        <Route path="/category" element={<Category />} />
        <Route path="/allcategory" element={<Allcategory />} />
        <Route
          path="/Updates/Updatecategory/:id"
          element={<Updatecategory />}
        />

        <Route path="/nature" element={<Nature />} />
        <Route path="/allnature" element={<Allnatures />} />
        <Route path="/Updates/Updatenature/:id" element={<Updatenature />} />

        <Route path="/calender" element={<Calender />} />
        <Route path="/allcalender" element={<Allcalenders />} />
        <Route
          path="/Updates/UpdateCalender/:id"
          element={<UpdateCalender />}
        />

        <Route path="/projectlib" element={<Projectlib />} />
        <Route path="/allprojectlib" element={<Allprojectforlib />} />
        <Route
          path="/Updates/Updateprojectlib/:id"
          element={<Updateprojectlib />}
        />

        <Route path="/superadmin" element={<Superadmin />} />
        <Route
          path="/Updates/Updatedbysuperadmin/:id"
          element={<Updatedbysuperadmin />}
        />

        <Route path="/message" element={<Message />} />
        <Route path="/allmessage" element={<Allmesssges />} />
        <Route path="/Updates/UpdateMessage/:id" element={<UpdateMessage />} />

        <Route path="/partner" element={<Partners />} />
        <Route path="/allpartner" element={<Allpartners />} />
        <Route
          path="/Updates/Updatepartners/:id"
          element={<Updatepartners />}
        />
      </Routes>
    </>
  );
}

export default App;
