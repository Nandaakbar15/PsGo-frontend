import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import NavBarAdmin from '../../../components/NavBarAdmin'
import axios from 'axios'
import { Link, useNavigate } from 'react-router'
import PagesTitle from '../../../components/PagesTitle';
import { BtnAdd, BtnBack } from '../../../components/Button'
import Modal from '../../../components/Modal'

export default function TambahConsole() {

  const [nameConsole, setNameConsole] = useState("");
  const [description, setDescription] = useState("");
  const [hourly_rate, setHourly_rate] = useState("");
  const [is_active, setIsActive] = useState("");
  const [image, setiImage] = useState(null);
  const [message, setMessage] = useState();
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  
  const AddConsole = async(e) => {
    
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("name", nameConsole);
        formData.append("description", description);
        formData.append("hourly_rate", hourly_rate);
        formData.append("is_active", is_active);
        formData.append("image", image);


        const token = localStorage.getItem("token");

        const response = await axios.post("http://127.0.0.1:8000/api/admin/addconsoles",formData, {
            headers: {
                'Content-Type' : 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        });

        setShowModal(true);
        setMessage(response.data.message);

        // clear the data or the form
        setNameConsole("");
        setDescription("");
        setHourly_rate("");
        setIsActive("");
        setiImage(null);

        // Alihkan ke halaman data konsol
        setTimeout(() => {
            setShowModal(false);
            navigate("/admin/data_konsol_admin");
        }, 2000);
    } catch(error) {
        console.error("Error : ", error);
        setMessage("Error! Could not add the data!");
    }
  }

  return (
    <>
        <PagesTitle title={"Form tambah data konsol"}/>
        <div id="wrapper">
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <NavBarAdmin/>
                <div id="content">
                    <div className="content-fluid px-4">
                        <div className="card-body">
                            <h1>Form Tambah Data Konsol</h1>
                            <form onSubmit={AddConsole}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nama Konsol</label>
                                    <input type="text" className="form-control" id="name" name='name' placeholder='masukan nama konsol' value={nameConsole} onChange={(e) => setNameConsole(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Deskripsi Konsol</label>
                                    <input type="text" className="form-control" name='description' id="description" placeholder='masukan deskripsi konsol' value={description} onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="hourly_rate" className="form-label">Tarif perjam</label>
                                    <input type="number" className="form-control" name='hourly_rate' id="hourly_rate" placeholder='masukan tarif perjamnya' value={hourly_rate} onChange={(e) => setHourly_rate(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="is_active" className="form-label">Status Konsol</label>
                                    <br />
                                    <select name="is_active" id="is_active" value={is_active} onChange={(e) => setIsActive(e.target.value)}>
                                        <option value="">--Pilih Status--</option>
                                        <option value="1">Tersedia</option>
                                        <option value="0">Tidak tersedia</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className='form-label'>Gambar Konsol</label>
                                    <input type="file" className='form-control' name='image' id='image' placeholder='masukan gambar' onChange={(e) => setiImage(e.target.files[0])}/>
                                </div>
                                <div className="mb-3">
                                    <BtnAdd/>
                                </div>

                                <Link to={'/admin/data_konsol_admin'}>
                                    <BtnBack/>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
        </div>
    </>
  )
}
