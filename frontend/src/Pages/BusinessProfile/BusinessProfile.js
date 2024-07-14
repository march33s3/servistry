import React from 'react'
import profileImg from '../../assets/images/profileImg2x.png'
import plusIcon from '../../assets/images/icons/plusIcon.svg'
import edit_blue from '../../assets/images/icons/edit_blue_small.svg'
import LoginHeader from '../../Components/Header/LoginHeader';
import ServiceCard from './ServiceCard/ServiceCard';
import filterIcon from '../../assets/images/icons/filter.svg'
import ClientCard from './ClientCard/ClientCard';


function BusinessProfile() {
    return (
        <>
            <div className='img_overlay'>
                <LoginHeader />
                <div className='profile_container mt-4'>
                    <div className='p_layout'>
                        <div className='pl_child1'>
                            <div className='p_card1 px-3'>
                                <div className='position-relative d-inline'>
                                    <img src={profileImg} className="p_profileImg" alt="" />
                                    <img src={plusIcon} className="plusIcon" alt="" />
                                </div>

                                <h3 className='para1 username'>Hi, Name!</h3>

                                <div className='horizontal_line_blue'></div>

                                <div className='text-start mt-4'>
                                    <p className='b_name_title'>Contact name</p>
                                    <p className='b_name'>Username <img src={edit_blue} className="cursor_pointer" alt="" /></p>
                                </div>
                                <div className='text-start mt-4'>
                                    <p className='b_name_title'>Contact email</p>
                                    <p className='b_name'>email@email.com <img src={edit_blue} className="cursor_pointer" alt="" /></p>
                                </div>
                                <div className='text-start mt-4'>
                                    <p className='b_name_title'>Password</p>
                                    <p className='b_name'>****** <img src={edit_blue} className="cursor_pointer" alt="" /></p>
                                </div>
                            </div>
                        </div>
                        <div className='pl_child2'>
                            <div className='select_area'>
                                <h1 className='title_one'>Services</h1>
                                <button className='button2'>add service</button>
                            </div>
                            <div className='py-4'>
                                {/* card start */}
                                <ServiceCard />
                                <ServiceCard />
                                {/* card end */}
                            </div>

                            <div className='r_select_area  mt-4'>
                                <div className='r_select_area_child1'>
                                    <h1 className='title_one'>Clients</h1>
                                    <div className='desktop-none-950'>
                                        <div className='filter_main'>
                                            <img src={filterIcon} alt="" />
                                            <span className='para1 ms-2'><b>Filter</b></span>
                                        </div>
                                    </div>
                                </div>
                                <div className='r_select_area_inner'>
                                    <p className='m-0'>Filter:</p>
                                    <select name="" id="" className='input_field select ms-2'>
                                        <option value="">by date: All</option>
                                        <option value="">by date: All</option>
                                        <option value="">by date: All</option>
                                        <option value="">by date: All</option>
                                    </select>
                                    <select name="" id="" className='input_field select ms-2'>
                                        <option value="">by Status: All</option>
                                        <option value="">by Status: All</option>
                                        <option value="">by Status: All</option>
                                        <option value="">by Status: All</option>
                                    </select>
                                    <select name="" id="" className='input_field select ms-2'>
                                        <option value="">by Service: All</option>
                                        <option value="">by Service: All</option>
                                        <option value="">by Service: All</option>
                                        <option value="">by Service: All</option>
                                    </select>

                                </div>
                            </div>

                            <div className='py-4'>
                                {/* card start */}
                                <ClientCard bgColor="#FEB100" btnText="In List" />
                                <ClientCard bgColor="#5079FF" btnText="Paid" />
                                <ClientCard bgColor="#FF7A50" btnText="Scheduled" />
                                <ClientCard bgColor="#40B157" btnText="Complete" />
                                {/* card end */}
                            </div>

                            <div className='my-4 text-center'>
                                <button className='button1'>see more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusinessProfile