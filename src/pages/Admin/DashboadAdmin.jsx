/* eslint-disable no-unused-vars */
import React from "react";
import axios from 'axios';
import NavBarAdmin from "../../components/NavBarAdmin";
import Sidebar from "../../components/Sidebar";
import PagesTitle from "../../components/PagesTitle";

export default function DashboardAdmin() {
    return (
        <>
            <PagesTitle title={"Dashboard admin"}/>
            <div id="wrapper">
                <Sidebar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <NavBarAdmin/>
                    <div id="content">
                        <div className="content-fluid px-4">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}