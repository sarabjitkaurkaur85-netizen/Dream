
import React from 'react'
import "../css/Navbar.css";
import { useState } from 'react';
import { NavLink } from "react-router-dom";

function Header() {
    
  const [cartCount, setCartCount] = useState(0);
     const [open,setOpen] = useState(false);
    
  return (
    <div>
      <header>
        <div className="navbar">
          <div className="logo">THE BEACH <span>HOTEL</span></div>

          <ul className="nav-links">
            <li><NavLink  to="/" onClick={() => setOpen(false)}>Home</NavLink></li>
            <li><NavLink  to="room" onClick={() => setOpen(false)}>Rooms</NavLink></li>
            <li><a href="#">Offers</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Stories</a></li>
            <li><a href="#" className="book-cta">Book Now</a></li>

            <li className="cart-icon" onClick={() =>
              alert(`🛒 Your cart has ${cartCount} item(s).`)
            }>
              🛒
              <span className="cart-count">{cartCount}</span>
            </li>
          </ul>
        </div>
      </header>

    </div>
  )
}

export default Header
