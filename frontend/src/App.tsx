import React, { Fragment, useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// import Users from "./components/Users";

// import UserCreate from "./components/UserCreate";

import Login from "./components/Login";
import ScheduleCreate from "./components/Schedule/ScheduleCreate";
import ScheduleShow from "./components/Schedule/ScheduleShow";
import DoctorCreate from "./components/Manage_Information/DoctorCreate";
import DoctorShow from "./components/Manage_Information/DoctorShow";
import Borrow from "./components/BorrowMed_Equipment/Borrow";
import Borrowed from "./components/BorrowMed_Equipment/Borrowed";
import PatientsShow from "./components/Patient_Doctor/PatientShow";
import PatientCreate from "./components/Patient_Doctor/PatientCreate";
import LeaveCreate from "./components/LeaveMed/LeaveCreate";
import LeaveShow from "./components/LeaveMed/LeaveShow";
import OvertimeCreate from "./components/OverTime/OvertimeCreate";
import OvertimeShow from "./components/OverTime/OvertimeShow";
import SignIn from "./components/Login";
import Home from "./components/Home";



export default function App() {

  const [token, setToken] = useState<String>("");

  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setRole(localStorage.getItem("role") || "");
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

return (

  <Router>
    {
      token && (
        <Fragment>
             <Navbar />
             <Routes>
              {
              role === "Doctor" && (
                <>
                <Route path="/Borrow" element={<Borrowed/>} />
                <Route path="/Borrowshow" element={<Borrow />} />

                <Route path="/Overtime" element={<OvertimeCreate />} />
                <Route path="/OvertimeShow" element={<OvertimeShow />} />

                <Route path="/Patient" element={<PatientCreate />} />
                <Route path="/PatientShow" element={<PatientsShow />} />

                <Route path="/Schedule" element={<ScheduleCreate />} />
                <Route path="/ScheduleShow" element={<ScheduleShow />} />

                <Route path="/Leave" element={<LeaveCreate />} />
                <Route path="/LeaveShow" element={<LeaveShow />} />
                </>
              )
              }
              {
                role === "Admin" && (
                  <>
                  <Route path="/Doctor" element={<DoctorCreate />} />
                  <Route path="/DoctorShow" element={<DoctorShow />} />
                  </>
                )
              }
            </Routes>
        </Fragment>)}
  </Router>

);

}