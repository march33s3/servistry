import React from "react";
import logo from "../../assets/images/login_logo.png";
import {Container} from "react-bootstrap";
import loginModal from "../../model/loginModal";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {toastHandler} from "../../Components/toaster";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setUserDetail} from "../../store/action/user-detail-actions";
import Header from "../../Components/Header/Header";
import {setTokenActions} from "../../store/action/setToken-actions";

function Login() {
    const loginObject = loginModal;
    const dispatch = useDispatch();
    let navigate = useNavigate();
    // value change handler
    const loginInfo = (loginFormData) => {
        switch (loginFormData.target.name) {
            case "password":
                loginObject.password = loginFormData.target.value
                break;
            case "emailAddress":
                loginObject.emailAddress = loginFormData.target.value
                break;
        }
    };

    // service call
    const loginService = () => {
        trackPromise(
            axios({
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/user/login',
                data: JSON.stringify(loginObject)
            })
                .then(function (response) {
                    if (response.status === 200 && response.data.message === 'success') {
                        dispatch(setUserDetail(response.data.data))
                        dispatch(setTokenActions(response.data.token))
                        navigate("/profile");
                    }
                })
                .catch(function (error) {
                    toastHandler(error.response.data.data);
                })).then(r => console.log(r));
    }
    return (
        <div className='Registration'>
            <Header/>
            <div>
                <Container>
                    <div className="login_area">
                        <div className="login_box">
                            <img src={logo} className="login_logo" alt=""/>
                            <div className="p-3"></div>

                            <div className="input_container mb-4">
                                <label htmlFor="" className="input_label"
                                >
                                    Email Address
                                </label>
                                <input type="text" className="input_field w-100"
                                       name="emailAddress"
                                       onChange={(e) => loginInfo(e)}/>
                            </div>

                            <div className="input_container mb-4">
                                <label htmlFor="" className="input_label">
                                    Password
                                </label>
                                <input type="password" className="input_field w-100"
                                       name="password"
                                       onChange={(e) => loginInfo(e)}/>
                            </div>

                            <p className="input_label mt-3">Forgot password?</p>

                            <div className="mt-4">
                                <button className="button2 rounded-3 px-4 px-md-5"
                                        onClick={(e) => loginService(e)}
                                >Login
                                </button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export default Login;
