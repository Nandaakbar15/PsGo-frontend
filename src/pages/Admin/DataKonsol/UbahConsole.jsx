import React, { useEffect, useState } from "react";
import PagesTitle from "../../../components/PagesTitle";
import axios from "axios";
import Modal from "../../../components/Modal";
import { Link, useNavigate, useParams } from "react-router";
import { BtnBack, BtnChange } from "../../../components/Button";
import NavBarAdmin from "../../../components/NavBarAdmin";
import Sidebar from "../../../components/Sidebar";

export default function UbahDataKonsolAdmin() {
    const {id_konsol} = useParams();
    const [nameConsole, setNameConsole] = useState("");
    const [description, setDescription] = useState("");
    const [hourly_rate, setHourlyRate] = useState("");
    const [is_active, setIsActive] = useState("");
    const [image, setImages] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImages(file);
        setPreview(URL.createObjectURL(file)); // Membuat preview dari file yang dipilih
    };

    useEffect(() => {
        const getAllConsoleById = async() => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://127.0.0.1:8000/api/admin/getallconsoles/${id_konsol}`, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });
                const {name, description, hourly_rate, is_active, image} = response.data.console;
                setNameConsole(name);
                setDescription(description);
                setHourlyRate(hourly_rate);
                setIsActive(is_active);
                setImages(null);
                setPreview(image ? `http://127.0.0.1:8000/images/${image}` : null);
            } catch(error) {
                console.error("Error : ", error);
            }
        }
        
        getAllConsoleById();
    }, [id_konsol]);

    const updateConsole = async(e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            const token = localStorage.getItem("token");
            formData.append("name", nameConsole);
            formData.append("description", description);
            formData.append("hourly_rate", hourly_rate);
            formData.append("is_active", is_active);
            formData.append('_method', 'PUT');
            if(image) {
                formData.append("image", image);
            }
            const response = await axios.post(`http://127.0.0.1:8000/api/admin/updateconsoles/${id_konsol}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data',
                    'Authorization' : `Bearer ${token}`
                }
            });

            setShowModal(true);
            setMessage(response.data.message);

            setTimeout(() => {
                setShowModal(false);
                navigate('/admin/data_konsol_admin');
            }, 2000);
        } catch(error) {
            console.error("Error : ", error);
            setMessage("Error! Could not update the data!")
        }
    }

    return (
        <>
            <PagesTitle title={'Form ubah data konsol admin'}/>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <NavBarAdmin/>
                    <div className="content-fluid px-4">
                        <h1>Form ubah data konsol</h1>
                        <form onSubmit={updateConsole}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Nama Konsol</label>
                                <input type="text" className="form-control" id="name" name="name" value={nameConsole} onChange={(e) => setNameConsole(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="hourly_rate" className="form-label">Tarif Perjam</label>
                                <input type="number" className="form-control" name="hourly_rate" id="hourly_rate" value={hourly_rate} onChange={(e) => setHourlyRate(e.target.value)}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="is_active">Status Konsol</label>
                                <br />
                                <select name="is_active" id="is_active" value={is_active} onChange={(e) => setIsActive(e.target.value)}>
                                    <option value="">--Pilih Status--</option>
                                    <option value="1">Tersedia</option>
                                    <option value="0">Tidak tersedia</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image">Gambar</label>
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

                            <Link to={'/admin/data_konsol_admin'}>
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