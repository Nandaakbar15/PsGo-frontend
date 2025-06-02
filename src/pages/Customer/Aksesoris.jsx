import React from "react";
import PagesTitle from "../../components/PagesTitle";
import CustomerNavbar from "../../components/NavBarCustomer";
import Banner from "../../components/Banner";
import CardsAccesories from "../../components/CardsAccesories";

export default function AksesorisPages() {
    return (
        <>
            <PagesTitle title={'Aksesoris'}/>
            <CustomerNavbar/>
            <div className="container mt-3">
                <Banner/>
                <div className="row mt-3">
                    <h3>Aksesoris</h3>
                    <CardsAccesories/>
                </div>
            </div>
        </>
    );
}