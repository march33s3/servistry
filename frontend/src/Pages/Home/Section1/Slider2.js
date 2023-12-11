import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import icon1 from '../../../assets/images/icons/birth.png'
import icon2 from '../../../assets/images/icons/Adoption.png'
import icon3 from '../../../assets/images/icons/Divorce.png'
import icon4 from '../../../assets/images/icons/sickness.png'
import icon5 from '../../../assets/images/icons/Loss_of_income.png'
import icon6 from '../../../assets/images/icons/Moving.png'
import icon7 from '../../../assets/images/icons/Death.png'

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';


function Slider2() {

    const responsive = {
        0: { items: 2 },
        568: { items: 5 },
        1024: { items: 7 },
    };

    const items = [
        <div className="item" data-value="1">
            <div className='alice_div'>
                <div>
                    <img src={icon1} alt="" />
                    <p className='para1'>Birth</p>
                </div>
            </div>
        </div>,
        <div className="item" data-value="2">
            <div className='alice_div'>
                <div>
                    <img src={icon2} alt="" />
                    <p className='para1'>Adoption</p>
                </div>
            </div>
        </div>,
        <div className="item" data-value="3">
            <div className='alice_div'>
                <div>
                    <img src={icon3} alt="" />
                    <p className='para1'>Divorce</p>
                </div>
            </div>
        </div>,
        <div className="item" data-value="4">
            <div className='alice_div'>
                <div>
                    <img src={icon4} alt="" />
                    <p className='para1'>Sickness</p>
                </div>
            </div>
        </div>,
        <div className="item" data-value="5">
            <div className='alice_div'>
                <div>
                    <img src={icon5} alt="" />
                    <p className='para1'>Loss of income</p>
                </div>
            </div>
        </div>,
        <div className="item" data-value="6">
            <div className='alice_div'>
                <div>
                    <img src={icon6} alt="" />
                    <p className='para1'>Moving</p>
                </div>
            </div>
        </div>,
        <div className="item" data-value="7">
            <div className='alice_div'>
                <div>
                    <img src={icon7} alt="" />
                    <p className='para1'>Birth</p>
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
                autoPlayInterval={1500}
                animationDuration={1500}
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

export default Slider2