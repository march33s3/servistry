import React from 'react'
import { Col, Row } from 'react-bootstrap'
import img from '../../../assets/images/p_cradimg.png'

function ServiceCard() {
    return (
        <>
            <div className='p_card mt-4'>
                <div className='p_card_child1 pc_child'>
                    <img src={img} className="p_c_img" alt="" />
                    <div className='price_continer phn-price_continer'>
                        <h3 className='price_info text_blue'>$50</h3>
                        <p className='price_text'>estimaded cost</p>
                    </div>
                </div>
                <div className='p_card_child2 pc_child'>
                    <div>
                        <h4 className='pc_title'>Registry Service title</h4>
                        <p className='star_text'>5.0 <span className='p_para1'>(34 ratings)</span></p>
                        <Row>
                            <Col xl="6">
                                <div>
                                    <p className='p_para1 p_op1'>Offers remote services</p>
                                    <p className='p_para1 p_op2'>Los Angeles, CA</p>
                                </div>
                            </Col>
                            <Col xl="6">
                                <div>
                                    <p className='p_para1 p_op3'>Online now</p>
                                    <p className='p_para1 p_op4'>Responds in about 1hr</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='p_card_child3 pc_child'>
                    <div className='price_continer desk-price_continer'>
                        <h3 className='price_info text_blue'>$50</h3>
                        <p className='price_text'>estimaded cost</p>
                    </div>
                </div>
                <div className='p_card_child4 pc_child'>
                    <div className='pc_btn_container'>
                        <button className='button2 w-100'>edit service</button>
                        <button className='button1 deleteBtn w-100'>Remove</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServiceCard