
import React from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles

//import 'swiper/css'
//import 'swiper/css/navigation';
//import 'swiper/css/pagination';
//import 'swiper/css/scrollbar';


import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
//import 'swiper/modules/ally/ally.min.css';




import img1 from '../../../assets/images/servistry-gift-box.png';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Slider() {
    return (
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            Autoplay={true}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
        >
            <SwiperSlide>
                <Container>
                    <div className='slider_grid'>
                        <div className='sg_child1'>
                            <div>
                                <h1 className='titlep1'>We help you in</h1>
                                <h1 className='titlep2'>all moments</h1>
                                <p className='para1 my-4'>
                                    Lorem Ipsum is simply dummy text of the <br />
                                    printing and typesetting industry. Lorem <br />
                                    Ipsum has been the industry's standard <br />
                                    dummy text ever since the 1500s
                                </p>
                                <div>
                                    <Link to="/registration"><button className='button2'>Start Registry</button></Link>
                                    {/*<Link to="/registry"><button className='button1 ms-2'>Find Registry</button></Link>*/}
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={img1} className="sliderimg" alt="" />
                        </div>
                    </div>
                </Container>
            </SwiperSlide>
            <SwiperSlide>
                <Container>
                    <div className='slider_grid'>
                        <div className='sg_child1'>
                            <div>
                                <h1 className='titlep1'>We help you in</h1>
                                <h1 className='titlep2'>all moments</h1>
                                <p className='para1'>
                                    Lorem Ipsum is simply dummy text of the <br />
                                    printing and typesetting industry. Lorem <br />
                                    Ipsum has been the industry's standard <br />
                                    dummy text ever since the 1500s
                                </p>
                                <div>
                                    <button className='button2'>Start Registry</button>
                                    {/*<button className='button1 ms-2'>Find Registry</button>*/}
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={img1} className="sliderimg" alt="" />
                        </div>
                    </div>
                </Container>
            </SwiperSlide>
            <SwiperSlide>
                <Container>
                    <div className='slider_grid'>
                        <div className='sg_child1'>
                            <div>
                                <h1 className='titlep1'>We help you in</h1>
                                <h1 className='titlep2'>all moments</h1>
                                <p className='para1'>
                                    Lorem Ipsum is simply dummy text of the <br />
                                    printing and typesetting industry. Lorem <br />
                                    Ipsum has been the industry's standard <br />
                                    dummy text ever since the 1500s
                                </p>
                                <div>
                                    <button className='button2'>Start Registry</button>
                                    {/*<button className='button1 ms-2'>Find Registry</button>*/}
                                </div>
                            </div>
                        </div>
                        <div>
                            <img src={img1} className="sliderimg" alt="" />
                        </div>
                    </div>
                </Container>
            </SwiperSlide>
        </Swiper>
    )
}

export default Slider
