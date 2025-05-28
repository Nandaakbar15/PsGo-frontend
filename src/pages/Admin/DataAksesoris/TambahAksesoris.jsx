import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import NavBarAdmin from "../../../components/NavBarAdmin";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { BtnAdd, BtnBack } from "../../../components/Button";
import Modal from "../../../components/Modal";
import PagesTitle from "../../../components/PagesTitle";

export default function FormTambahAksesoris() {
    const [namaAksesoris, setNamaAksesoris] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [stok, setStok] = useState("");
    const [harga, setHarga] = useState("");
    const [gambar, setGambar] = useState(null);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const addAccesoris = async(e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("nama_aksesoris", namaAksesoris);
            formData.append("deskripsi", deskripsi);
            formData.append("stok", stok);
            formData.append("harga", harga);
            formData.append("gambar", gambar);

            const response = await axios.post("http://127.0.0.1:8000/api/admin/addaccesories", formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                    'Authorization' : `Bearer ${token}`
                }
            });

            setShowModal(true);
            setMessage(response.data.message);

            // clear the form or the data
            setNamaAksesoris("");
            setDeskripsi("");
            setHarga("");
            setStok("");
            setGambar(null);

            setTimeout(() => {
                setShowModal(false);
                navigate('/admin/data_aksesoris_admin');
            })

        } catch(error) {
            console.error("Error : ", error);
            setShowModal(true);
            setMessage("Error! Could not add the data!");
        }
    }

    return (
        <>
            <PagesTitle title={'Form Tambah Aksesoris'}/>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <NavBarAdmin/>
                    <div className="content-fluid px-4">
                        <h1>Form tambah aksesoris</h1>
                        <form onSubmit={addAccesoris}>
                            <div className="mb-3">
                                <label htmlFor="nama_aksesoris" className="form-label">Nama Aksesoris</label>
                                <input type="text" className="form-control" id="nama_aksesoris" name="nama_aksesoris" value={namaAksesoris} onChange={(e) => setNamaAksesoris(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                                <input type="text" className="form-control" id="deskripsi" name="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stok" className="form-label">Stok</label>
                                <input type="number" className="form-control" id="stok" name="stok" value={stok} onChange={(e) => setStok(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="harga" className="form-label">Harga</label>
                                <input type="number" className="form-control" id="harga" name="harga" value={harga} onChange={(e) => setHarga(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gambar" className="form-label">Gambar</label>
                                <input type="file" className="form-control" id="gambar" name="gambar" onChange={(e) => setGambar(e.target.files[0])}/>
                            </div>
                            <div className="mb-3">
                                <BtnAdd/>
                            </div>

                            <Link to={'/admin/data_aksesoris_admin'}>
                                <BtnBack/>
                            </Link>
                        </form>
                    </div>
                </div>
                {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
            </div>
        </>
    );
}