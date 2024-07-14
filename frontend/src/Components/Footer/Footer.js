import React from 'react'
import { Container } from 'react-bootstrap'
import Logo from '../Logo'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  return (
    <div className='footer'>
      <Container>
        <div className='footer_grid'>
          <div className='fg_child1'>
            <Logo />
            <p className='mt-4'>
              Lorem Ipsum is simply <br />
              dummy text of the printing <br />
              and typesetting industry. <br />
              Lorem Ipsum has.
            </p>
          </div>
          <div className='fg_child'>
            <h4 className='f_title'>Company</h4>
            <ul className='list-unstyled mt-4'>
              <li><a href="/">Services</a></li>
              <li><a href="/">How it Works</a></li>
              <li><a href="/">Faq</a></li>
              {/*<li><a href="/">Contact Us</a></li>*/}
            </ul>
          </div>
          <div className='fg_child'>
            <h4 className='f_title'>Privacy</h4>
            <ul className='list-unstyled mt-4'>
              <li><a href="/">Terms &#38; Conditions</a></li>
              <li><a href="/">Privacy Policy</a></li>
              <li><a href="/">Terms of Service</a></li>
              <li><a href="/">Support</a></li>
            </ul>
          </div>
          <div className='fg_child4'>
            <h4 className='f_title'>Follow Us</h4>
            <div className='f_social_main'>
              <div> <a href="/"><FaFacebookF /></a></div>
              <div> <a href="/"><FaInstagram /></a></div>
              <div> <a href="/"><FaTwitter /></a></div>
              <div> <a href="/"><FaLinkedinIn /></a></div>
            </div>
          </div>
        </div>
          <p className='text-center mb-3 mt-5'>Life &copy; 2022</p>
      </Container>
    </div>
  )
}

export default Footer
