import React from 'react'
import Header from '../../Components/Header/Header'
import '../../assets/css/style.css'
import Footer from '../../Components/Footer/Footer'
import Slider from './Section1/Slider'
import {FaFacebookF, FaInstagram, FaTwitter} from 'react-icons/fa';
import chatIcon from '../../assets/images/chatIcon.png'
import Slider2 from './Section1/Slider2'
import {Container} from 'react-bootstrap'
import s2img from '../../assets/images/h_s2img.png'
import TestimonialSlider from './Section3/TestimonialSlider'

import simg1 from '../../assets/images/sevice/simg1.png'
import simg2 from '../../assets/images/sevice/simg2.png'
import simg3 from '../../assets/images/sevice/simg3.png'
import simg4 from '../../assets/images/sevice/simg4.png'
import simg5 from '../../assets/images/sevice/simg5.png'
import simg6 from '../../assets/images/sevice/simg6.png'
import simg7 from '../../assets/images/sevice/simg7.png'
import simg8 from '../../assets/images/sevice/simg8.png'

import Accordation from './Section5/Accordation'
import icon1 from '../../assets/images/icons/birth.png'
import icon2 from '../../assets/images/icons/sickness.png'
import {Link} from 'react-router-dom'
import LoginHeader from "../../Components/Header/LoginHeader";
import {useSelector} from "react-redux";

function Home() {
    const userDetailState = useSelector(state => state.userDetail.userDetail);
    return (
        <>
            {/* section1 */}
            <div className='h_section1'>
                {
                    userDetailState ? <LoginHeader/> : <Header/>
                }

                <div className='position relative'>
                    <Slider/>
                    <div className='h_social_main'>
                        <div><a href="/"><FaTwitter/></a></div>
                        <div><a href="/"><FaFacebookF/></a></div>
                        <div><a href="/"><FaInstagram/></a></div>
                    </div>
                    <div className='chatIconDiv'>
                        <img src={chatIcon} className="chatIcon" alt=""/>
                    </div>
                </div>
            </div>
            <Container>
                <div className='h_s1_carrosal_main'>
                    <Slider2/>
                </div>
            </Container>
            {/* section1 */}

            {/* section2 */}
            <div className='pt_100'>
                <Container>
                    <h1 className='titlep1 text-center'>
                        How it
                        <span className='titlep2'> Works</span>
                    </h1>
                    <div className='h_section2_grid'>
                        <img src={s2img} className="s2img" alt=""/>
                    </div>
                </Container>
            </div>
            {/* section2 */}

            {/* section3 */}
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
            {/* section3 */}

            {/* section4 */}
            <div className='pb_100'>
                <Container>
                    <h1 className='titlep1 text-center'>
                        Service
                        <span className='titlep2'> Categories</span>
                    </h1>
                    <div className='mt-5 service_main'>
                        <div className='h_service_card'>
                            <img src={simg1} className="service_img" alt="woman-spending-time-with-her-baby-girl"/>
                            <div className='overlay'></div>
                            <p className='service_img_cap'>Birth</p>
                        </div>
                        <div className='h_service_card'>
                            <img src={simg2} className="service_img" alt="woman-spending-time-with-her-baby-girl"/>
                            <div className='overlay'></div>
                            <p className='service_img_cap'>Adoption</p>
                        </div>
                        <div className='h_service_card'>
                            <img src={simg3} className="service_img" alt="woman-spending-time-with-her-baby-girl"/>
                            <div className='overlay'></div>
                            <p className='service_img_cap'>Moving</p>
                        </div>
                        <div className='h_service_card'>
                            <img src={simg4} className="service_img" alt="woman-spending-time-with-her-baby-girl"/>
                            <div className='overlay'></div>
                            <p className='service_img_cap'>Loss of income</p>
                        </div>
                        <div className='h_service_card'>
                            <img src={simg5} className="service_img" alt="woman-spending-time-with-her-baby-girl"/>
                            <div className='overlay'></div>
                            <p className='service_img_cap'>Institutionalization</p>
                        </div>
                        <div className='h_service_card'>
                            <img src={simg6} className="service_img" alt="woman-spending-time-with-her-baby-girl"/>
                            <div className='overlay'></div>
                            <p className='service_img_cap'>Divorce</p>
                        </div>
                        <div className='h_service_card'>
                            <img src={simg7} className="service_img" alt="woman-spending-time-with-her-baby-girl"/>
                            <div className='overlay'></div>
                            <p className='service_img_cap'>Sickness</p>
                        </div>
                        <div className='h_service_card'>
                            <img src={simg8} className="service_img" alt="woman-spending-time-with-her-baby-girl"/>
                            <div className='overlay'></div>
                            <p className='service_img_cap'>Death</p>
                        </div>
                    </div>
                </Container>
            </div>
            {/* section4 */}

            {/* section5 */}
            <div className='pb_100'>
                <Container>
                    <h1 className='titlep1 text-center'>
                        Frequent
                        <span className='titlep2'> Questions</span>
                    </h1>

                    <div className='mt-5'>
                        <Accordation/>
                    </div>
                </Container>
            </div>
            {/* section5 */}

            {/* section6 */}
            <div className='h_footer'>
                <Container>
                    <div className='footer_banner_main'>
                        <h1 className='titlep1 text-center text_gold'>
                            Help when you most need! <br/>
                            <span className='titlep2 text_gold'> Don’t wait, get started now</span>
                        </h1>
                        <div className='text-center mt-3'>
                            <Link to="/registration">
                                <button className='button2'>Start Registry</button>
                            </Link>
                            {/*<Link to="/registry">*/}
                            {/*    <button className='button1 footer_bnner_s_btn'>Find Registry</button>*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                </Container>
                <Footer/>
            </div>
            {/* section6 */}
        </>
    )
}

export default Home
