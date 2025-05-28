import React, { useEffect, useState } from "react";
import PagesTitle from "../../../components/PagesTitle";
import Sidebar from "../../../components/Sidebar";
import NavBarAdmin from "../../../components/NavBarAdmin";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";
import { BtnBack, BtnChange } from "../../../components/Button";
import Modal from "../../../components/Modal";


export default function FormUbahAksesoris() {
    const {id_aksesoris} = useParams();
    const [namaAksesoris, setNamaAksesoris] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [stok, setStok] = useState("");
    const [harga, setHarga] = useState("");
    const [gambar, setGambar] = useState(null);
    const [preview, setPreview] = useState(null);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setGambar(file);
        setPreview(URL.createObjectURL(file)); // Membuat preview dari file yang dipilih
    };

    
    

    useEffect(() => {
        const getallaccesoriesById = async() => {
            try {
                const token = localStorage.getItem("token");   
                const response = await axios.get(`http://127.0.0.1:8000/api/admin/getallaccesories/${id_aksesoris}`, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });

                const {nama_aksesoris, deskripsi, stok, harga, gambar} = response.data.accesories;
                setNamaAksesoris(nama_aksesoris);
                setDeskripsi(deskripsi);
                setStok(stok);
                setHarga(harga);
                setGambar(null);
                setPreview(gambar ? `http://127.0.0.1:8000/images/${gambar}` : null);
            } catch(error) {
                console.error("Error : ", error);
            }
        }
        getallaccesoriesById();
    }, [id_aksesoris]);

    const updateAksesoris = async(e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("nama_aksesoris", namaAksesoris);
            formData.append("deskripsi", deskripsi);
            formData.append("stok", stok);
            formData.append("harga", harga);
            formData.append("_method", "PUT");
            if(gambar) {
                formData.append("gambar", gambar);
            }

            const response = await axios.post(`http://127.0.0.1:8000/api/admin/updateaccesories/${id_aksesoris}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                    'Authorization' : `Bearer ${token}`
                }
            });

            setShowModal(true);
            setMessage(response.data.message);

            setTimeout(() => {
                setShowModal(false);
                navigate('/admin/data_aksesoris_admin');
            }, 2000)
        } catch(error) {
            console.error("Error : ", error);
            setShowModal(true);
            setMessage("Error! Could not update the data");
        }
    }

    return (
        <>
            <PagesTitle title={'Form Ubah Data Aksesoris'}/>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <NavBarAdmin/>
                    <div className="content-fluid px-4">
                        <h1>Form Ubah Aksesoris</h1>
                        <form onSubmit={updateAksesoris}>
                            <div class="mb-3">
                                <label htmlFor="nama_aksesoris" className="form-label">Nama Aksesoris</label>
                                <input type="text" class="form-control" id="nama_aksesoris" name="nama_aksesoris" value={namaAksesoris} onChange={(e) => setNamaAksesoris(e.target.value)}/>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="deskripsi" className="form-label">Deskripsi</label>
                                <input type="text" className="form-control" id="deskripsi" name="deskripsi" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stok" className="form-label">Stok</label>
                                <input type="number" className="form-control" id="stok" name="stok" value={stok} onChange={(e) => setStok(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="harga" className="form-label">Harga</label>
                                <input type="number"  className="form-control" name="harga" id="harga" value={harga}  onChange={(e) => setHarga(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gambar">Gambar</label>
                                {preview && (
                                    <div>
                                        <img src={preview} alt="" width="100"/>
                                        <input type="file" className="form-control" id="image" name="image" onChange={handleFileChange} />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <BtnChange/>
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