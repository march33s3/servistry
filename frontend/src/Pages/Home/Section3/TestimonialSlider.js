import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import stars from '../../../assets/images/fivestar.png'

function TestimonialSlider() {

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };

    const items = [
        <div className="item" data-value="1">
            <div className='ts_alice_div'>
                <div>
                    <p className='mb-2'><b>Person Name</b></p>
                    <img src={stars} className="stars" alt="" />
                    <p className='mt-3'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    </p>
                </div>
            </div>
        </div>,
        <div className="item" data-value="2">
            <div className='ts_alice_div'>
                <div>
                    <p className='mb-2'><b>Person Name</b></p>
                    <img src={stars} className="stars" alt="" />
                    <p className='mt-3'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    </p>
                </div>
            </div>
        </div>,
        <div className="item" data-value="3">
            <div className='ts_alice_div'>
                <div>
                    <p className='mb-2'><b>Person Name</b></p>
                    <img src={stars} className="stars" alt="" />
                    <p className='mt-3'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    </p>
                </div>
            </div>
        </div>,
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const slidePrev = () => setActiveIndex(activeIndex - 1);
    const slideNext = () => setActiveIndex(activeIndex + 1);

    return (
        <div className='position-relative'>
            <AliceCarousel
                autoPlay
                autoPlayInterval={2000}
                animationDuration={2000}
                infinite
                mouseTracking
                disableButtonsControls
                items={items}
                responsive={responsive}
                activeIndex={activeIndex}
                controlsStrategy="alternate"
            />
            <div className="b-refs-buttons">
                <div className='slider_arrow left_arrow' onClick={slidePrev}>
                    <AiOutlineLeft className='arrow_Icon' />
                </div>
                <div className='slider_arrow right_arrow' onClick={slideNext}>
                    <AiOutlineRight className='arrow_Icon' />
                </div>
            </div>
        </div>
    )
}

export default TestimonialSlider