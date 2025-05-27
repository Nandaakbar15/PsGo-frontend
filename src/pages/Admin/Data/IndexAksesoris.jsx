import React, { useEffect, useState } from "react";
import NavBarAdmin from "../../../components/NavBarAdmin";
import Sidebar from "../../../components/Sidebar";
import axios from "axios";
import { Link } from "react-router";

export default function DataAksesorisAdmin() {
    const [aksesoris, setAksesoris] = useState([]);

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


    useEffect(() => {
        getAllAksesoris();
    }, []);

    return (
        <>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <NavBarAdmin/>
                    <div className="content-fluid px-4">
                        <h1>Data Aksesoris</h1>

                        <h2><Link to={'/admin/tambah_data_aksesoris'} className="btn btn-primary">Tambah data aksesoris</Link></h2>
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
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
                                                <Link to={`/admin/ubahdatakonsol/${data.id_aksesoris}`} className="btn btn-primary">Edit</Link>
                                            </td>
                                            <td>
                                                <button type="submit" className="btn btn-danger">Hapus!</button>
                                            </td>
                                        </tr>
                                    )))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}