import React from 'react'
import LoginHeader from '../../Components/Header/LoginHeader';
import c_img from '../../assets/images/client_img.png'
import chat_img from '../../assets/images/chat_msg_img.png'
import upload_icon from '../../assets/images/icons/upload_icon.svg'
import imogi from '../../assets/images/icons/imogi.svg'
import sendicon from '../../assets/images/icons/send.svg'
import LeftCard from './LeftCard/LeftCard';

function Chat() {
    return (
        <>
            <div className='img_overlay'>
                <LoginHeader />
                <div className='profile_container mt-4'>
                    <div className='p_layout chat_p_layout'>
                        <div className='pl_child1 chat_pl_child1'>
                            <div className='mb-5'>
                                <LeftCard
                                    buttonText="Service"
                                    imgSrc={c_img}
                                    c_title="Adoption Services"
                                    c_desc="18/04/2022 - 12:13 AM"
                                />
                                <LeftCard
                                    buttonText="Client"
                                    imgSrc={c_img}
                                    c_title="User name"
                                    c_desc="PAID"
                                />
                            </div>
                        </div>
                        <div className='pl_child2 chat_pl_child2'>
                            <div className='chat_main mb-3'>
                                <div className='msg_screen'>
                                    <p className='chat_date'>18/04/2022 - 2:13 pm</p>
                                    <div className='person_main'>
                                        <img src={c_img} className="chat_img" alt="" />
                                        <div className='p_msg'>
                                            <p>Hi nice to meet you!</p>
                                        </div>
                                    </div>
                                    <div className='person_main'>
                                        <div className='p_msg' style={{ background: '#E8EBF1' }}>
                                            <p style={{ color: '#000' }}>Hi!</p>
                                        </div>
                                        <img src={c_img} className="chat_img" alt="" />
                                    </div>
                                    <div className='person_main'>
                                        <img src={c_img} className="chat_img" alt="" />
                                        <div className='p_msg'>
                                            <p>Lorem Ipsum is simply dummy text of and typesetting industry. Lorem IpsumLorem Ipsum is simply dummy text of and typesetting industry. Lorem Ipsum</p>
                                        </div>
                                    </div>

                                    <p className='chat_date mt-5'>18/04/2022 - 2:13 pm</p>
                                    <div className='person_main'>
                                        <div className='p_msg' style={{ background: '#E8EBF1' }}>
                                            <img src={chat_img} className="chat_msg_img" alt="" />
                                        </div>
                                        <img src={c_img} className="chat_img" alt="" />
                                    </div>
                                </div>

                                <div className='send_msg'>
                                    <div className='sm_1'>
                                        <img src={upload_icon} className="w_25" alt="" />
                                    </div>
                                    <div className='sm_2'>
                                        <input
                                            type="text"
                                            className='w-100 h-100 chat_input'
                                            style={{ border: '0px solid', borderRadius: '25px', padding: '0px 20px' }}
                                            placeholder="Write a message..."
                                        />
                                        <img src={imogi} className="w_25 imogi_icon" alt="" />
                                    </div>
                                    <div className='sm_3'>
                                        <img src={sendicon} className="w_25" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat