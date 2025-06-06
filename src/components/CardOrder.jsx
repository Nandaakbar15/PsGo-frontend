import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CardOrder() {
    const [orders, setOrders] = useState([]);

    const getOrder = async() => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('http://127.0.0.1:8000/api/customer/listOrder', {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

            setOrders(response.data.data);
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <>
            {orders.map((order => (
                <div className="card mb-3 mt-5" style={{ maxWidth: '700px' }} key={order.id_pesanan}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={`http://127.0.0.1:8000/images/${order.accesories.gambar}`} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{order.accesories.nama_aksesoris}</h5>
                                <p className="card-text">{order.accesories.deskripsi}</p>
                                <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            )))} 
        </>
    );
}