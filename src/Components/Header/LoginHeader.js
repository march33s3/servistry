import React, {useState} from 'react'
import '../../assets/css/style.css'
import '../../assets/css/responsive.css'
import Logo from '../Logo'
import {MdShoppingCart} from 'react-icons/md';
import {GiHamburgerMenu} from 'react-icons/gi';
import {Link, useNavigate} from 'react-router-dom';
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {getServices} from "../../store/action/services-actions";
import {toastHandler} from "../toaster";
import {useDispatch, useSelector} from "react-redux";
import img from "../../assets/images/p_cradimg.png";
import {Dropdown} from "react-bootstrap";
import {logoutAction} from "../../store/action/logout-action";

function LoginHeader() {
    const userDetailState = useSelector(state => state.userDetail.userDetail);
    const [show, setShow] = useState('-3000px')
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const handleHumberger = () => {
        if (show === '-3000px') {
            setShow('50px')
        } else {
            setShow('-3000px')
        }
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
                        navigate("/services");
                    }
                })
                .catch(function (error) {
                    toastHandler(error.response.data.data);
                })).then(r => console.log(r));
    }

    const profileHandler = () => {
        navigate('/profile')
    }
    const logOutHandler = () => {
        dispatch(logoutAction(undefined));
        navigate('/')
    }
    return (
        <div className='header'>
            <div className='nav_main'>
                <div>
                    <Link to="/">
                        <Logo/>
                    </Link>
                </div>
                <div className='nav_main_child2'>
                    <div className='menu' style={{top: show}}>
                        <ul className='list-unstyled mb-0'>
                            <li onClick={() => navigate('/')}><Link to="">Home</Link></li>
                            <li><Link to="" onClick={(e) => servicesApiHandler(e)}>Services</Link></li>
                            {/*<li><a href="/">Contact Us</a></li>*/}
                            {/*<li><a href="/">Help Center</a></li>*/}
                        </ul>
                    </div>
                </div>
                <div className='nav_main_child3'>
                    <div className='d-flex align-items-center'>
                        <div className='userinfo_div'>
                            <img src={userDetailState?.user?.image} onClick={() => profileHandler()} className='userimg'
                                 alt=""/>
                            <p className='para1 mb-0 ms-3'>{userDetailState?.user?.firstName}</p>
                        </div>
                        <Dropdown>
                            <Dropdown.Toggle variant="Secondary" className="dropdown">
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => logOutHandler()}>LOGOUT</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <a href="/"><MdShoppingCart className='ms-3 shopping_cart_img'/></a>
                        <GiHamburgerMenu className='humberger_menu' onClick={handleHumberger}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginHeader
