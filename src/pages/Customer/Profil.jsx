import React, { useEffect, useState } from "react";
import axios from "axios";
import PagesTitle from "../../components/PagesTitle";
import CustomerNavbar from "../../components/NavBarCustomer";
import { Link } from "react-router";

export default function ProfilPages() {
    const [user, setUser] = useState(null);

    const getUsers = async() => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://127.0.0.1:8000/api/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setUser(response.data);
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    if (!user) {
        return <p className="text-center mt-5">Loading profile...</p>;
    }

    return (
        <>
            <PagesTitle title={'Profil'}/>
            <CustomerNavbar/>
            <div className="container">
                <div className="row">
                    <div className="container py-5">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6">
                                <div className="card shadow-sm">
                                    <div className="card-body text-center">
                                        <img src="https://via.placeholder.com/150" alt="Profile Image" className="profile-img mb-3" />
                                        <h4 className="card-title">{user.name}</h4>
                                        <p className="card-text">Selamat datang kembali, {user.name}! Ini adalah halaman profil kamu.</p>
                                        <hr/>
                                        <ul className="list-group list-group-flush text-start">
                                            <li className="list-group-item"><strong>Email: </strong> {user.email}</li>
                                        </ul>
                                        <div className="mt-4">
                                            <a href="#" className="btn btn-primary">Edit Profile</a>
                                            <a href="#" className="btn btn-outline-secondary">Settings</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to={'/login'} className="justify-center m">
                                <button className="btn btn-danger">Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}