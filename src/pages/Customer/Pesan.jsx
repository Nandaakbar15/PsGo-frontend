import React from "react";
import PagesTitle from "../../components/PagesTitle";
import CustomerNavbar from "../../components/NavBarCustomer";

export default function PesanPages() {
    return (
        <>
            <PagesTitle title={'Pesan'}/>
            <CustomerNavbar/>
            <div className="container mt-3">
                <div className="row mt-3">
                    <h1>Pesanan atau booking PS</h1>
                    <div className="card mb-3 mt-5" style={{ maxWidth: '700px' }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="..." className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Gambar Produk</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}