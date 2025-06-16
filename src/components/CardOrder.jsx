/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BtnCancelOrder } from "./Button";
import Modal from "./Modal";
// import { useParams } from "react-router";

export default function CardOrder({ orders, setOrders, getOrder }) {
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");

    const cancelOrder = async (id_pesanan) => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.delete(`http://127.0.0.1:8000/api/customer/cancelOrder/${id_pesanan}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMessage(response.data.message);
            setShowModal(true);

            // refresh the data
            getOrder();

            setTimeout(() => {
                setShowModal(false);
            }, 2000);
        } catch (error) {
            console.error("Error saat cancel:", error);
            console.error("Detail Error : ", error.response?.data);
            setMessage("Error! Gagal membatalkan pesanan!");
            setShowModal(true);
        }
    };

    return (
        <>
            {orders.map((order) => (
                <div className="card mb-3 mt-5" style={{ maxWidth: '700px' }} key={order.id_pesanan}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={`http://127.0.0.1:8000/images/${order.aksesoris.gambar}`} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{order.aksesoris.nama_aksesoris}</h5>
                                <p className="card-text">{order.aksesoris.deskripsi}</p>
                                <p className="card-text">Rp. {order.aksesoris.harga}</p>
                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                <button className="btn btn-danger" onClick={() => cancelOrder(order.id_pesanan)}>Batalkan</button>
                            </div>
                        </div>
                    </div>
                    {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
                </div>
            ))}
        </>
    );
}
