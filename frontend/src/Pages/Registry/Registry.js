import React, {useEffect, useState} from 'react'
import LoginHeader from '../../Components/Header/LoginHeader'
import plusIcon from '../../assets/images/icons/plusIcon.svg'
import {AiFillLock} from 'react-icons/ai';
import img from '../../assets/images/p_cradimg.png'
import {Col, Container, Row} from 'react-bootstrap';
import filterIcon from '../../assets/images/icons/filter.svg'
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {getServices} from "../../store/action/services-actions";
import {toastHandler} from "../../Components/toaster";
import {ToastContainer} from "react-toastify";
//import addRegistryModal from "../../model/addRegistryModal";
import {selectedRegistryAction} from "../../store/action/selected-registry-action";
import {setUserDetail} from "../../store/action/user-detail-actions";
import icon1 from "../../assets/images/what_even_happend/icon1.png";
import r_icon1 from "../../assets/images/what_even_happend/r_icon1.png";
import icon2 from "../../assets/images/what_even_happend/icon2.png";
import r_icon2 from "../../assets/images/what_even_happend/r_icon2.png";
import icon3 from "../../assets/images/what_even_happend/icon3.png";
import r_icon3 from "../../assets/images/what_even_happend/r_icon3.png";
import icon4 from "../../assets/images/what_even_happend/icon4.png";
import r_icon4 from "../../assets/images/what_even_happend/r_icon4.png";
import icon5 from "../../assets/images/what_even_happend/icon5.png";
import r_icon5 from "../../assets/images/what_even_happend/r_icon5.png";
import icon6 from "../../assets/images/what_even_happend/icon6.png";
import r_icon6 from "../../assets/images/what_even_happend/r_icon6.png";
import icon7 from "../../assets/images/what_even_happend/icon7.png";
import r_icon7 from "../../assets/images/what_even_happend/r_icon7.png";
import icon8 from "../../assets/images/what_even_happend/icon8.png";
import r_icon8 from "../../assets/images/what_even_happend/r_icon8.png";
import ex_icon1 from "../../assets/images/what_even_happend/ex_icon1.png";
import ex_icon2 from "../../assets/images/what_even_happend/ex_icon2.png";
import ex_icon3 from "../../assets/images/what_even_happend/ex_icon3.png";

