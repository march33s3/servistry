import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {Container} from 'react-bootstrap'
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {ToastContainer} from 'react-toastify';
import {AiFillEye, AiFillLock} from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../Components/Header/Header'
import {setUserDetail} from "../../store/action/user-detail-actions";
import {toastHandler} from "../../Components/toaster";
import { useEffect } from 'react';
import { BACKEND_URL } from '../../config';

// Import images
import icon1 from '../../assets/images/what_even_happend/icon1.png'
import icon2 from '../../assets/images/what_even_happend/icon2.png'
import icon3 from '../../assets/images/what_even_happend/icon3.png'
import icon4 from '../../assets/images/what_even_happend/icon4.png'
import icon5 from '../../assets/images/what_even_happend/icon5.png'
import icon6 from '../../assets/images/what_even_happend/icon6.png'
import icon7 from '../../assets/images/what_even_happend/icon7.png'
import icon8 from '../../assets/images/what_even_happend/icon8.png'
import r_icon1 from '../../assets/images/what_even_happend/r_icon1.png'
import r_icon2 from '../../assets/images/what_even_happend/r_icon2.png'
import r_icon3 from '../../assets/images/what_even_happend/r_icon3.png'
import r_icon4 from '../../assets/images/what_even_happend/r_icon4.png'
import r_icon5 from '../../assets/images/what_even_happend/r_icon5.png'
import r_icon6 from '../../assets/images/what_even_happend/r_icon6.png'
import r_icon7 from '../../assets/images/what_even_happend/r_icon7.png'
import r_icon8 from '../../assets/images/what_even_happend/r_icon8.png'
import ex_icon1 from '../../assets/images/what_even_happend/ex_icon1.png'
import ex_icon2 from '../../assets/images/what_even_happend/ex_icon2.png'
import ex_icon3 from '../../assets/images/what_even_happend/ex_icon3.png'



