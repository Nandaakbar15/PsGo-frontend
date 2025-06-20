/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import PagesTitle from "../../components/PagesTitle";
import CustomerNavbar from "../../components/NavBarCustomer";
import axios from "axios";
import { useParams } from "react-router";
import { BtnCancel } from "../../components/Button";
import Modal from "../../components/Modal";

export default function ListBookingPages() {
    const [bookings, setBookings] = useState([]);
    // const {id_booking} = useParams();
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");

    const getListBookings = async() => {
        try {
            const token = localStorage.getItem("token");
            
            // console.log("Token : ", token);

            const response = await axios.get("http://127.0.0.1:8000/api/customer/getBooking", {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

            setBookings(response.data.data);
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    const cancelBooking = async(id_booking) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://127.0.0.1:8000/api/customer/cancelBooking/${id_booking}`, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

            setShowModal(true);
            setMessage(response.data.message);

            // refresh the data
            getListBookings();

            setTimeout(() => {
                setShowModal(false);
            }, 2000);
        } catch(error) {
            console.error("Error", error);
            console.error("Detail Error : ", error.response?.data);
            setMessage("Gagal cancel booking");
            setShowModal(true);
        }
    }

    useEffect(() => {
        getListBookings()
    }, []);

    return (
        <>
            <PagesTitle title={'List Booking'}/>
            <CustomerNavbar/>
            <div className="container mt-3">
                <div className="row mt-3">
                    <h3>List Riwayat Booking</h3>
                    {bookings.map((booking, index) => (
                    <div className="card mb-3" style={{ maxWidth: "540px" }} key={index}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img
                                src={`http://127.0.0.1:8000/images/${booking.console.image}`}
                                className="img-fluid rounded-start"
                                alt={booking.console.name}
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{booking.console.name}</h5>
                                    <p className="card-text">Deskripsi: {booking.console.description}</p>
                                    <p className="card-text">
                                        <small className="text-body-secondary">
                                        Tarif Perjam: Rp. {booking.console.hourly_rate}
                                        </small>
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                        Tanggal Booking: {booking.start_time}
                                        </small>
                                    </p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                        Status: {booking.status}
                                        </small>
                                    </p>

                                    <BtnCancel onClick={() => cancelBooking(booking.id_booking)}/>
                                </div>
                                {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
}