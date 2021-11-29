import React from "react";
import { Link } from "react-router-dom";
import './styles/RegisterPage.css';

// Registeration Page
// Yuanyuan
function RegisterPage() {
    return (
        <div id="registerContainer">
            <div className="row">
            <h1 className="title">Welcome to GameHub</h1>
            <h2 className="title2">Start your Game Journey</h2>
            <div class="col-sm-4 box border">
                <form id="registerForm">
                    <div className="userName">
                        <label className="label-of-form">Username</label>
                        <input className="form-control" type="text" placeholder="Username"></input>
                    </div>
                    <div className="password">
                        <label className="label-of-form">Password</label>
                        <input className="form-control" type="text" placeholder="Password"></input>
                    </div>
                    <div className="selectRole">
                        <label className="selectRole">Select a role</label>
                        <select className="form-select">
                            <option>Gamer</option>
                            <option>Gaming company</option>
                        </select>
                    </div>
                    <hr />
                    <div className="d-grid gap-2 mx-auto center">
                        <button className="btn btn-primary">Sign up</button>
                    </div>
                </form>
                <hr />
                </div>
                <div className="center">
                    <Link to="/"><button type="submit" className="btn btn-primary login">Login if you have an account</button></Link> 
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;