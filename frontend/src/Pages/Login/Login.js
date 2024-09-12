import React, { useState } from "react";
import logo from "../../assets/images/login_logo.png";
import {Container} from "react-bootstrap";
import {trackPromise} from "react-promise-tracker";
import axios from "axios";
import {toastHandler} from "../../Components/toaster";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setUserDetail} from "../../store/action/user-detail-actions";
import Header from "../../Components/Header/Header";
import {setTokenActions} from "../../store/action/setToken-actions";

function Login() {
    // State to hold form data for login (email and password)   
    const [loginFormData, setLoginFormData] = useState({ emailAddress: "", password: "" });
    
    // Redux hooks to dispatch actions and navigate between routes
    const dispatch = useDispatch();
    const navigate = useNavigate();

   /**
   * Function to handle changes in the input fields (email and password).
   * This dynamically updates the loginFormData state based on input field changes.
   * @param {Object} e - Event object from the input field.
   */
    const loginInfo = (e) => {
        const { name, value } = e.target; // Destructuring the name and value from the input field
        // Update the state dynamically using the input field's name as the key
        setLoginFormData((prevState) => ({
          ...prevState, // Keep the previous state
          [name]: value, //  Update the specific field with the new value
        }));
      };

    /**
   * Function to validate the input fields before making the API call.
   * Ensures the email is in a valid format and the password meets minimum requirements.
   * @returns {boolean} - Returns true if inputs are valid; false otherwise.
   */
  const validateInputs = () => {
    const { emailAddress, password } = loginFormData; // Destructuring state values

    // Check if any of the fields are empty
    if (!emailAddress || !password) {
      toastHandler("Please fill in all the fields."); // Show error message if fields are empty
      return false; // Return false to indicate validation failure
    }

    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailAddress)) {
      toastHandler("Please enter a valid email address."); // Show error message for invalid email
      return false; // Return false to indicate validation failure
    }

    // Check if the password meets the minimum length requirement
    if (password.length < 6) {
      toastHandler("Password must be at least 6 characters long."); // Show error message for short password
      return false; // Return false to indicate validation failure
    }

    return true; // All validations passed
  };


  /**
   * Function to handle the login service call to the backend API.
   * Makes an asynchronous API call to authenticate the user with the provided credentials.
   * If successful, updates the Redux store with user details and token, then navigates to the profile page.
   */  
  const loginService = async () => {
    // Validate inputs before making the API call
    if (!validateInputs()) return;

    try {
      // Make the API call using axios within a trackPromise wrapper to handle loading state
      const response = await trackPromise(
        axios.post(
          `${window.WORKSPACE_URL}/api/user/login`, // Backend login endpoint
          loginFormData, // Send the form data (email and password) in the request body
          { headers: { "Content-Type": "application/json" } } // Set the content type to JSON
        )
      );

      // If the login is successful, response status will be 200 and message will be 'success'
      if (response.status === 200 && response.data.message === "success") {
        // Dispatch actions to update the Redux store with user details and token
        dispatch(setUserDetail(response.data.data)); // Store user details in Redux
        dispatch(setTokenActions(response.data.token)); // Store authentication token in Redux
        navigate("/profile"); // Navigate to the profile page upon successful login
      }
    } catch (error) {
      // Handle any errors that occur during the API call
      toastHandler(error.response?.data?.data || "An error occurred. Please try again."); // Show an error message
    }
  };

    return (
        <div className='Registration'>
            {/* Render the header component */}
            <Header/>
            <div>
                <Container>
                    <div className="login_area">
                        <div className="login_box">
                            <img src={logo} className="login_logo" alt=""/>
                            <div className="p-3"></div>

                            {/* Input field for the email address */}
                            <div className="input_container mb-4">
                                <label htmlFor="" className="input_label"
                                >
                                    Email Address
                                </label>
                                <input 
                                type="text"
                                className="input_field w-100"
                                name="emailAddress"
                                value={loginFormData.emailAddress} // Bind input value to state
                                onChange={loginInfo} // Handle input changes
                                />
                            </div>

                            {/* Input field for the password */}
                            <div className="input_container mb-4">
                                <label htmlFor="" className="input_label">
                                    Password
                                </label>
                                <input 
                                    type="password" 
                                    className="input_field w-100"
                                    name="password"
                                    value={loginFormData.password} // Bind input value to state
                                    onChange={loginInfo} // Handle input changes                            </div>
                                    />
                            </div>

                             {/* Link for forgotten password (functionality not yet implemented) */}
                            <p className="input_label mt-3">Forgot password?</p>

                            {/* Login button to trigger the login service call */}
                            <div className="mt-4">
                                <button 
                                    className="button2 rounded-3 px-4 px-md-5"
                                    onClick={(e) => loginService(e)}  // Trigger the login service function on click
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
