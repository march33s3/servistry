import React from 'react'

function LeftCard(props) {
    const {buttonText, imgSrc, c_title, c_desc} = props;
    return (
        <>
            <div className='p_card1 px-3 text-start'>
                <button className='button1'>{buttonText}</button>
                <div className='d-flex align-items-center mt-3'>
                    <img src={imgSrc} className="client_img" alt="" />
                    <div className='ms-3'>
                        <h4 className='c_title'>{c_title}</h4>
                        <p className='c_para'>{c_desc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LeftCard