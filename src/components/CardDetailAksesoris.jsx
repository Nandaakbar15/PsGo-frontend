import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router";
import { BtnBack } from "./Button";

export default function CardDetailAksesoris() {
    const {id_aksesoris} = useParams();
    const [namaAksesoris, setNamaAksesoris] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [stock, setStock] = useState("");
    const [price, setPrice] = useState("");
    const [gambar, setGambar] = useState(null);

    useEffect(() => {
        const getAksesorisById = async() => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://127.0.0.1:8000/api/customer/detailAksesories/${id_aksesoris}`, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });

                const {nama_aksesoris, description, stok, harga, gambar} = response.data.accesories;
                setNamaAksesoris(nama_aksesoris);
                setDeskripsi(description);
                setStock(stok);
                setPrice(harga);
                setGambar(gambar);
            } catch(error) {
                console.error("Error : ", error);
            }
        }

        getAksesorisById();
    }, [id_aksesoris]);


    return (
        <>
            <div className="card mb-3" style={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={`http://127.0.0.1:8000/images/${gambar}`}
                            className="img-fluid rounded-start"
                            alt={namaAksesoris}
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{namaAksesoris}</h5>
                            <p className="card-text">{deskripsi}</p>
                            <p className="card-text">
                                <strong>Harga:</strong> Rp. {parseInt(price).toLocaleString('id-ID')}
                            </p>
                            <p className="card-text">Stok: {stock}</p>
                        </div>
                    </div>
            
                    <Link to="/customer/booking" className="btn btn-primary mt-3 ms-2">Pesan Sekarang</Link>
                </div>
            </div>
            <Link to="/customer/aksesoris">
                <BtnBack/>
            </Link>
        </>
    );
}