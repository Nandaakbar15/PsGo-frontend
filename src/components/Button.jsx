import React from "react";

export default function Button({children}) {
    return (
        <div className="button-body">
            {children}
        </div>
    );
}

export function BtnLogin() {
    return (
        <div className="button-login">
            <div>
                <button className="login100-form-btn">Login</button>
            </div>
        </div>
    );
}

export function BtnRegister() {
    return (
        <div className="button-register">
            <button className="login100-form-btn">Register</button>
        </div>
    );
}

export function BtnAdd() {
    return (
        <div className="button-add">
            <button className="btn btn-primary" type="submit">Tambah!</button>
        </div>
    );
}

export function BtnChange() {
    return (
        <div className="button-add">
            <button className="btn btn-info" type="submit">Ubah!</button>
        </div>
    );
}

export function BtnDelete({onClick}) {
    return (
        <div className="button-delete">
            <button className="btn btn-danger" onClick={onClick}>Hapus!</button>
        </div>
    );
}

export function BtnBack() {
    return (
        <div className="button-back">
            <button className="btn btn-success">Kembali</button>
        </div>
    );
}

export function BtnCancel({onClick}) {
    return (
        <div className="button-cancel">
            <button className="btn btn-danger" onClick={onClick}>Cancel!</button>
        </div>
    );
}