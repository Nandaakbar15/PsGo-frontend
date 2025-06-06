import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios';

export default function Sidebar() {
  const [user, setUser] = useState([]);
  
  const getUser = async() => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
            headers: {
                Authorization : `Bearer ${token}`
            }
        });
        setUser(response.data);
    } catch(error) {
        console.error("Error : ", error);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to='/dashboardadmin'>
                    <div className="sidebar-brand-icon rotate-n-15">
                        <img src="/img/ps logo.png" alt="" width={'60px'} height={'60px'}/>
                    </div>
                    <div className="sidebar-brand-text mx-3">PsGo</div>
                </Link>

                <li className="nav-item active">
                    <Link className="nav-link" to="/dashboardadmin">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </Link>
                </li>


                <div className="sidebar-heading">
                    Master Data
                </div>

                <li className="nav-item">
                    <Link className="nav-link" to="/admin/data_user_admin">
                        <i className="fas fa-fw fa-cog"></i>
                        <span>Data User</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/admin/data_konsol_admin">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Data Konsol</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/admin/data_aksesoris_admin">
                        <i className="fas fa-fw fa-table"></i>
                        <span>Data Aksesoris</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/admin/data_booking_admin" aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Data Booking</span>
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link" to="/admin/data_transaksi" aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Data Transaksi</span>
                    </Link>
                </li>

                <hr className="sidebar-divider d-none d-md-block" />
                <div className="text-center d-none d-md-inline">
                    <p className='text-white'>Login as : <br />{user.username}</p>
                </div>
            </ul>
        </div>
    </>
  )
}
