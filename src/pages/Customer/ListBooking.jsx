import React, { useEffect, useState } from "react";
import PagesTitle from "../../components/PagesTitle";
import CustomerNavbar from "../../components/NavBarCustomer";
import axios from "axios";

export default function ListBookingPages() {
    const [bookings, setBookings] = useState([]);

    const getListBookings = async() => {
        try {
            const token = localStorage.getItem("token");
            
            console.log("Token : ", token);

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
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
}