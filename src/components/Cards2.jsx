import React from "react";

export default function Cards2() {
    return (
        <div className="card mb-3" style={{ maxWidth: '780px' }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src="/images/rentalps.jpg" className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">Play a game anywhere!</h5>
                        <p className="card-text">Main PS bersama temanmu, dimanapun, kapanpun!</p>
                    </div>
                </div>
            </div>
        </div>
    );
}