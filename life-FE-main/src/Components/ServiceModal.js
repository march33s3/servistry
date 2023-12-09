import React, {useState} from 'react'
import img from "../assets/images/p_cradimg.png";
import {Link, useNavigate} from "react-router-dom";
import LoginHeader from "./Header/LoginHeader";
import plusIcon from "../assets/images/icons/plusIcon.svg";
import {AiFillLock} from "react-icons/ai";
import edit_gold from "../assets/images/icons/edit_gold.svg";
import lock from "../assets/images/icons/lock.svg";
import edit_dark from "../assets/images/icons/edit_dark.svg";
import delete_svg from "../assets/images/icons/delete.svg";
import {Col, InputGroup, Row} from "react-bootstrap";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {selectedRegistryAction} from "../store/action/selected-registry-action";
import FullScreenPopup, {toggle_popup} from "../utilities/FullScreenPopup";
import {setUserDetail} from "../store/action/user-detail-actions";
import {getServices} from "../store/action/services-actions";
import {toastHandler} from "./toaster";
import Form from 'react-bootstrap/Form';

function ServiceModal() {
    const token = useSelector(state => state.token.token);
    const userDetailState = useSelector(state => state.userDetail.userDetail);
    const selectedRegistry = useSelector(state => state.selectedRegistry.selectedRegistry);
    const [editRegistry, setEditRegistry] = useState(false);
    const [url, setUrl] = useState('https://afternoon-island-30959.herokuapp.com/private/registry/?registryID=' + selectedRegistry._id + '&userID=' + userDetailState.user._id);
    const [registryName, registryNameInfo] = useState(selectedRegistry.registryName);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    // service call
    const deleteService = (data) => {
        trackPromise(
            axios({
                method: "Patch",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/user/deleteservice',
                data: JSON.stringify({token: token, registryID: selectedRegistry._id, serviceID: data._id})
            })
                .then(function (response) {
                    if (response.status === 200 && response.data.message === 'success') {
                        let registry = response.data.data.find(value => value._id === selectedRegistry._id);
                        dispatch(selectedRegistryAction(registry));
                    }
                })
                .catch(function (error) {
                })).then(r => console.log(r));
    }

    // service call
    const doneRegistries = () => {
        setEditRegistry(false)
        selectedRegistry.registryName = registryName;
        trackPromise(
            axios({
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/user/registries',
                data: JSON.stringify(selectedRegistry)
            })
                .then(function (response) {
                    if (response.data.status === '200' && response.data.message === 'success') {
                        let registry = response.data.data.find(value => value._id === selectedRegistry._id);
                        dispatch(selectedRegistryAction(registry));
                        dispatch(setUserDetail({user: userDetailState?.user, registries: response?.data.data}));
                    }
                })
                .catch(function (error) {
                    toastHandler(error.response.data.data);
                })).then(r => console.log(r));
    }

    const closeConfirmationPopup = (data) => {
        toggle_popup();
        setEditRegistry(true);
    }


    // service call
    const deleteRegistryHandler = () => {
        toggle_popup()
        trackPromise(
            axios({
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/user/registries',
                data: JSON.stringify({token: token, registryID: selectedRegistry._id})
            })
                .then(function (response) {
                    if (response.status === 200 && response.data.message === 'success') {
                        dispatch(setUserDetail({user: userDetailState?.user, registries: response?.data.data}));
                        navigate('/profile');
                    }
                })
                .catch(function (error) {
                })).then(r => console.log(r));
    }

    // services api call
    const servicesApiHandler = () => {
        trackPromise(
            axios({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/service/',
            })
                .then(function (response) {

                    if (response.data.status === '200' && response.data.message === 'success') {
                        dispatch(getServices(response.data.data))
                        navigate("/addServices");
                    }
                })
                .catch(function (error) {
                    toastHandler(error.response.data.data);
                })).then(r => console.log(r));
    }

    return (
        <>
            <div className='img_overlay'>
                <LoginHeader/>
                <FullScreenPopup title="Delete Servistry">
                    <p className="text-center">Are you sure?</p>
                    <div className="delete_registry_card">
                        <button className="delete_registry_card_button w-90 me-3" onClick={() => {
                            deleteRegistryHandler()
                        }}>
                            YES
                        </button>
                        <button className="delete_registry_card_button w-90 ms-3" onClick={closeConfirmationPopup}>
                            NO
                        </button>
                    </div>
                </FullScreenPopup>
                <div className='profile_container mt-4'>
                    <div className='p_layout'>
                        <div className='pl_child1'>
                            <div className='p_card1'>
                                <div className='position-relative d-inline'>
                                    <img src={userDetailState?.user?.image} className="p_profileImg" onClick={() => {
                                        navigate('/profile')
                                    }} alt=""/>
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
                                {
                                    !editRegistry ?
                                        <>
                                            <h3 className='registry_name text-gray'>
                                                {selectedRegistry.registryName}
                                            </h3>
                                            <img src={edit_dark} className="me-4" onClick={() => setEditRegistry(true)}
                                                 alt=""/>
                                            <img src={delete_svg} className="me-4"
                                                 onClick={() => toggle_popup("show")} alt=""/>
                                            <img src={lock} alt=""/>
                                        </> :
                                        <>
                                            <input
                                                type="text"
                                                className="input_field w-80"
                                                placeholder="Registry Name"
                                                name="registryName"
                                                value={registryName}
                                                onChange={(e) => registryNameInfo(e.target.value)}
                                            />
                                            <button className=' button1 mt-1 w-80'
                                                    onClick={() => doneRegistries(selectedRegistry)}>DONE
                                            </button>
                                        </>
                                }
                            </div>
                            <InputGroup className="mt-3">
                                <InputGroup.Text id="basic-addon1">URL</InputGroup.Text>
                                <Form.Control
                                    value={url}
                                    readOnly={true}
                                    placeholder="URL"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                            <div className="row">
                                <div className="col-2">
                                </div>
                                <div className="col-8">
                                    <button className='mt-3 button2 w-100'
                                            onClick={() => navigate("/profile")}>VIEW ALL
                                    </button>
                                </div>
                                <div className="col-2">
                                </div>
                            </div>

                        </div>
                        <div className='pl_child2'>
                            <div className='py-4'>
                                {/* card start */}
                                {
                                    selectedRegistry.services?.map((data, i) => {
                                        return <div className='p_card mt-4 r_pcard'>
                                            <div className='p_card_child1 pc_child'>
                                                <img src={data?.image} className="p_c_img" alt=""/>
                                            </div>
                                            <div className='p_card_child2 pc_child'>
                                                <div>
                                                    <h4 className='pc_title'>{data?.name}</h4>
                                                    <p className='star_text'>{data?.rating} <span className='p_para1'>(34 ratings)</span>
                                                    </p>
                                                    <Row>
                                                        <Col xl="6">
                                                            <div>
                                                                {data?.remoteServices === true ?
                                                                    <p className='p_para1 p_op1'>Offers remote
                                                                        services</p> : null}
                                                                <p className='p_para1 p_op2'>{data?.location}</p>
                                                            </div>
                                                        </Col>
                                                        <Col xl="6">
                                                            <div>
                                                                {data?.onlineStatus === true ?
                                                                    <p className='p_para1 p_op3'>Online now</p> : null}
                                                                {data?.onlineStatus === true ?
                                                                    <p className='p_para1 p_op4'>Responds in about
                                                                        1hr</p> : null}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </div>
                                            <div className='p_card_child4 pc_child'>
                                                <div className='pc_btn_container'>
                                                    <div className='price_continer desk-price_continer'>
                                                        <h3 className='price_info'>${data?.cost}</h3>
                                                        <p className='price_text'>estimaded cost</p>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                editRegistry ? <div className='p_card_child4 pc_child'>
                                                    <div className='pc_btn_container'>
                                                        <button className=' float-end button1 deleteBtn w-100'
                                                                onClick={() => deleteService(data)}>DELETE
                                                        </button>
                                                    </div>
                                                </div> : null
                                            }
                                        </div>
                                    })
                                }

                                <div className=" float-end">
                                    <button className='mt-3 button2 w-80'
                                            onClick={(e) => servicesApiHandler(e)}>ADD SERVICE
                                    </button>
                                </div>

                                {/* card end */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ServiceModal