function Registry() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const userDetailState = useSelector(state => state.userDetail.userDetail);
    const token = useSelector(state => state.token.token);
    const selectedRegistry = useSelector(state => state.selectedRegistry.selectedRegistry);
    const [registryName, registryNameInfo] = useState(selectedRegistry?.registryName);
    const [show1, setShow1] = useState('block')
    const [show2, setShow2] = useState('none')
    const [show3, setShow3] = useState('none')
    const [show4, setShow4] = useState('none')
    const [show5, setShow5] = useState('none')
    const [imageRegistry, setImage] = useState('')
    const [feelingValue, setFeelingValue] = useState("")
    const [value, setValue] = useState('')
    const [icon, setIcon] = useState('')
    let eventID = '';
    let navigate = useNavigate();
    const dispatch = useDispatch();

    // service call
    // Function to handle the registry API call
    const doneRegistries = () => {
        // Preparing the data to be sent in the API request
    //    let addRegistryData = addRegistryModal;
    //    addRegistryData.registryName = registryName;
    //    addRegistryData.feeling = feelingValue;
    //    addRegistryData.eventID = eventID;
    //    addRegistryData.image = imageRegistry;
    //    addRegistryData.token = token;

        // trackPromise is used to handle loading state while the request is being made
        trackPromise(
            // Making an HTTP POST request using axios
            axios({
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/user/registries',
        //        data: JSON.stringify(addRegistryData)
            })
                // Handling the successful response
                .then(function (response) {
                    // Checking if the response status and message indicate success
                    if (response.data.status === '200' && response.data.message === 'success') {
                        // Retrieving the last registry item from the response data
                        let registry = response.data.data[response?.data?.data?.length - 1];
                        // Dispatching an action to update the state with the selected registry
                        dispatch(selectedRegistryAction(registry));
                        // Dispatching an action to update the user details with the new registries list
                        dispatch(setUserDetail({user: userDetailState?.user, registries: response?.data.data}));
                        // Navigating to the /registry/services route
                        navigate('/registry/services')
                    }
                })
                // Handling any errors that occur during the request
                .catch(function (error) {
                    // Displaying an error message to the user
                    toastHandler(error.response.data.data);
                })).then(r => console.log(r));  // Logging the result of the trackPromise function (optional)
    }
    const addRegistryServiceHandler = () => {
        if (selectedRegistry?._id) {
            servicesApiHandler()
        } else {
            toastHandler('First save or create your registry');
        }
    }
    // services api call
    // Function to handle the services API call
    const servicesApiHandler = () => {
        // trackPromise is used to handle loading state while the request is being made
        trackPromise(
             // Making an HTTP GET request using axios
            axios({
                method: "get",
                headers: {
                    "Content-Type": "application/json",
                },
                url: 'https://afternoon-island-30959.herokuapp.com/service/',
            })
                // Handling the successful response
                .then(function (response) {
                    // Checking if the response status and message indicate success
                    if (response.data.status === '200' && response.data.message === 'success') {
                        // Dispatching an action to update the state with the received data
                        dispatch(getServices(response.data.data))
                        // Navigating to the /addServices route
                        navigate("/addServices");
                    }
                })
                // Handling any errors that occur during the request
                .catch(function (error) {
                     // Displaying an error message to the user
                    toastHandler(error.response.data.data);
                })).then(r => console.log(r)); // Logging the result of the trackPromise function (optional)
    }

    // what even happend handle start

    const handleBirth = () => {
        setShow1('none')
        setShow2('block')
        setValue('Birth')
        setIcon(r_icon1)
        eventID = value
    }

    const handleAdoption = () => {
        setShow1('none')
        setShow2('block')
        setValue('Adoption')
        setIcon(r_icon2)
        eventID = value
    }

    const handleMoving = () => {
        setShow1('none')
        setShow2('block')
        setValue('Moving')
        setIcon(r_icon3)
        eventID = value
    }

    const handleLossOfIncome = () => {
        setShow1('none')
        setShow2('block')
        setValue('Loss of income')
        setIcon(r_icon4)
        eventID = value
    }

    const handleInstitutionalization = () => {
        setShow1('none')
        setShow2('block')
        setValue('Institutionalization')
        setIcon(r_icon5)
        eventID = value
    }

    const handleDivorce = () => {
        setShow1('none')
        setShow2('block')
        setValue('Divorce')
        setIcon(r_icon6)
        eventID = value
    }

    const handleSickness = () => {
        setShow1('none')
        setShow2('block')
        setValue('Sickness')
        setIcon(r_icon7)
        eventID = value
    }

    const handleDeath = () => {
        setShow1('none')
        setShow2('block')
        setValue('Death')
        setIcon(r_icon8)
        eventID = value
    }

    const handleNext = () => {
        setShow1('none')
        setShow2('none')
        setShow3('block')
    }

    const handleImageNext = () => {
        let message = '';
        if (registryName === undefined) {
            if (message) {
                message += ' and'
            }
            message += ' Registry Name'
        }
        if (message) {
            toastHandler('Please add' + ' ' + message);
        } else {
            setShow1('none')
            setShow2('none')
            setShow3('none')
            setShow4('block')
        }
    }

    // How they are feelingHow they are feeling start

    const handleExited = () => {
        setShow1('none')
        setShow2('none')
        setShow3('none')
        setShow4('none')
        setShow5('block')
        setFeelingValue("Excited")
        doneRegistries();
    }

    const handleOverwhelmed = () => {
        setShow1('none')
        setShow2('none')
        setShow3('none')
        setShow4('none')
        setShow5('block')
        setFeelingValue("Overwhelmed")
        doneRegistries();
    }

    const handleExploring = () => {
        setShow1('none')
        setShow2('none')
        setShow3('none')
        setShow4('none')
        setShow5('block')
        setFeelingValue("Exploring")
        doneRegistries();
    }

    const getBase64StringFromDataURL = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        let sliderImg = document.getElementById("registry_img");
        sliderImg.src = String(base64);
        setImage(String(base64));
    };

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

                            <p className='para2 mt-3 text-center text_gold op_1'>
                                <AiFillLock className='AiFillLock'/><b>Your Registry is Hidden</b>
                            </p>

                            <div>
                                <Link to="/accountsettings">
                                    <button className='button1'>account settings</button>
                                </Link>
                            </div>
                        </div>
                        <div className='p_card2 py-3 mt-4'>
                            <>
                                <input
                                    type="text"
                                    className="input_field w-80"
                                    placeholder="Registry Name"
                                    name="registryName"
                                    value={registryName}
                                    onChange={(e) => registryNameInfo(e.target.value)}
                                />
                                {/*<button className=' button1 mt-1 w-80'  style={{display: show5}}*/}
                                {/*        >SAVE*/}
                                {/*</button>*/}
                            </>
                        </div>
                    </div>
                    {/* what even happend start */}
                    <div style={{display: show1}}>
                        <Container>
                            <h1 className='titlep1 text-center mt-5'>
                                What <span className='titlep2'>event</span> happened? <br/>
                            </h1>
                            <div className='weh_main pb_100'>
                                <div className='weh_child' onClick={handleBirth}>
                                    <div className='wc_c'>
                                        <img src={icon1} alt=""/>
                                        <p className='para1 mt-2'><b>Birth</b></p>
                                    </div>
                                    <img src={r_icon1} className="react_img" alt=""/>
                                </div>
                                <div className='weh_child' onClick={handleAdoption}>
                                    <div className='wc_c'>
                                        <img src={icon2} alt=""/>
                                        <p className='para1 mt-2'><b>Adoption</b></p>
                                    </div>
                                    <img src={r_icon2} className="react_img" alt=""/>
                                </div>
                                <div className='weh_child' onClick={handleMoving}>
                                    <div className='wc_c'>
                                        <img src={icon3} alt=""/>
                                        <p className='para1 mt-2'><b>Moving</b></p>
                                    </div>
                                    <img src={r_icon3} className="react_img" alt=""/>
                                </div>
                                <div className='weh_child' onClick={handleLossOfIncome}>
                                    <div className='wc_c'>
                                        <img src={icon4} alt=""/>
                                        <p className='para1 mt-2'><b>Loss of income</b></p>
                                    </div>
                                    <img src={r_icon4} className="react_img" alt=""/>
                                </div>
                                <div className='weh_child' onClick={handleInstitutionalization}>
                                    <div className='wc_c'>
                                        <img src={icon5} alt=""/>
                                        <p className='para1 mt-2'><b>Institutionalization</b></p>
                                    </div>
                                    <img src={r_icon5} className="react_img" alt=""/>
                                </div>
                                <div className='weh_child' onClick={handleDivorce}>
                                    <div className='wc_c'>
                                        <img src={icon6} alt=""/>
                                        <p className='para1 mt-2'><b>Divorce</b></p>
                                    </div>
                                    <img src={r_icon6} className="react_img" alt=""/>
                                </div>
                                <div className='weh_child' onClick={handleSickness}>
                                    <div className='wc_c'>
                                        <img src={icon7} alt=""/>
                                        <p className='para1 mt-2'><b>Sickness</b></p>
                                    </div>
                                    <img src={r_icon7} className="react_img" alt=""/>
                                </div>
                                <div className='weh_child' onClick={handleDeath}>
                                    <div className='wc_c'>
                                        <img src={icon8} alt=""/>
                                        <p className='para1 mt-2'><b>Death</b></p>
                                    </div>
                                    <img src={r_icon8} className="react_img" alt=""/>
                                </div>
                            </div>

                        </Container>
                    </div>
                    {/* what even happend end */}

                    {/* Reaction to answer */}
                    <div style={{display: show2}}>
                        <Container>
                            <div className='rta_main'>
                                <div>
                                    <img src={icon} className="rta_icon" alt=""/>
                                    <h4 className='titlep2 mt-3'>Congratulations!</h4>
                                    <h4 className='titlep1'>{value} is an amazing journey.</h4>
                                    <div>
                                        <button className='button2 px-5 mt-3' onClick={handleNext}>next</button>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                    {/* Reaction to answer */}
                    {/* Reaction to answer */}
                    <div style={{display: show3}}>
                        <Container>
                            <ToastContainer/>
                            <div className='rta_main'>
                                <div>
                                    <h4 className='titlep2'>Select Profile Image Of Registry</h4>
                                    <div className="position-relative titlep2 mb-3">
                                        <div className="input_file_area_registry titlep1">
                                            <input
                                                type="file"
                                                name=""
                                                id=""
                                                onChange={(e) => getBase64StringFromDataURL(e)}
                                            />
                                            <div className="input_image_main">
                                                <img src={imageRegistry} id="registry_img"
                                                     className="p_profileImg"
                                                     alt=""/>
                                                <img src={plusIcon} className="plusIcon" alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className='button2 mt-3' onClick={handleImageNext}>next</button>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                    {/* Reaction to answer */}

                    {/* How they are feelingHow they are feeling */}
                    <div style={{display: show4}}>
                        <Container>
                            <div className='rta_main'>
                                <div>
                                    <h4 className='titlep2 mt-5'>How are you feeling about</h4>
                                    <h4 className='titlep1 mb-4'>this whole registry thing?</h4>
                                    <div className='fh_main'>
                                        <div>
                                            <img src={ex_icon1} className="ex_icon" alt="" onClick={handleExited}/>
                                        </div>
                                        <div>
                                            <img src={ex_icon2} className="ex_icon" alt="" onClick={handleOverwhelmed}/>
                                        </div>
                                        <div className='fh_main_child3'>
                                            <img src={ex_icon3} className="ex_icon" alt="" onClick={handleExploring}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                    {/* Selected Services */}
                    <div style={{display: show5}}>
                        <div className='pl_child2'>
                            <ToastContainer/>
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
                                        <option value="">Category: All</option>
                                        <option value="">Category: All</option>
                                        <option value="">Category: All</option>
                                        <option value="">Category: All</option>
                                    </select>
                                    <select name="" id="" className='input_field select ms-2'>
                                        <option value="">List by: Relevance</option>
                                        <option value="">List by: Relevance</option>
                                        <option value="">List by: Relevance</option>
                                        <option value="">List by: Relevance</option>
                                    </select>
                                    <select name="" id="" className='input_field select ms-2'>
                                        <option value="">Price: +50</option>
                                        <option value="">Price: +50</option>
                                        <option value="">Price: +50</option>
                                        <option value="">Price: +50</option>
                                    </select>
                                    <select name="" id="" className='input_field select ms-2'>
                                        <option value="">Rates: +5</option>
                                        <option value="">Rates: +5</option>
                                        <option value="">Rates: +5</option>
                                        <option value="">Rates: +5</option>
                                    </select>
                                </div>
                            </div>
                            <div className='py-4'>

                                {/* card start */}
                                {
                                    selectedRegistry?.services?.map((data, i) => {
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
                                            <div className='p_card_child4 pc_child'>
                                                <div className='pc_btn_container'>
                                                    <button className=' float-end button1 deleteBtn w-100'
                                                    >DELETE
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                                {/* card end */}
                                <div className=" float-end">
                                    <button className='mt-3 button2 w-80'
                                            onClick={(e) => addRegistryServiceHandler()}>ADD SERVICE
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registry
