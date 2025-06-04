import axios from 'axios'
import React, { useState } from 'react'
import { BtnRegister } from '../components/Button'
import { Link, useNavigate } from 'react-router';
import PagesTitle from '../components/PagesTitle';

export default function RegisterPage() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [message, setMessage] = useState("");
  const [alert, setAlertType] = useState("");
  const navigate = useNavigate("");

  const Register = async(e) => {
    try {
        e.preventDefault();
        const response = await axios.post("http://127.0.0.1:8000/api/register", {
            username: username,
            email: email,
            password: password
        });

        setMessage(response.data.message);
        setAlertType('success');
        navigate('/login');
    } catch(error) {
        console.error("Error : ", error);
    }
  }

  return (
    <>
        <PagesTitle title={"Login"}/>
        <div className="limiter">
				<div className="container-login100">
                    {message && (
                            <div className={`alert alert-${alert}`} role="alert">
                                {message}
                            </div>
                        )}
					<div className="wrap-login100">
						<form className="login100-form validate-form" onSubmit={Register}>
							<span className="login100-form-title">
								Register
							</span>

                            <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <label htmlFor="name">Username</label>
								<input className="input100" type="text" name="username" id='username' placeholder="username" onChange={(e) => setUserName(e.target.value)}/>
								<span className="focus-input100"></span>
							</div>

							<div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                                <label htmlFor="email">Email</label>
								<input className="input100" type="text" name="email" id='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
								<span className="focus-input100"></span>
							</div>

							<div className="wrap-input100 validate-input" data-validate = "Password is required">
                                <label htmlFor="password">Password</label>
								<input className="input100" type="password" name="password" id='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
								<span className="focus-input100"></span>
							</div>
							
							<div className="container-login100-form-btn">
								<BtnRegister/>
							</div>

							<div className="text-center p-t-136">
								<Link className="txt2" to="/login">
									Sudah punya akun? Langsung login aja!
									<i className="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
    </>
  )
}
