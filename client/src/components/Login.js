import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {

    let userInputRef = useRef();
    let passInputRef = useRef();

    let navigate = useNavigate();

    let validateCredentials = async () => {

        let dataToValidate = new FormData();

        dataToValidate.append("username", userInputRef.current.value);
        dataToValidate.append("password", passInputRef.current.value);


        let reqOptions = {
            method: "POST",
            body: dataToValidate,
        };

        let JSONData = await fetch("http://localhost:5566/validateLogin", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);

        if (JSOData.isLoggedIn == false) {
            alert(JSOData.msg);
        } else {
            // 2nd parrameter must be an object;must be a state key and give value to it
            // useNavigate is useful to Send & Navigate data
            navigate("/home", { state: JSOData.details });
        }

    };

    return (
        <div>
            <h1>Welcome</h1>
            <form>
                <div>
                    <label>Email:</label>
                    <input ref={userInputRef} placeholder='Enter Email id'></input>
                </div>
                <div>
                    <label>Password:</label>
                    <input ref={passInputRef} placeholder='Enter Password'></input>
                </div>
                <div>
                    <button type="button"
                        onClick={() => {
                            validateCredentials();
                        }}>Login</button>
                </div>
            </form>
            <div>
                <label>Not a Member:
                    <Link to="/signup">Pls Signup</Link>
                </label>
            </div>
        </div>


    )
}

export default Login