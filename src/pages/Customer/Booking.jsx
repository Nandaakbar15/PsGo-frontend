import React, { useEffect, useState } from "react";
import PagesTitle from "../../components/PagesTitle";
import CustomerNavbar from "../../components/NavBarCustomer";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import Modal from "../../components/Modal";


export default function BookingPages() {
    const {id_konsol} = useParams();
    const [products, setProducts] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [duration, setDurations] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const getProducts = async() => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://127.0.0.1:8000/api/customer/detailProducts/${id_konsol}`, {
                    headers: {
                        Authorization : `Bearer ${token}`
                    }
                });

                // console.log("API Reponse" ,response.data);

                setProducts(response.data.console);

            } catch(error) {
                console.error("Error : ", error);
            }
        }

        getProducts();
    }, [id_konsol]);

    const handleBooking = async(e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post("http://127.0.0.1:8000/api/customer/booking", {
                id_konsol,
                start_time: startTime,
                duration_in_hours: duration
            }, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

            setShowModal(true);
            setMessage(response.data.message);

            setTimeout(() => {
                setShowModal(false);
                navigate("/customer/listbooking");
            });
        } catch(error) {
            console.error("Error : ", error);
        }
    } 

    

    return (
        <>
            <PagesTitle title={'Booking'}/>
            <CustomerNavbar/>
            <div className="container mt-3">
                <div className="row mt-3">
                    <h1>Booking Playstation</h1>
                    {products && (
                        <div className="mb-4">
                            <h4>{products.name}</h4>
                            <img src={`http://127.0.0.1:8000/images/${products.image}`} alt="" width={'100px'}/>
                            <p>Harga perjamnya : Rp. {products.hourly_rate}</p>
                            <p>Deskripsi : {products.description}</p>
                        </div>
                    )}
                    <form onSubmit={handleBooking}>
                    <div className="mb-3">
                        <label htmlFor="startTime" className="form-label">Tanggal mulai booking</label>
                        <input type="datetime-local" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value.replace("T", " ") + ":00")}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="durations" className="form-label">Durasi perjam</label>
                        <input type="number" className="form-control" value={duration} onChange={(e) => setDurations(e.target.value)} min={1}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Booking sekarang!</button>
                    </form>
                </div>
                {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
            </div>
        </>
    );
}