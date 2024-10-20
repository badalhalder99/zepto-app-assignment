import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FaBars } from "react-icons/fa6";
import styles from './Navbar.module.css';

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(!open);

  return (
    <header className={`${styles.headerWrap}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.row}`}>
          <div className={`${styles.logoWrap}`}>
            <NavLink to="/" className={`${styles.logo}`}>ZEPTO</NavLink>
          </div>
          <nav className={`${styles.desktopNav}`}>
            <ul className={`${styles.navList}`}>
              <li><NavLink to="/" className={`${styles.navLink}`}>Home</NavLink></li>
              <li><NavLink to="/wishlist" className={`${styles.navLink} ${styles.navLinkWrap}`}><FaHeart  className={`${styles.navIcon}`}/> Wishlist</NavLink></li>
              <li><NavLink to="/" className={`${styles.navLink}`}> Cart</NavLink></li>
              <li><NavLink to="/" className={`${styles.navLink}`}> About us</NavLink></li>
              <li><NavLink to="/" className={`${styles.navLink}`}> Contact us</NavLink></li>
            </ul>
          </nav>
          <div className={`${styles.mobileIconWrap}`}>
            <button onClick={handleOpen} className={`${styles.humbergerBtn}`}>
              <FaBars className={`${styles.barIcon}`}/>
            </button>
          </div>
        </div>
        {open && (
          <nav className={`${styles.mobileNav}`} style={{ display: open ? 'block' : 'none' }}>
            <ul className={`${styles.navListMobile}`}>
              <li><NavLink to="/" className={`${styles.navLink}`}>Home</NavLink></li>
              <li><NavLink to="/wishlist" className={`${styles.navLink}`}> Wishlist</NavLink></li>
              <li><NavLink to="/" className={`${styles.navLink}`}> Cart</NavLink></li>
              <li><NavLink to="/" className={`${styles.navLink}`}> About us</NavLink></li>
              <li><NavLink to="/" className={`${styles.navLink}`}> Contact us</NavLink></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
