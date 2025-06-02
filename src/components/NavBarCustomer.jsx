import React from "react";
import { Link } from "react-router";

export default function CustomerNavbar() {
    return (
        <div>
            {/* Navbar */}
            <nav className="navbar-customer">
                <div className="container-navbar">
                    <div className="logo">
                        <h1>PsGo</h1>
                    </div>
                    <ul className="nav-links">
                        <li><Link to="/dashboardcustomer">Beranda</Link></li>
                        <li><Link to="/customer/produk">Konsol</Link></li>
                        <li><Link to="/customer/aksesoris">Aksesoris</Link></li>
                        <li><Link to="/customer/pesanan">Pesanan</Link></li>
                        <li><Link to="/customer/akun">Akun</Link></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
