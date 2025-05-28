import React, { useEffect, useState } from "react";
import NavBarAdmin from "../../../components/NavBarAdmin";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import { Link} from "react-router";
import { BtnDelete } from "../../../components/Button";
import Modal from "../../../components/Modal";
import PagesTitle from "../../../components/PagesTitle";


export default function DataAksesorisAdmin() {
    const [aksesoris, setAksesoris] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");

    const getAllAksesoris = async() => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://127.0.0.1:8000/api/admin/getallaccesories", {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });

            setAksesoris(Object.values(response.data.data));
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    const deleteAksesoris = async(id_aksesoris) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://127.0.0.1:8000/api/admin/deleteaccesories/${id_aksesoris}`, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            });

            setShowModal(true);
            setMessage(response.data.message);

            // refresh the data
            getAllAksesoris();

            setTimeout(() => {
                setShowModal(false);
            }, 2000);
            
        } catch(error) {
            console.error("Error : ", error);
            setShowModal(true);
            setMessage("Gagal Menghapus data!");
        }
    }


    useEffect(() => {
        getAllAksesoris();
    }, []);

    return (
        <>
            <PagesTitle title={'Data Aksesoris Admin'}/>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <NavBarAdmin/>
                    <div className="content-fluid px-4">
                        <h1>Data Aksesoris</h1>

                        <h2><Link to={'/admin/tambah_data_aksesoris'} className="btn btn-primary">Tambah data aksesoris</Link></h2>
                        <div className="table-responsive">
                            <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th>Gambar</th>
                                        <th>Nama Aksesoris</th>
                                        <th>Deskripsi</th>
                                        <th>Stok</th>
                                        <th>Harga</th>
                                        <th>Edit</th>
                                        <th>Hapus</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th>Gambar</th>
                                        <th>Nama Aksesoris</th>
                                        <th>Deskripsi</th>
                                        <th>Stok</th>
                                        <th>Harga</th>
                                        <th>Edit</th>
                                        <th>Hapus</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    {aksesoris.map((data => (
                                        <tr key={data.id_aksesoris}>
                                            <td><img src={`http://127.0.0.1:8000/images/${data.gambar}`} width="100"/></td>
                                            <td>{data.nama_aksesoris}</td>
                                            <td>{data.deskripsi}</td>
                                            <td>{data.stok}</td>
                                            <td>Rp. {data.harga}</td>
                                            <td>
                                                <Link to={`/admin/ubah_data_aksesoris/${data.id_aksesoris}`} className="btn btn-primary">Edit</Link>
                                            </td>
                                            <td>
                                                <BtnDelete onClick={() => deleteAksesoris(data.id_aksesoris)}/>
                                            </td>
                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
            </div>
        </>
    );
}