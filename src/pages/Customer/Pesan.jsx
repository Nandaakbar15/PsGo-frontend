import React from "react";
import PagesTitle from "../../components/PagesTitle";
import CustomerNavbar from "../../components/NavBarCustomer";
import CardOrder from "../../components/CardOrder";

export default function PesanPages() {
    return (
        <>
            <PagesTitle title={'List Pesanan'}/>
            <CustomerNavbar/>
            <div className="container mt-3">
                <div className="row mt-3">
                    <h1>List Pesanan</h1>
                    <CardOrder/>
                </div>
            </div>
        </>
    );
}