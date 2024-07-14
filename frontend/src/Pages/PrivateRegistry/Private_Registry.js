import React, {useEffect} from "react";
import LoginHeader from "../../Components/Header/LoginHeader";
import img from "../../assets/images/p_cradimg.png";
import plusIcon from "../../assets/images/icons/plusIcon.svg";
import {Link} from "react-router-dom";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {toastHandler} from "../../Components/toaster";
import {selectedRegistryAction} from "../../store/action/selected-registry-action";
import {setUserDetail} from "../../store/action/user-detail-actions";

function PrivateRegistry() {
    useEffect(() => {
        servicesApiHandler()
    }, []);
    const userDetailState = useSelector(state => state.userDetail.userDetail, shallowEqual)
    const selectedRegistry = useSelector(state => state.selectedRegistry.selectedRegistry);
    const token = useSelector(state => state.token.token);
    const queryParams = new URLSearchParams(window.location.search);
    const registryID = queryParams.get('registryID');
    const userID = queryParams.get('userID');
    let dispatch = useDispatch();
    console.log(selectedRegistry)
    console.log(token)
    // services api call
    const servicesApiHandler = () => {
        trackPromise(
            axios({
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/registry/private/registry',
                data: JSON.stringify({registryID, userID})
            })
                .then(function (response) {
                    if (response.data.status === '200' && response.data.message === 'success') {
                        let registry = response.data.data.registry;
                        dispatch(selectedRegistryAction(registry));
                        dispatch(setUserDetail(response.data.data));
                    }
                })
                .catch(function (error) {
                    toastHandler(error.response.data.data);
                })).then(r => console.log(r));
    }
    return (
        <div className='img_overlay'>
            <LoginHeader/>
            <div className='profile_container mt-4'>
                <div className='p_layout'>
                    <div className='pl_child1'>
                        <div className='p_card1'>
                            <div className='position-relative d-inline'>
                                <img src={userDetailState?.user?.image} className="p_profileImg" alt=""/>
                                <img src={plusIcon} className="plusIconOther" alt=""/>
                            </div>

                            <h3 className='para1 username'>Hi, {userDetailState?.user?.firstName}!</h3>
                            <div>
                                <Link to="/accountsettings">
                                    <button className="button1">account settings</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='pl_child2'>
                        <h1 className='titlep1 text-center mt-5'>{selectedRegistry?.registryName} of {userDetailState?.user?.firstName}!</h1>
                        <div className='py-4'>
                            {/* card start */}
                            {
                                selectedRegistry?.service?.map((data, i) => {
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
                                        <div className="mt-5 float-end">
                                            <button className='mt-3 button2 w-80'
                                            >PURCHASE
                                            </button>
                                        </div>
                                    </div>
                                })
                            }
                            {/* card end */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PrivateRegistry;
