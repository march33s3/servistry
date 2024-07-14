import React from 'react';
import 'react-alice-carousel/lib/alice-carousel.css';
import LoginHeader from "../../../Components/Header/LoginHeader";
import Footer from "../../../Components/Footer/Footer";
import TestimonialSlider from "./TestimonialSlider";
import {Container} from "react-bootstrap";

function TestimonialSliderParent() {


    return (
        <div className='position-relative'>
            <LoginHeader/>
            <div className='py_100 h_section3'>
                <Container>
                    <h1 className='titlep1 text-center'>
                        What people
                        <span className='titlep2'> say about</span>
                    </h1>
                    <div className='mt-5'>
                        <TestimonialSlider/>
                    </div>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}

export default TestimonialSliderParent
