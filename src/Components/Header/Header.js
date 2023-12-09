import React, {useState} from 'react'
import '../../assets/css/style.css'
import '../../assets/css/responsive.css'
import Logo from '../Logo'
import {MdShoppingCart} from 'react-icons/md';
import {GiHamburgerMenu} from 'react-icons/gi';
import {Link, useNavigate} from 'react-router-dom';
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {useDispatch} from "react-redux";
import {getServices} from "../../store/action/services-actions";
import {toastHandler} from "../toaster";
import {ToastContainer} from "react-toastify";

function Header() {
    const [show, setShow] = useState('-3000px');
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
                            <li><a href="/">Home</a></li>
                            <li><Link to="" onClick={(e) => servicesApiHandler(e)}>Services</Link></li>
                            <li><a href="/">How it Works</a></li>
                            {/*<li><Link to="/testimonialSlider">Testimonials</Link></li>*/}
                            {/*<li><a href="/">Contact Us</a></li>*/}
                        </ul>
                    </div>
                </div>
                <div className='nav_main_child3'>
                    <div>
                        <Link to="/login">
                        <button className='button1 desk_btn'>Login</button>
                        </Link>
                        <Link to='/registration'>
                            <button className='button2 ms-3 desk_btn'>sign up</button>
                        </Link>
                        {/* <a href="/"><img className='ms-3 shopping_cart_img' src={shoping} alt="" /></a> */}
                        <a href="/"><MdShoppingCart className='ms-3 shopping_cart_img'/></a>
                        <GiHamburgerMenu className='humberger_menu' onClick={handleHumberger}/>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Header
