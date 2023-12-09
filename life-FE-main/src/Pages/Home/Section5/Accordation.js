import React from 'react'
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';
import { IoIosArrowDown } from 'react-icons/io';
import style from '../../../assets/css/accordation.module.css'




function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <div
            onClick={decoratedOnClick}
        >
            {children}
        </div>
    );
}

function Accordation() {
    return (
        <Accordion defaultActiveKey="0" className={`${style.c_accordation}`}>
            <Card className={`${style.c_Card}`}>
                <Card.Header className={`${style.cardHeader}`}>
                    <CustomToggle eventKey="0">
                        <div className={`${style.acc_Head}`}>
                            <p className='mb-0 para1'>Lorem Ipsum is simply dummy text?</p>
                            <div className={`${style.arrowdiv}`}>
                                <IoIosArrowDown className={`${style.IoIosArrowDown}`} />
                            </div>
                        </div>
                    </CustomToggle>

                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <div className='p-3'>
                        <p className='para1 mb-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic neque, repellendus vero repudiandae, aspernatur reprehenderit enim, facere expedita nisi molestias facilis corporis nulla labore quaerat earum corrupti! Fugiat, maiores modi. Ipsam similique delectus molestias natus. Facilis veritatis odit minus ab quaerat maxime iusto rem, pariatur ipsam quia aspernatur assumenda modi.
                        </p>
                    </div>
                </Accordion.Collapse>
            </Card>
            <Card className={`${style.c_Card}`}>
                <Card.Header className={`${style.cardHeader}`}>
                    <CustomToggle eventKey="1">
                        <div className={`${style.acc_Head}`}>
                            <p className='mb-0 para1'>Lorem Ipsum is simply dummy text?</p>
                            <div className={`${style.arrowdiv}`}>
                                <IoIosArrowDown className={`${style.IoIosArrowDown}`} />
                            </div>
                        </div>
                    </CustomToggle>

                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <div className='p-3'>
                        <p className='para1 mb-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic neque, repellendus vero repudiandae, aspernatur reprehenderit enim, facere expedita nisi molestias facilis corporis nulla labore quaerat earum corrupti! Fugiat, maiores modi. Ipsam similique delectus molestias natus. Facilis veritatis odit minus ab quaerat maxime iusto rem, pariatur ipsam quia aspernatur assumenda modi.
                        </p>
                    </div>
                </Accordion.Collapse>
            </Card>
            <Card className={`${style.c_Card}`}>
                <Card.Header className={`${style.cardHeader}`}>
                    <CustomToggle eventKey="2">
                        <div className={`${style.acc_Head}`}>
                            <p className='mb-0 para1'>Lorem Ipsum is simply dummy text?</p>
                            <div className={`${style.arrowdiv}`}>
                                <IoIosArrowDown className={`${style.IoIosArrowDown}`} />
                            </div>
                        </div>
                    </CustomToggle>

                </Card.Header>
                <Accordion.Collapse eventKey="2">
                    <div className='p-3'>
                        <p className='para1 mb-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic neque, repellendus vero repudiandae, aspernatur reprehenderit enim, facere expedita nisi molestias facilis corporis nulla labore quaerat earum corrupti! Fugiat, maiores modi. Ipsam similique delectus molestias natus. Facilis veritatis odit minus ab quaerat maxime iusto rem, pariatur ipsam quia aspernatur assumenda modi.
                        </p>
                    </div>
                </Accordion.Collapse>
            </Card>
            <Card className={`${style.c_Card}`}>
                <Card.Header className={`${style.cardHeader}`}>
                    <CustomToggle eventKey="3">
                        <div className={`${style.acc_Head}`}>
                            <p className='mb-0 para1'>Lorem Ipsum is simply dummy text?</p>
                            <div className={`${style.arrowdiv}`}>
                                <IoIosArrowDown className={`${style.IoIosArrowDown}`} />
                            </div>
                        </div>
                    </CustomToggle>

                </Card.Header>
                <Accordion.Collapse eventKey="3">
                    <div className='p-3'>
                        <p className='para1 mb-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic neque, repellendus vero repudiandae, aspernatur reprehenderit enim, facere expedita nisi molestias facilis corporis nulla labore quaerat earum corrupti! Fugiat, maiores modi. Ipsam similique delectus molestias natus. Facilis veritatis odit minus ab quaerat maxime iusto rem, pariatur ipsam quia aspernatur assumenda modi.
                        </p>
                    </div>
                </Accordion.Collapse>
            </Card>
            <Card className={`${style.c_Card}`}>
                <Card.Header className={`${style.cardHeader}`}>
                    <CustomToggle eventKey="4">
                        <div className={`${style.acc_Head}`}>
                            <p className='mb-0 para1'>Lorem Ipsum is simply dummy text?</p>
                            <div className={`${style.arrowdiv}`}>
                                <IoIosArrowDown className={`${style.IoIosArrowDown}`} />
                            </div>
                        </div>
                    </CustomToggle>

                </Card.Header>
                <Accordion.Collapse eventKey="4">
                    <div className='p-3'>
                        <p className='para1 mb-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic neque, repellendus vero repudiandae, aspernatur reprehenderit enim, facere expedita nisi molestias facilis corporis nulla labore quaerat earum corrupti! Fugiat, maiores modi. Ipsam similique delectus molestias natus. Facilis veritatis odit minus ab quaerat maxime iusto rem, pariatur ipsam quia aspernatur assumenda modi.
                        </p>
                    </div>
                </Accordion.Collapse>
            </Card>
            <Card className={`${style.c_Card}`}>
                <Card.Header className={`${style.cardHeader}`}>
                    <CustomToggle eventKey="5">
                        <div className={`${style.acc_Head}`}>
                            <p className='mb-0 para1'>Lorem Ipsum is simply dummy text?</p>
                            <div className={`${style.arrowdiv}`}>
                                <IoIosArrowDown className={`${style.IoIosArrowDown}`} />
                            </div>
                        </div>
                    </CustomToggle>

                </Card.Header>
                <Accordion.Collapse eventKey="5">
                    <div className='p-3'>
                        <p className='para1 mb-0'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic neque, repellendus vero repudiandae, aspernatur reprehenderit enim, facere expedita nisi molestias facilis corporis nulla labore quaerat earum corrupti! Fugiat, maiores modi. Ipsam similique delectus molestias natus. Facilis veritatis odit minus ab quaerat maxime iusto rem, pariatur ipsam quia aspernatur assumenda modi.
                        </p>
                    </div>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

export default Accordation