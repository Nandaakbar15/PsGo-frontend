import React from "react";
import PagesTitle from "../../components/PagesTitle";
import CustomerNavbar from "../../components/NavBarCustomer";
import CardDetailProduct from "../../components/CardDetailProduct";
import Banner from "../../components/Banner";

export default function DetailProdukPages() {
    return (
        <>
            <PagesTitle title={'Detail Produk Kami'}/>
            <CustomerNavbar/>
            <div className="container mt-3">
                <Banner/>
                <div className="row mt-3">
                    <h1>Detail Produk</h1>
                    <CardDetailProduct/>
                </div>
            </div>
        </>
    );
}