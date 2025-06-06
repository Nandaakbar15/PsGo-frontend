import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { BtnBack } from "./Button";
import { Link } from "react-router";

export default function CardDetailProduct() {
    const {id_konsol} = useParams();
    const [namaKonsol, setNamaKonsol] = useState("");
    const [description, setDescription] = useState("");
    const [hourlyRate, setHourlyRates] = useState("");
    const [isActive, setIsActive] = useState("");
    const [image, setImages] = useState(null);

    useEffect(() => {
        const getProductById = async() => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://127.0.0.1:8000/api/customer/detailProducts/${id_konsol}`, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                });

                const {name, description, hourly_rate, is_active, image} = response.data.console;
                setNamaKonsol(name);
                setDescription(description);
                setHourlyRates(hourly_rate);
                setIsActive(is_active);
                setImages(image);
            } catch(error) {
                console.error("Error : ", error);
            }
        }

        getProductById();
    }, [id_konsol]);

    return (
        <>
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={`http://127.0.0.1:8000/images/${image}`}
                        className="img-fluid rounded-start"
                        alt={namaKonsol} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{namaKonsol}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text">
                            <strong>Tarif Perjam:</strong> {parseInt(hourlyRate).toLocaleString('id-ID')}
                        </p>
                        <p className="card-text">
                            <span className={`badge ${isActive ? 'bg-success' : 'bg-secondary'}`}>
                                {isActive ? 'Tersedia' : 'Tidak Tersedia'}
                            </span>
                        </p>
                    </div>
                </div>

                <Link to="/customer/booking" className="btn btn-primary mt-3 ms-2">Booking sekarang!</Link>
            </div>
        </div>
        <Link to="/customer/produk">
            <BtnBack />
        </Link>
        </>
    );
}