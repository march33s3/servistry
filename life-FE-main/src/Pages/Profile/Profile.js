import React, {useState} from 'react'
import LoginHeader from '../../Components/Header/LoginHeader'
import plusIcon from '../../assets/images/icons/plusIcon.svg'
import img from '../../assets/images/p_cradimg.png'
import edit_gold from '../../assets/images/icons/edit_gold.svg'
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {selectedRegistryAction} from "../../store/action/selected-registry-action";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {setUserDetail} from "../../store/action/user-detail-actions";
import FullScreenPopup, {toggle_popup} from "../../utilities/FullScreenPopup";

function Profile() {
    const userDetailState = useSelector(state => state.userDetail.userDetail, shallowEqual)
    const token = useSelector(state => state.token.token);
    const [deleteData, setDeleteData] = useState('')
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const openRegistry = (data) => {
        dispatch(selectedRegistryAction(data));
        navigate("/registry/services")
    }

    // service call
    const deleteService = (data) => {
        toggle_popup()
        trackPromise(
            axios({
                method: "Delete",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/user/registries',
                data: JSON.stringify({token: token, registryID: data._id})
            })
                .then(function (response) {
                    if (response.status === 200 && response.data.message === 'success') {
                        dispatch(setUserDetail({user: userDetailState?.user, registries: response?.data.data}));
                    }
                })
                .catch(function (error) {
                })).then(r => console.log(r));
    }

    const closeConfirmationPopup = (data) => {
        toggle_popup();
    }

    const deletePopupHandler = (data) => {
        toggle_popup("show");
        setDeleteData(data)
    }
    // add registry state
    const addRegistryState = () => {
        dispatch(selectedRegistryAction(undefined))
        navigate("/registry")
    }
    return (
        <div className='img_overlay'>
            <LoginHeader/>
            <FullScreenPopup title="Delete Servistry">
                <p className="text-center">Are you sure?</p>
                <div className="delete_registry_card">
                    <button className="delete_registry_card_button w-90 me-3" onClick={() => deleteService(deleteData)}>
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
                                <img src={userDetailState?.user?.image} className="p_profileImg" alt=""/>
                                <img src={plusIcon} className="plusIconOther" alt=""/>
                            </div>

                            <h3 className='para1 username'>Hi, {userDetailState?.user?.firstName}!</h3>
                            <div>
                                <Link to="/accountsettings">
                                    <button className="button1">account settings</button>
                                </Link>
                            </div>
                            <img src={edit_gold} className="edit_gold" alt=""/>
                        </div>
                        <div className='service_registry_card mt-4'>
                            <div className="row">
                                <div className="col-2">
                                </div>
                                <div className="col-8">
                                    <button className='mt-3 button2 w-100'
                                            onClick={() => addRegistryState()}>ADD REGISTRY
                                    </button>
                                </div>
                                <div className="col-2">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pl_child2'>
                        <div className='py-4'>
                            {/* card start */}
                            {
                                userDetailState?.registries?.map((data, i) => {
                                    return <div>
                                        <div className='p_card grid_card_registry mt-4'>
                                            <div className='p_card_child1 pc_child'>
                                                <img src={data.image} className="p_c_img" alt=""/>
                                            </div>
                                            <div className='p_card_child2 pc_child'>
                                                <a>
                                                    <h4 className='pc_title'>{data.registryName}</h4>
                                                </a>
                                            </div>
                                            <div className='p_card_child4 pc_child'>
                                                <div className='float-end pc_btn_container'>

                                                    <button className=' float-end button2 w-100'
                                                            onClick={() => openRegistry(data)}
                                                    >VIEW
                                                    </button>
                                                    <button className=' float-end button1 deleteBtn w-100'
                                                            onClick={() => deletePopupHandler(data)}>DELETE
                                                    </button>
                                                </div>
                                            </div>
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
    )
}

export default Profile