const Registration = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [show1, setShow1] = useState('block')
    const [show2, setShow2] = useState('none')
    const [show3, setShow3] = useState('none')
    const [show4, setShow4] = useState('none')
    const [value, setValue] = useState('')
    const [icon, setIcon] = useState('')
    const [feeltext, setFeeltext] = useState("")
    const [feelingValue, setFeelingValue] = useState("")
    const [feeltext2, setFeeltext2] = useState("")


    const [registrationObject, setRegistrationObject] = useState({
        userType: '',
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        promotionalOffersAndUpdates: false,
    });

    // what even happend handle start

    const handleBirth = () => {
        setShow1('none')
        setShow2('block')
        setValue('Birth')
        setIcon(r_icon1)
        registrationObject.eventID = value
    }

    const handleAdoption = () => {
        setShow1('none')
        setShow2('block')
        setValue('Adoption')
        setIcon(r_icon2)
        registrationObject.eventID = value
    }

    const handleMoving = () => {
        setShow1('none')
        setShow2('block')
        setValue('Moving')
        setIcon(r_icon3)
        registrationObject.eventID = value
    }

    const handleLossOfIncome = () => {
        setShow1('none')
        setShow2('block')
        setValue('Loss of income')
        setIcon(r_icon4)
    }

    const handleInstitutionalization = () => {
        setShow1('none')
        setShow2('block')
        setValue('Institutionalization')
        setIcon(r_icon5)
    }

    const handleDivorce = () => {
        setShow1('none')
        setShow2('block')
        setValue('Divorce')
        setIcon(r_icon6)
    }

    const handleSickness = () => {
        setShow1('none')
        setShow2('block')
        setValue('Sickness')
        setIcon(r_icon7)
    }

    const handleDeath = () => {
        setShow1('none')
        setShow2('block')
        setValue('Death')
        setIcon(r_icon8)
    }

    const handleNext = () => {
        setShow1('none')
        setShow2('none')
        setShow3('block')
        registrationObject.eventID = value
    }
    
    // How they are feeling start

    const handleExited = () => {
        setShow1('none')
        setShow2('none')
        setShow3('none')
        setShow4('block')
        setFeeltext("We're excited too!")
        setFeelingValue("Excited")
        setFeeltext2(`Let's create your registry together.`)
    }

    const handleOverwhelmed = () => {
        setShow1('none')
        setShow2('none')
        setShow3('none')
        setShow4('block')
        setFeeltext(`Yes, we understand this time can be overwhelming.`)
        setFeelingValue("Overwhelmed")
        setFeeltext2(`Let’s take this one step at a time.`)
    }

    const handleExploring = () => {
        setShow1('none')
        setShow2('none')
        setShow3('none')
        setShow4('block')
        setFeelingValue("Exploring")
        setFeeltext("Take a look around!")
    }

    // password show/hide
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    // value change handler
    const createGuardInfo = (registrationForm) => {
        const { name, value, checked } = registrationForm.target;
      
        // Update the state based on the input field changes
        setRegistrationObject((prevState) => ({
          ...prevState,
          [name]: name === 'promotionalOffersAndUpdates' ? checked : value, // Handle checkbox separately
        }));
      };


    // service call
    const registrationService = async () => {
        
        registrationObject.feeling = feelingValue
        try {
            const response = await trackPromise(
            axios.post(`${BACKEND_URL}/api/registration/register`,registrationObject, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
        );


        if (response.status === 201 && response.data.message === 'success') {
            dispatch(setUserDetail(response.data.data))

          // Store token in localStorage for PrivateRoute authentication
          localStorage.setItem('token', response.data.token);

            navigate("/profile");
        }
        
    } catch (error) {
            console.error("Error during registration:", error.response);
            toastHandler(error.response?.data?.message || 'An error occurred during registration.');
    }

};



return (
    <div className='Registration'>
      {/* Header Component */}
      <Header />
  
      {/* Section 1: "What event happened?" */}
      <div style={{ display: show1 }}>
        <Container>
          <h1 className='titlep1 text-center mt-5'>
            What <span className='titlep2'>event</span> happened? <br />
          </h1>
  
          {/* Event Options (Birth, Adoption, Moving, etc.) */}
          <div className='weh_main pb_100'>
            {/* Event Option: Birth */}
            <div className='weh_child' onClick={handleBirth}>
              <div className='wc_c'>
                <img src={icon1} alt='' />
                <p className='para1 mt-2'><b>Birth</b></p>
              </div>
              <img src={r_icon1} className='react_img' alt='' />
            </div>
  
            {/* Event Option: Adoption */}
            <div className='weh_child' onClick={handleAdoption}>
              <div className='wc_c'>
                <img src={icon2} alt='' />
                <p className='para1 mt-2'><b>Adoption</b></p>
              </div>
              <img src={r_icon2} className='react_img' alt='' />
            </div>
  
            {/* Event Option: Moving */}
            <div className='weh_child' onClick={handleMoving}>
              <div className='wc_c'>
                <img src={icon3} alt='' />
                <p className='para1 mt-2'><b>Moving</b></p>
              </div>
              <img src={r_icon3} className='react_img' alt='' />
            </div>
  
            {/* Event Option: Loss of Income */}
            <div className='weh_child' onClick={handleLossOfIncome}>
              <div className='wc_c'>
                <img src={icon4} alt='' />
                <p className='para1 mt-2'><b>Loss of income</b></p>
              </div>
              <img src={r_icon4} className='react_img' alt='' />
            </div>
  
            {/* Event Option: Institutionalization */}
            <div className='weh_child' onClick={handleInstitutionalization}>
              <div className='wc_c'>
                <img src={icon5} alt='' />
                <p className='para1 mt-2'><b>Institutionalization</b></p>
              </div>
              <img src={r_icon5} className='react_img' alt='' />
            </div>
  
            {/* Event Option: Divorce */}
            <div className='weh_child' onClick={handleDivorce}>
              <div className='wc_c'>
                <img src={icon6} alt='' />
                <p className='para1 mt-2'><b>Divorce</b></p>
              </div>
              <img src={r_icon6} className='react_img' alt='' />
            </div>
  
            {/* Event Option: Sickness */}
            <div className='weh_child' onClick={handleSickness}>
              <div className='wc_c'>
                <img src={icon7} alt='' />
                <p className='para1 mt-2'><b>Sickness</b></p>
              </div>
              <img src={r_icon7} className='react_img' alt='' />
            </div>
  
            {/* Event Option: Death */}
            <div className='weh_child' onClick={handleDeath}>
              <div className='wc_c'>
                <img src={icon8} alt='' />
                <p className='para1 mt-2'><b>Death</b></p>
              </div>
              <img src={r_icon8} className='react_img' alt='' />
            </div>
          </div>
        </Container>
      </div>
      {/* End of "What event happened?" Section */}
  
      {/* Section 2: Reaction to Selected Event */}
      <div style={{ display: show2 }}>
        <Container>
          <div className='rta_main'>
            <div>
              {/* Reaction Icon and Text */}
              <img src={icon} className='rta_icon' alt='' />
              <h4 className='titlep2 mt-3'>Congratulations!</h4>
              <h4 className='titlep1'>{value} is an amazing journey.</h4>
  
              {/* Next Button */}
              <div>
                <button className='button2 px-5 mt-3' onClick={handleNext}>Next</button>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* End of Reaction Section */}
  
      {/* Section 3: "How are you feeling about this whole registry thing?" */}
      <div style={{ display: show3 }}>
        <Container>
          <div className='rta_main'>
            <div>
              {/* Feeling Question */}
              <h4 className='titlep2 mt-5'>How are you feeling about</h4>
              <h4 className='titlep1 mb-4'>this whole registry thing?</h4>
  
              {/* Feeling Options (Excited, Overwhelmed, Exploring) */}
              <div className='fh_main'>
                {/* Feeling Option: Excited */}
                <div>
                  <img src={ex_icon1} className='ex_icon' alt='' onClick={handleExited} />
                </div>
  
                {/* Feeling Option: Overwhelmed */}
                <div>
                  <img src={ex_icon2} className='ex_icon' alt='' onClick={handleOverwhelmed} />
                </div>
  
                {/* Feeling Option: Exploring */}
                <div className='fh_main_child3'>
                  <img src={ex_icon3} className='ex_icon' alt='' onClick={handleExploring} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      {/* End of Feeling Section */}
    

{/* Finish sign up */}
<div style={{ display: show4 }}>
        <Container>
          <div className='signup_container mt-5'>
            <h1 className='titlep1 text-center'>
              <span className='titlep2'>{feeltext}</span> <br />
              {feeltext2}
            </h1>

            {/* Input field for First Name */}
            <div className='input_container mt-4'>
              <label htmlFor='firstName' className='input_label'>First Name</label>
              <input
                type='text'
                className='input_field w-100'
                name='firstName'
                onChange={createGuardInfo}
              />
            </div>

            {/* Input field for Last Name */}
            <div className='input_container mt-4'>
              <label htmlFor='lastName' className='input_label'>Last Name</label>
              <input
                type='text'
                className='input_field w-100'
                name='lastName'
                onChange={createGuardInfo}
              />
            </div>

            {/* Input field for Email Address */}
            <div className='input_container mt-4'>
              <label htmlFor='emailAddress' className='input_label'>Email address</label>
              <input
                type='text'
                className='input_field w-100'
                name='emailAddress'
                onChange={createGuardInfo}
              />
            </div>

            {/* Input field for Password */}
            <div className='input_container mt-4'>
              <label htmlFor='password' className='input_label'>Password</label>
              <div className='position-relative'>
                <input
                  type={passwordShown ? 'text' : 'password'}
                  className='input_field w-100'
                  name='password'
                  onChange={createGuardInfo}
                />
                <AiFillEye className='AiFillEye' onClick={togglePassword} />
              </div>
              <p className='para2 mt-2 ms-2'>Passwords must be at least 8 characters</p>
            </div>

            {/* Checkbox for promotional offers and updates */}
            <label className='r_container'>
              I would like to receive promotional offers and updates
              <input
                type='checkbox'
                name='promotionalOffersAndUpdates'
                onChange={createGuardInfo}
              />
              <span className='checkmark'></span>
            </label>

            {/* Registration button */}
            <div className='mt-4'>
              <button className='button2 w-100' onClick={registrationService}>
                create registry
              </button>
            </div>

            <p className='para2 mt-3 text-center text_gold op_1'>
              <AiFillLock className='AiFillLock' />Your registry is private until you choose to share it.
            </p>

            <p className='para2 mt-4 text-center'>
              By clicking Create Registry! you agree with the{' '}
              <a href='/' className='text_gold'>terms of use</a> and{' '}
              <a href='/' className='text_gold'>privacy policy.</a>
            </p>
          </div>
        </Container>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
