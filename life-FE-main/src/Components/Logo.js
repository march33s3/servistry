import React from 'react'
import logo from '../assets/images/logo.svg'

function Logo() {
    return (
        <div className='logo_container'>
            <img src={logo} className="logo_size" alt="" />
            <h1 className='logo_text'>Logo</h1>
        </div>
    )
}

export default Logo