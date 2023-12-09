import React from 'react'
import c_img from '../../../assets/images/client_img.png'

function ClientCard(props) {

    const {bgColor, btnText} = props;

    return (
        <div className='c_card mt-4'>
            <div className='d-flex align-items-center'>
                <img src={c_img} className="client_img" alt="" />
                <div className='ms-3'>
                    <h4 className='c_title'>User name</h4>
                    <p className='c_para'>Adoption</p>
                </div>
            </div>

            <p className='text_blue mb-0 mt-3'>18/04/2022 - 12:13 AM</p>

            <p className='text_blue mb-0 mt-3'>$50</p>

            <div className='c_card_child c_card_button mt-3'>
                <button className='button2' style={{ background: bgColor }}>{btnText}</button>
                <button className='button1'>DETAILS</button>
            </div>
        </div>
    )
}

export default ClientCard