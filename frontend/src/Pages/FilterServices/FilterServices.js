import React from "react";
import LoginHeader from "../../Components/Header/LoginHeader";
import img from "../../assets/images/p_cradimg.png";
import { Col, Row } from "react-bootstrap";
import filterIcon from "../../assets/images/icons/filter.svg";
import serachIcon from "../../assets/images/icons/search.svg";

function FilterServices() {
  return (
    <div className="img_overlay">
      <LoginHeader />
      <div className="profile_container mt-4">
        <div className="p_layout">
          <div className="pl_child1">
            <div className="p_card1 pt-4 spcard px-3">
              <div className="position-relative d-inline">
                <input
                  type="text"
                  className="input_search w-100"
                  placeholder="Search services, vendor..."
                />
                <img src={serachIcon} className="serachIcon" alt="" />
              </div>
              <div className="mt-5 phn-none">
                <h4 className="text-start text_grey">List of Services</h4>
                <label className="s_container ">
                  Service title
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <label className="s_container">
                  Service title Name
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <label className="s_container">
                  Service title
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <label className="s_container">
                  Service item title
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="mt-5">
                <h4 className="text-start text_grey">Categories</h4>
                <label className="s_container ">
                  Categories title
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <label className="s_container">
                  Categories title Name
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <label className="s_container">
                  Categories title
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <label className="s_container">
                  Categories item title
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="mt-5">
                <h4 className="text-start text_grey">Sub categories</h4>
                <label className="s_container ">
                  Sub categories title
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <label className="s_container">
                  Sub categories title Name
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <label className="s_container">
                  Sub categories title
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
                <label className="s_container">
                  Sub categories item title
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="mt-4">
                <button className="button2">Reset filter</button>
              </div>
            </div>
            <div className="p_card2 py-3 mt-4">
              <h3 className="para1 username text-white">Adoption Registry</h3>
            </div>
          </div>
          <div className="pl_child2">
            <div className="r_select_area">
              <div className="r_select_area_child1">
                <div className="desktop-none-950">
                  <div className="filter_main">
                    <img src={filterIcon} alt="" />
                    <span className="para1 ms-2">
                      <b>Filter</b>
                    </span>
                  </div>
                </div>
                <p className="para1 rsa_text">232 results near you</p>
              </div>
              <div className="r_select_area_inner">
                <select name="" id="" className="input_field select">
                  <option value="">Status: Online Now</option>
                  <option value="">Status: Online Now</option>
                </select>
              </div>
            </div>
            <div className="py-4">
              {/* card start */}
              <div className="p_card mt-4 r_pcard">
                <div className="p_card_child1 pc_child">
                  <img src={img} className="p_c_img" alt="" />
                  <div className="price_continer phn-price_continer">
                    <h3 className="price_info">$50</h3>
                    <p className="price_text">estimaded cost</p>
                  </div>
                </div>
                <div className="p_card_child2 pc_child">
                  <div>
                    <h4 className="pc_title">Service title Name</h4>
                    <p className="star_text">
                      5.0 <span className="p_para1">(34 ratings)</span>
                    </p>
                    <Row>
                      <Col xl="6">
                        <div>
                          <p className="p_para1 p_op1">
                            Offers remote services
                          </p>
                          <p className="p_para1 p_op2">Los Angeles, CA</p>
                        </div>
                      </Col>
                      <Col xl="6">
                        <div>
                          <p className="p_para1 p_op3">Online now</p>
                          <p className="p_para1 p_op4">Responds in about 1hr</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="p_card_child3 pc_child r_pcard_child3">
                  <p>
                    Username says, "Lorem Ipsum is simply dummy text of the
                    printing and types etting industry"{" "}
                    <a href="/" className="text_gold">
                      See More
                    </a>
                  </p>
                </div>
                <div className="p_card_child4 pc_child">
                  <div className="pc_btn_container">
                    <div className="price_continer desk-price_continer">
                      <h3 className="price_info">$50</h3>
                      <p className="price_text">estimaded cost</p>
                    </div>
                    <button className="button2 w-100">view profile</button>
                  </div>
                </div>
              </div>
              {/* card end */}
              {/* card start */}
              <div className="p_card mt-4 r_pcard">
                <div className="p_card_child1 pc_child">
                  <img src={img} className="p_c_img" alt="" />
                  <div className="price_continer phn-price_continer">
                    <h3 className="price_info">$50</h3>
                    <p className="price_text">estimaded cost</p>
                  </div>
                </div>
                <div className="p_card_child2 pc_child">
                  <div>
                    <h4 className="pc_title">Service title Name</h4>
                    <p className="star_text">
                      5.0 <span className="p_para1">(34 ratings)</span>
                    </p>
                    <Row>
                      <Col xl="6">
                        <div>
                          <p className="p_para1 p_op1">
                            Offers remote services
                          </p>
                          <p className="p_para1 p_op2">Los Angeles, CA</p>
                        </div>
                      </Col>
                      <Col xl="6">
                        <div>
                          <p className="p_para1 p_op3">Online now</p>
                          <p className="p_para1 p_op4">Responds in about 1hr</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="p_card_child3 pc_child r_pcard_child3">
                  <p>
                    Username says, "Lorem Ipsum is simply dummy text of the
                    printing and types etting industry"{" "}
                    <a href="/" className="text_gold">
                      See More
                    </a>
                  </p>
                </div>
                <div className="p_card_child4 pc_child">
                  <div className="pc_btn_container">
                    <div className="price_continer desk-price_continer">
                      <h3 className="price_info">$50</h3>
                      <p className="price_text">estimaded cost</p>
                    </div>
                    <button className="button2 w-100">view profile</button>
                  </div>
                </div>
              </div>
              {/* card end */}
              {/* card start */}
              <div className="p_card mt-4 r_pcard">
                <div className="p_card_child1 pc_child">
                  <img src={img} className="p_c_img" alt="" />
                  <div className="price_continer phn-price_continer">
                    <h3 className="price_info">$50</h3>
                    <p className="price_text">estimaded cost</p>
                  </div>
                </div>
                <div className="p_card_child2 pc_child">
                  <div>
                    <h4 className="pc_title">Service title Name</h4>
                    <p className="star_text">
                      5.0 <span className="p_para1">(34 ratings)</span>
                    </p>
                    <Row>
                      <Col xl="6">
                        <div>
                          <p className="p_para1 p_op1">
                            Offers remote services
                          </p>
                          <p className="p_para1 p_op2">Los Angeles, CA</p>
                        </div>
                      </Col>
                      <Col xl="6">
                        <div>
                          <p className="p_para1 p_op3">Online now</p>
                          <p className="p_para1 p_op4">Responds in about 1hr</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="p_card_child3 pc_child r_pcard_child3">
                  <p>
                    Username says, "Lorem Ipsum is simply dummy text of the
                    printing and types etting industry"{" "}
                    <a href="/" className="text_gold">
                      See More
                    </a>
                  </p>
                </div>
                <div className="p_card_child4 pc_child">
                  <div className="pc_btn_container">
                    <div className="price_continer desk-price_continer">
                      <h3 className="price_info">$50</h3>
                      <p className="price_text">estimaded cost</p>
                    </div>
                    <button className="button2 w-100">view profile</button>
                  </div>
                </div>
              </div>
              {/* card end */}
              {/* card start */}
              <div className="p_card mt-4 r_pcard">
                <div className="p_card_child1 pc_child">
                  <img src={img} className="p_c_img" alt="" />
                  <div className="price_continer phn-price_continer">
                    <h3 className="price_info">$50</h3>
                    <p className="price_text">estimaded cost</p>
                  </div>
                </div>
                <div className="p_card_child2 pc_child">
                  <div>
                    <h4 className="pc_title">Service title Name</h4>
                    <p className="star_text">
                      5.0 <span className="p_para1">(34 ratings)</span>
                    </p>
                    <Row>
                      <Col xl="6">
                        <div>
                          <p className="p_para1 p_op1">
                            Offers remote services
                          </p>
                          <p className="p_para1 p_op2">Los Angeles, CA</p>
                        </div>
                      </Col>
                      <Col xl="6">
                        <div>
                          <p className="p_para1 p_op3">Online now</p>
                          <p className="p_para1 p_op4">Responds in about 1hr</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="p_card_child3 pc_child r_pcard_child3">
                  <p>
                    Username says, "Lorem Ipsum is simply dummy text of the
                    printing and types etting industry"{" "}
                    <a href="/" className="text_gold">
                      See More
                    </a>
                  </p>
                </div>
                <div className="p_card_child4 pc_child">
                  <div className="pc_btn_container">
                    <div className="price_continer desk-price_continer">
                      <h3 className="price_info">$50</h3>
                      <p className="price_text">estimaded cost</p>
                    </div>
                    <button className="button2 w-100">view profile</button>
                  </div>
                </div>
              </div>
              {/* card end */}
              {/* card start */}
              <div className="p_card mt-4 r_pcard">
                <div className="p_card_child1 pc_child">
                  <img src={img} className="p_c_img" alt="" />
                  <div className="price_continer phn-price_continer">
                    <h3 className="price_info">$50</h3>
                    <p className="price_text">estimaded cost</p>
                  </div>
                </div>
                <div className="p_card_child2 pc_child">
                  <div>
                    <h4 className="pc_title">Service title Name</h4>
                    <p className="star_text">
                      5.0 <span className="p_para1">(34 ratings)</span>
                    </p>
                    <Row>
                      <Col xl="6">
                        <div>
                          <p className="p_para1 p_op1">
                            Offers remote services
                          </p>
                          <p className="p_para1 p_op2">Los Angeles, CA</p>
                        </div>
                      </Col>
                      <Col xl="6">
                        <div>
                          <p className="p_para1 p_op3">Online now</p>
                          <p className="p_para1 p_op4">Responds in about 1hr</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="p_card_child3 pc_child r_pcard_child3">
                  <p>
                    Username says, "Lorem Ipsum is simply dummy text of the
                    printing and types etting industry"{" "}
                    <a href="/" className="text_gold">
                      See More
                    </a>
                  </p>
                </div>
                <div className="p_card_child4 pc_child">
                  <div className="pc_btn_container">
                    <div className="price_continer desk-price_continer">
                      <h3 className="price_info">$50</h3>
                      <p className="price_text">estimaded cost</p>
                    </div>
                    <button className="button2 w-100">view profile</button>
                  </div>
                </div>
              </div>
              {/* card end */}
              <div className="mt-4 text-center">
                <button className="button1">see more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterServices;
