import React, { useEffect, useState } from "react";

import axios from "axios";
import PagesTitle from "../../../components/PagesTitle";
import Sidebar from "../../../components/Sidebar";
import NavBarAdmin from "../../../components/NavBarAdmin";

export default function DataUserAdmin() {
    const [users, setUsers] = useState([]);

    const getAllUsers = async() => {
        try {
            const token = localStorage.getItem("token"); // get the token from the api
            const response = await axios.get("http://127.0.0.1:8000/api/admin/getallusers", {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });
            setUsers(Object.values(response.data.data));
        } catch(error) {
            console.error("Error : ", error);
            document.writeln("<h2>Could not fetch the data!</h2>");
        }
    }

    useEffect(() => {
        getAllUsers();   
    }, []);

    return (
        <>
            <PagesTitle title={'Data User'}/>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <NavBarAdmin/>
                    <div className="content-fluid px-4">
                        <h1>Data User</h1>
                        <div className="table-responsive">
                           <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Aksi</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button type="submit" className="btn btn-danger">Hapus</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}