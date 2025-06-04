import React, { useEffect, useState } from "react";
import PagesTitle from "../../../components/PagesTitle";
import Sidebar from "../../../components/Sidebar";
import NavBarAdmin from "../../../components/NavBarAdmin";
import Modal from "../../../components/Modal";
import axios from "axios";
import { useParams } from "react-router";
import { BtnDelete } from "../../../components/Button";

export default function BookingAdminPages() {
    const {id_booking} = useParams();
    const [bookings, setBookings] = useState([]);
    const [paginations, setPaginations] = useState({
        current_page: 1,
        last_page: 1
    });
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");

    const getAllBookings = async(page = 1) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/getallbooking?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBookings(response.data.data.data);
            setPaginations({
                current_page: response.data.data.current_page,
                last_page: response.data.data.last_page
            });
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    const deleteBooking = async() => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://127.0.0.1:8000/api/admin/deleteBooking/${id_booking}`, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

            setShowModal(true);
            setMessage(response.data.message);

            // clear the data
            getAllBookings();

            setTimeout(() => {
                setShowModal(false);
            })
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    useEffect(() => {
        getAllBookings()
    }, []);

    return (
        <>
            <PagesTitle title={'Data Booking Admin'}/>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <NavBarAdmin/>
                    <div className="content">
                        <div className="content-fluid px-4">
                            <h1>Data Booking</h1>
                            <div className="card-body">
                                    <div className="table-responsive">
                                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>ID Booking</th>
                                                <th>ID User</th>
                                                <th>ID Konsol</th>
                                                <th>Jam mulai booking</th>
                                                <th>Jam Akhir Booking</th>
                                                <th>Status</th>
                                                <th>Hapus</th>
                                            </tr>
                                        </thead>
                                        <tfoot>
                                            <tr>
                                                <th>ID Booking</th>
                                                <th>ID User</th>
                                                <th>ID Konsol</th>
                                                <th>Jam mulai booking</th>
                                                <th>Jam Akhir Booking</th>
                                                <th>Status</th>
                                                <th>Hapus</th>
                                            </tr>
                                        </tfoot>
                                        <tbody>
                                            {bookings.map((booking => (
                                                <tr key={booking.id_booking}>
                                                    <td>{booking.id_booking}</td>
                                                    <td>{booking.user_id}</td>
                                                    <td>{booking.id_konsol}</td>
                                                    <td>{booking.start_time}</td>
                                                    <td>{booking.end_time}</td>
                                                    <td>{booking.status}</td>
                                                    <td>
                                                        <BtnDelete onClick={() => deleteBooking(booking.id)}/>
                                                    </td>
                                                </tr>
                                            )))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button 
                                        className="btn btn-outline-primary mx-2"
                                        disabled={paginations.current_page === 1}
                                        onClick={() => getAllBookings(paginations.current_page - 1)}
                                    >
                                        Previous
                                    </button>
                                    <button 
                                        className="btn btn-outline-primary mx-2"
                                        disabled={paginations.current_page === paginations.last_page}
                                        onClick={() => getAllBookings(paginations.current_page + 1)}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}