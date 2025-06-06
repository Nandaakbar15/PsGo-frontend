import React, { useEffect, useState } from "react";
import axios from "axios";
import PagesTitle from "../../../components/PagesTitle";
import Sidebar from "../../../components/Sidebar";
import NavBarAdmin from "../../../components/NavBarAdmin";

export default function DataTransaksiAdminPages(){
    const [transaksi, setTransaksi] = useState([]);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1
    });

    const getAllTransaksi = async(page = 1) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/getallorders?page=${page}`, {
                headers: {
                    Authorization : `Bearer ${token}`
                }
            });

            setTransaksi(response.data.data.data);
            setPagination({
                current_page: response.data.data.current_page,
                last_page: response.data.data.last_page
            })
        } catch(error) {
            console.error("Error : ", error);
        }
    }

    useEffect(() => {
        getAllTransaksi();
    }, []);

    return (
        <>
            <PagesTitle title="Data Transaksi Admin"/>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <NavBarAdmin/>
                    <div className="content-fluid px-4">
                        <h1>Data Transaksi</h1>
                        <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>ID Pesanan</th>
                                            <th>ID User</th>
                                            <th>ID Aksesoris</th>
                                            <th>Jumlah barang</th>
                                            <th>Jumlah Pembayaran</th>
                                            <th>Status Pembayaran</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th>ID Pesanan</th>
                                            <th>ID User</th>
                                            <th>ID Aksesoris</th>
                                            <th>Jumlah barang</th>
                                            <th>Jumlah Pembayaran</th>
                                            <th>Status Pembayaran</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        {transaksi.map((order) => (
                                            <tr key={order.id_pesanan}>
                                                <td>{order.id_pesanan}</td>
                                                <td>{order.user_id}</td>
                                                <td>{order.id_aksesoris}</td>
                                                <td>{order.quantity}</td>
                                                <td>{order.jumlah_pembayaran}</td>
                                                <td>{order.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button 
                                className="btn btn-outline-primary mx-2"
                                disabled={pagination.current_page === 1}
                                onClick={() => getAllTransaksi(pagination.current_page - 1)}
                            >
                                Previous
                            </button>
                            <button 
                                className="btn btn-outline-primary mx-2"
                                disabled={pagination.current_page === pagination.last_page}
                                    onClick={() => getAllTransaksi(pagination.current_page + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}