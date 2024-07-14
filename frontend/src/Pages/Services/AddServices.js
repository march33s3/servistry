import React from 'react'
import LoginHeader from '../../Components/Header/LoginHeader'
import img from '../../assets/images/p_cradimg.png'
import {Col, Row} from 'react-bootstrap';
import filterIcon from '../../assets/images/icons/filter.svg'
import {useDispatch, useSelector} from "react-redux";
import Header from "../../Components/Header/Header";
import plusIcon from "../../assets/images/icons/plusIcon.svg";
import {AiFillLock} from "react-icons/ai";
import {Link} from "react-router-dom";
import edit_gold from "../../assets/images/icons/edit_gold.svg";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {toastHandler} from "../../Components/toaster";
import {setUserDetail} from "../../store/action/user-detail-actions";
import {ToastContainer} from "react-toastify";
import {selectedRegistryAction} from "../../store/action/selected-registry-action";

function AddServices() {
    const token = useSelector(state => state.token.token);
    const servicesData = useSelector((state) => state.servicesData).servicesData;
    const userDetailState = useSelector(state => state.userDetail.userDetail);
    const selectedRegistry = useSelector(state => state.selectedRegistry.selectedRegistry);
    const dispatch = useDispatch();
    // services api call
    const servicesApiHandler = (serviceID) => {
        trackPromise(
            axios({
                method: "patch",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/user/addservice',
                data: JSON.stringify({token: token, registryID: selectedRegistry._id, serviceID: serviceID})
            })
                .then(function (response) {
                    if (response.data.status === '200' && response.data.message === 'success') {
                        dispatch(setUserDetail({user: userDetailState?.user, registries: response?.data.data}));
                        let registry = response.data.data.find(value => value._id === selectedRegistry._id);
                        dispatch(selectedRegistryAction(registry));
                        toastHandler('Service has been added');
                    }
                })
                .catch(function (error) {
                    toastHandler(error.response.data.data);
                })).then(r => console.log(r));
    }
    return (
        <div className='img_overlay'>
            {
                userDetailState ? <LoginHeader/> : <Header/>
            }
            <div className='profile_container mt-4'>
                <div className='p_layout'>
                    <div className='pl_child1'>
                        <div className='p_card1'>
                            <ToastContainer/>
                            <div className='position-relative d-inline'>
                                <img src={userDetailState?.user?.image} className="p_profileImg" alt=""/>
                                <img src={plusIcon} className="plusIconOther" alt=""/>
                            </div>

                            <h3 className='para1 username'>Hi, {userDetailState?.user?.firstName}!</h3>

                            <p className='para2 mt-3 text-center text_gold op_1'>
                                <AiFillLock className='AiFillLock'/><b>Your Registry is Hidden</b>
                            </p>

                            <div>
                                <Link to="/accountsettings">
                                    <button className="button1">account settings</button>
                                </Link>
                            </div>
                            <img src={edit_gold} className="edit_gold" alt=""/>

                        </div>
                        <div className='service_registry_card mt-4'>
                            <Link to="/registry/services">
                                <h3 className='registry_name text-white'>
                                    {selectedRegistry.registryName}
                                </h3>
                            </Link>
                        </div>
                    </div>
                    <div className='pl_child2'>
                        <div className='r_select_area'>
                            <div className='r_select_area_child1'>
                                <div className='desktop-none-950'>
                                    <div className='filter_main'>
                                        <img src={filterIcon} alt=""/>
                                        <span className='para1 ms-2'><b>Filter</b></span>
                                    </div>
                                </div>
                                <p className='para1 rsa_text'>232 results near you</p>
                            </div>
                            <div className='r_select_area_inner'>
                                <select name="" id="" className='input_field select'>
                                    <option value="">Status: Online Now</option>
                                    <option value="">Status: Online Now</option>
                                </select>
                            </div>
                        </div>

                        <div className='py-4'>
                            {/* card start */}
                            {
                                servicesData?.map((data, i) => {
                                    return <div className='p_card mt-4 r_pcard'>
                                        <div className='p_card_child1 pc_child'>
                                            <img src={img} className="p_c_img" alt=""/>
                                        </div>
                                        <div className='p_card_child2 pc_child'>
                                            <div>
                                                <h4 className='pc_title'>{data.name}</h4>
                                                <p className='star_text'>{data.rating} <span className='p_para1'>(34 ratings)</span>
                                                </p>
                                                <Row>
                                                    <Col xl="6">
                                                        <div>
                                                            {data.remoteServices === true ?
                                                                <p className='p_para1 p_op1'>Offers remote
                                                                    services</p> : null}
                                                            <p className='p_para1 p_op2'>{data.location}</p>
                                                        </div>
                                                    </Col>
                                                    <Col xl="6">
                                                        <div>
                                                            {data.onlineStatus === true ?
                                                                <p className='p_para1 p_op3'>Online now</p> : null}
                                                            {data.onlineStatus === true ?
                                                                <p className='p_para1 p_op4'>Responds in about
                                                                    1hr</p> : null}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>
                                        <div className='p_card_child3 pc_child r_pcard_child3'>
                                            <p>
                                                {data.comment} <a
                                                href="/" className='text_gold'>See More</a>
                                            </p>
                                        </div>
                                        <div className='p_card_child4 pc_child'>
                                            <div className='pc_btn_container'>
                                                <div className='price_continer desk-price_continer'>
                                                    <h3 className='price_info'>${data.cost}</h3>
                                                    <p className='price_text'>estimaded cost</p>
                                                </div>
                                                {
                                                    userDetailState ?
                                                        <button className='button2 w-100'
                                                                onClick={() => servicesApiHandler(data._id)}>ADD</button> :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                            {/* card end */}
                            <div className='mt-4 text-center'>
                                <button className='button1'>see more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddServices
