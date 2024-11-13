import React, { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebars from '../sidebar/Sidebars.js';
import "./admin.css";
import { Outlet } from 'react-router-dom';


function AdminDashboard() {

  return (
    <div className='d-flex vh-100 vw-100' style={{ overflow: "hidden" }}>
      <ToastContainer />
      <Sidebars />

      <div className='flex-grow-1 bg-g' >

        {/* navbar */}
        <nav className="navbar position-sticky bg-w shadow-sm rounded-4 mt-2 mx-2 card"
          style={{ height: "7.5vh", width: "98%" }}>
          <div className='container w-100 d-flex justify-content-center'>
            <h4 className='text-black'>Admin Dashboard</h4>
          </div>
        </nav>

        {/* child element */}
        <Suspense>
          <Outlet />
        </Suspense>

      </div >

    </div>
  );
}

export default AdminDashboard;

