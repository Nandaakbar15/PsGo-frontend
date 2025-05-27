import React from 'react'
import { Link } from 'react-router'

export default function Sidebar() {
  return (
    <>
        <div>
            <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <Link className="sidebar-brand d-flex align-items-center justify-content-center" to='/dashboardadmin'>
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
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
                    <Link className="nav-link" to="/datatransaksi" aria-expanded="true" aria-controls="collapsePages">
                        <i className="fas fa-fw fa-folder"></i>
                        <span>Data Transaksi</span>
                    </Link>
                </li>

                <hr className="sidebar-divider d-none d-md-block" />

            </ul>
        </div>
    </>
  )
}
