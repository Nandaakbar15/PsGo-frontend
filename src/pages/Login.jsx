/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { BtnLogin } from "../components/Button";
import axios from "axios";
import PagesTitle from "../components/PagesTitle";

export default function LoginPage(){
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("");
	const navigate = useNavigate("");
	const [message, setMessage] = useState("");
	const [alert, setAlertType] = useState("");

	const Login = async(e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/login", {
				email: email,
				password: password
			});

			const token = response.data.token;
			const role = response.data.user.role;
			localStorage.setItem("token", token);
			localStorage.setItem("role", role);

			if(role === 'admin') {
				navigate("/dashboardadmin");
			} else {
				navigate("/dashboardcustomer");
			}
		} catch(error) {
			setAlertType("danger");
            setMessage("Error! Email or password is invalid!");
			console.error("Error : ", error);
		}
	}

    return (
        <>
			<PagesTitle title={"Login"}/>
			<div className="limiter">
				{message && (
						<div className={`alert alert-${alert}`} role="alert">
							{message}
						</div>
					)}
				<div className="container-login100">
					<div className="wrap-login100">
						<div className="login100-pic js-tilt" data-tilt>
							<img src="images/img-01.png" alt="IMG" />
						</div>

						<form className="login100-form validate-form" onSubmit={Login}>
							<span className="login100-form-title">
								Login
							</span>

							<div className="wrap-input100 validate-input">
								<input className="input100" type="text" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
								<span className="focus-input100"></span>
								<span className="symbol-input100">
									<i className="fa fa-envelope" aria-hidden="true"></i>
								</span>
							</div>

							<div className="wrap-input100 validate-input">
								<input className="input100" type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
								<span className="focus-input100"></span>
								<span className="symbol-input100">
									<i className="fa fa-lock" aria-hidden="true"></i>
								</span>
							</div>
							
							<div className="container-login100-form-btn">
								<BtnLogin/>
							</div>

							<div className="text-center p-t-136">
								<Link className="txt2" to="/register">
									Create your Account
									<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
    );
}