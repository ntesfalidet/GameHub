import React from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import './styles/RegisterPage.css';

// Registeration Page
// Yuanyuan
function RegisterPage() {
    let nav = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const roleRef = useRef();
    const registerHandler = async (event) => {
        event.preventDefault();
        const userInputData = {
            userName: usernameRef.current.value,
            password: passwordRef.current.value,
            role: roleRef.current.value,
        }
        const newUser = await fetch("/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userInputData),
        });
        if (!newUser.ok) {
            console.log("Response status ", newUser.status);
        } else {
            let userRes = await newUser.json();
            let success = userRes.success;
            console.log(success);
            if (userRes && success) {
                alert("Registered Successfully");
                nav("/");
            } else {
                alert("Somthing wrong");
            }
        }
    }
    return (
        <div id="registerContainer">
            <div className="row">
            <h1 className="title">Welcome to GameHub</h1>
            <h2 className="title2">Start your Gaming Journey</h2>
            <div class="col-sm-4 box border">
                <form id="registerForm" onSubmit={registerHandler}>
                    <div className="userName">
                        <label className="label-of-form">Username</label>
                        <input className="form-control" type="text" placeholder="Username" ref={usernameRef}></input>
                    </div>
                    <div className="password">
                        <label className="label-of-form">Password</label>
                        <input className="form-control" type="text" placeholder="Password" ref={passwordRef}></input>
                    </div>
                    <div className="selectRole">
                        <label className="selectRole">Select a role</label>
                        <select className="form-select" ref={roleRef}> 
                            <option>Gamer</option>
                            <option>Gaming company</option>
                        </select>
                    </div>
                    <hr />
                    <div className="d-grid gap-2 mx-auto center">
                        <button type="submit" className="btn btn-primary">Sign up</button>
                    </div>
                </form>
                <hr />
                </div>
                <div className="center">
                    <Link to="/login"><button type="submit" className="btn btn-primary login">Login if you have an account</button></Link> 
                </div>
            </div>
            <div className="footer">
                <div className="center">Copyright 2021</div>
                <div className="center">Designed by Nathaniel & Yuanyuan</div>
            </div>
        </div>
    );
}

export default RegisterPage;