/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import axios from "axios";
import NavBarAdmin from "../../../components/NavBarAdmin";
import Sidebar from "../../../components/Sidebar";
import PagesTitle from "../../../components/PagesTitle";
import Modal from "../../../components/Modal";
import { BtnDelete } from "../../../components/Button";

export default function DataKonsolAdminPages() {
    const [console, setConsole] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [pagination, setPaginations] = useState({
        current_page: 1,
        last_page: 1
    });

    const getAllConsole = async(page = 1) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/getallconsoles?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setConsole(response.data.data.data);
            setPaginations({
                current_page: response.data.data.current_page,
                last_page: response.data.data.last_page
            });
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    const deleteConsole = async(id_konsol) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://127.0.0.1:8000/api/admin/deleteconsoles/${id_konsol}`, {
                headers: {
                    "Authorization" : `Bearer ${token}`
                }
            });

            setShowModal(true);
            setMessage(response.data.message);

            // refresh the data
            getAllConsole();

            setTimeout(() => {
                setShowModal(false);
            });
        } catch(error) {
            console.error("Error : ", error);
            setShowModal(true);
            setMessage("Error! Gagal menghapus data!");
        }
    }

    useEffect(() => {
        getAllConsole()
    }, []);


    return (
        <>
            <PagesTitle title={"Data Konsol Admin"}/>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <NavBarAdmin/>
                    <div id="content">
                        <div className="content-fluid px-4">
                            <h1>Data Konsol</h1>
                            <div className="card-body">
                                <h2><Link to={'/admin/tambah_data_konsol_admin'} className="btn btn-primary">Tambah data konsol</Link></h2>
                                <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Gambar</th>
                                                <th>Nama Konsol</th>
                                                <th>Deskripsi</th>
                                                <th>Tarif Per jam</th>
                                                <th>Tersedia</th>
                                                <th>Ubah</th>
                                                <th>Hapus</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>Gambar</th>
                                                <th>Nama Konsol</th>
                                                <th>Deskripsi</th>
                                                <th>Tarif Per jam</th>
                                                <th>Tersedia</th>
                                                <th>Ubah</th>
                                                <th>Hapus</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {console.map((konsol) => (
                                                <tr key={konsol.id_konsol}>
                                                    <td><img src={`http://127.0.0.1:8000/images/${konsol.image}`} alt="" width="100" /></td>
                                                    <td>{konsol.name}</td>
                                                    <td>{konsol.description}</td>
                                                    <td>Rp. {konsol.hourly_rate}</td>
                                                    <td>{konsol.is_active}</td>
                                                    <td>
                                                        <Link to={`/admin/ubahdatakonsol/${konsol.id_konsol}`} className="btn btn-primary">Edit</Link>
                                                    </td>
                                                    <td>
                                                        <BtnDelete onClick={() => deleteConsole(konsol.id_konsol)}/>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button 
                                        className="btn btn-outline-primary mx-2"
                                        disabled={pagination.current_page === 1}
                                        onClick={() => getAllConsole(pagination.current_page - 1)}
                                    >
                                        Previous
                                    </button>
                                    <button 
                                        className="btn btn-outline-primary mx-2"
                                        disabled={pagination.current_page === pagination.last_page}
                                        onClick={() => getAllConsole(pagination.current_page + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
            </div>
        </>
    );
}