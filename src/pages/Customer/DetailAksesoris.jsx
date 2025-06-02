import React from "react";
import PagesTitle from "../../components/PagesTitle";
import CustomerNavbar from "../../components/NavBarCustomer";
import CardDetailAksesoris from "../../components/CardDetailAksesoris";

export default function DetailAksesorisPages() {
    return (
        <>
            <PagesTitle title={'Detail Aksesoris'}/>
            <CustomerNavbar/>
            <div className="container">
                <div className="row">
                    <h1>Detail Aksesoris</h1>
                    <CardDetailAksesoris/>
                </div>
            </div>
        </>
    );
}