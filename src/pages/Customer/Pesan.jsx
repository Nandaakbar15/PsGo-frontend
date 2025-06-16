import React, { useEffect, useState } from "react";
import PagesTitle from "../../components/PagesTitle";
import CustomerNavbar from "../../components/NavBarCustomer";
import CardOrder from "../../components/CardOrder";
import { BtnCheckOut } from "../../components/Button";
import axios from "axios";
import Modal from "../../components/Modal";

export default function PesanPages() {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const getOrder = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://127.0.0.1:8000/api/customer/listOrder", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data.data);
        } catch (error) {
            console.error("Error saat ambil pesanan:", error);
        }
    };

    const handleCheckout = async() => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post("http://127.0.0.1:8000/api/customer/checkout", {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const snapToken = response.data.snap_token;

            window.snap.pay(snapToken, {
                onSuccess: function(result) {
                    console.log("Success:", result);
                    setMessage("Pembayaran berhasil!");
                    setShowModal(true);
                },
                onPending: function(result) {
                    console.log("Pending:", result);
                    setMessage("Pembayaran tertunda.");
                    setShowModal(true);
                },
                onError: function(result) {
                    console.log("Error:", result);
                    setMessage("Pembayaran gagal.");
                    setShowModal(true);
                },
                onClose: function() {
                    console.log("Popup ditutup.");
                }
            });

            // refresh the data
            getOrder();

        } catch(error) {    
            console.error("Error : ", error);
            console.error("Detail Error", error.response?.data);
            setMessage("Gagal melakukan checkout!");
            setShowModal(true);
        }
    } 

    useEffect(() => {
        getOrder();
    }, [])


    return (
        <>
            <PagesTitle title={'List Pesanan'}/>
            <CustomerNavbar/>
            <div className="container mt-3">
                <div className="row mt-3">
                    <h1>List Pesanan</h1>
                    <CardOrder orders={orders} setOrders={setOrders} getOrder={getOrder} />
                </div>
                {orders.length > 0 && (
                    <BtnCheckOut onClick={handleCheckout}/>
                )}
            </div>
            {showModal && <Modal show={showModal} onClose={() => setShowModal(false)} message={message} />}
        </>
    );
}