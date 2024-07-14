import React, {useState} from "react";
import LoginHeader from "../../Components/Header/LoginHeader";
import plusIcon from "../../assets/images/icons/plusIcon.svg";
import {AiFillLock} from "react-icons/ai";
import edit_gold from "../../assets/images/icons/edit_gold.svg";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {toastHandler} from "../../Components/toaster";
import {CloseButton} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import img from "../../assets/images/p_cradimg.png";
import {setUserDetail} from "../../store/action/user-detail-actions";

function AccountSettings() {
    const userDetailState = useSelector(state => state.userDetail.userDetail);
    const token = useSelector(state => state.token.token);
    const [user, userInfo] = useState(userDetailState?.user);
    const dispatch = useDispatch();
    let password = '';
    let reEnterPassword = '';
    let email = '';
    let navigate = useNavigate();


    // value change handler
    const accountSettingsInfo = (accountSettingsFormData) => {
        userInfo(ev => ({
            ...ev,
            [accountSettingsFormData.target.name]: accountSettingsFormData.target.value,
        }));
        switch (accountSettingsFormData.target.name) {
            case "password":
                password = accountSettingsFormData.target.value
                break;
            case "reEnterPassword":
                reEnterPassword = accountSettingsFormData.target.value
                break;
            case "email":
                email = accountSettingsFormData.target.value
                break;
        }
    };

    // service call
    const saveAccountSettings = () => {
        console.log(password)
        trackPromise(
            axios({
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/user/accountsettings',
                data: JSON.stringify({
                    phoneNumber: user.phoneNumber,
                    image: user.image,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    zipCode: user.zipCode,
                    city: user.city,
                    state: user.state,
                    password: password,
                    reEnterPassword: reEnterPassword,
                    emailAddress: email ? email : '',
                    token: token,
                })
            })
                .then(function (response) {
                    if (response.status === 200 && response.data.message === 'success') {
                        toastHandler('Updated');
                        dispatch(setUserDetail({user: response?.data.data, registries: userDetailState?.registries}));
                    }
                })
                .catch(function (error) {
                    toastHandler(error.response.data.data);
                })).then(r => console.log(r));
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const getBase64StringFromDataURL = async (e) => {
        const file = e.target.files[0];
        let imageUpdate = user;
        const base64 = await convertToBase64(file);
        let sliderImg = document.getElementById("profile_img");
        sliderImg.src = String(base64);
        userDetailState.user.image = String(base64);
        imageUpdate.image = String(base64);
        userInfo(imageUpdate)
    };

    return (
        <div className="img_overlay">
            <LoginHeader/>
            <div className="profile_container mt-4">
                <div className="p_layout">

                    <div className="pl_child1">
                        <div className="p_card1">
                            <ToastContainer/>
                            <div className="position-relative d-inline">
                                <img src={userDetailState?.user?.image} onClick={() => {
                                    navigate('/profile')
                                }} className="p_profileImg" alt=""/>
                                <img src={plusIcon} className="plusIcon" alt=""/>
                            </div>

                            <h3 className="para1 username">Hi, {userDetailState?.user?.firstName}!</h3>

                            <p className="para2 mt-3 text-center text_gold op_1">
                                <AiFillLock className="AiFillLock"/>
                                <b>Your Registry is Hidden</b>
                            </p>

                            <div>
                                <Link to="/profile">
                                    <button className="button1">registries</button>
                                </Link>
                            </div>
                            <img src={edit_gold} className="edit_gold" alt=""/>
                        </div>
                    </div>
                    <div class="p_card">
                        <div className="ms-4 mt-4">
                            <CloseButton className='float-end me-4'
                                         onClick={() => navigate("/profile")}/>
                            <h4 className="title_one fw-bold">Account Settings</h4>
                            <div className="row">
                                <div className="col-4">
                                </div>
                                <div className="col-4">
                                    <div className="text-center position-relative d-inline mb-3">
                                        <div className="input_file_area">
                                            <input
                                                type="file"
                                                name=""
                                                id=""
                                                onChange={(e) => getBase64StringFromDataURL(e)}
                                            />
                                            <div className="input_image_main">
                                                <img src={userDetailState?.user?.image} id="profile_img"
                                                     className="p_profileImg"
                                                     alt=""/>
                                                <img src={plusIcon} className="plusIcon" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4">
                                </div>
                            </div>
                            <div className="row g-4 container-fluid">
                                <div className="col-md-6">
                                    <label htmlFor="" className="input_label">
                                        First Name
                                    </label>
                                    <input type="text" className="input_field w-100"
                                           name="firstName"
                                           value={user?.firstName}
                                           onChange={(e) => accountSettingsInfo(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="" className="input_label">
                                        Last Name
                                    </label>
                                    <input type="text" className="input_field w-100"
                                           name="lastName"
                                           value={user?.lastName}
                                           onChange={(e) => accountSettingsInfo(e)}/>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="" className="input_label">
                                        Email
                                    </label>
                                    <input type="email" className="input_field w-100"
                                           name="email"
                                           value={user?.emailAddress}
                                           onChange={(e) => accountSettingsInfo(e)}/>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="" className="input_label">
                                        Phone Number Address
                                    </label>
                                    <input type="number" className="input_field w-100"
                                           name="phoneNumber"
                                           value={user?.phoneNumber}
                                           onChange={(e) => accountSettingsInfo(e)}/>
                                </div>
                                <div className="col-12">
                                    <label htmlFor="" className="input_label">
                                        Address
                                    </label>
                                    <input type="text" className="input_field w-100"
                                           name="address"
                                           value={user?.address}
                                           onChange={(e) => accountSettingsInfo(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="" className="input_label">
                                        City
                                    </label>
                                    <input type="text" className="input_field w-100"
                                           name="city"
                                           value={user?.city}
                                           onChange={(e) => accountSettingsInfo(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="" className="input_label">
                                        State
                                    </label>
                                    <input type="text" className="input_field w-100"
                                           name="state"
                                           value={user?.state}
                                           onChange={(e) => accountSettingsInfo(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="" className="input_label">
                                        Zip Code
                                    </label>
                                    <input type="text" className="input_field w-100"
                                           name="zipCode"
                                           value={user?.zipCode}
                                           onChange={(e) => accountSettingsInfo(e)}/>
                                </div>
                            </div>

                            <h4 className="title_one mt-4 ms-4">Security</h4>

                            <div className="row g-4 mt-2 container-fluid">
                                <div className="col-md-6">
                                    <label htmlFor="" className="input_label">
                                        Password
                                    </label>
                                    <input type="text" className="input_field w-100"
                                           name="password"
                                           onPaste={(e) => accountSettingsInfo(e)}
                                           onChange={(e) => accountSettingsInfo(e)}/>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="" className="input_label">
                                        Re-enter Password
                                    </label>
                                    <input type="text" className="input_field w-100"
                                           name="reEnterPassword"
                                           onPaste={(e) => accountSettingsInfo(e)}
                                           onChange={(e) => accountSettingsInfo(e)}/>
                                </div>
                            </div>

                            <div className="mt-5 ms-4">
                                <button className="button2 px-4 px-md-5"
                                        onClick={(e) => saveAccountSettings(e)}>Save
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountSettings;
