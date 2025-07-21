import React, { useContext, useState } from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] =useState("home");

  const {getTotalCartAmount,token,setToken,setCartItems} = useContext(StoreContext);

  const navigate = useNavigate();
  const handleMenuClick = (e, sectionId) => {
    e.preventDefault(); // Prevent default anchor behavior
  
    // Navigate to home page first
    navigate("/", { replace: true });
  
    // Use a small delay to ensure the home page loads before scrolling
    setTimeout(() => {
      window.location.hash = sectionId; // Set hash manually
    }, 100);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    // to send the user to the home page will use useNavigate hook
    navigate("/");
  }
  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
          <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
            <Link to="/" onClick={(e) => handleMenuClick(e, "explore-menu")} className={menu === "menu" ? "active" : ""}>Menu</Link>

            <Link to="/" onClick={(e) => handleMenuClick(e, "app-download")} className={menu === "mobile-app" ? "active" : ""}>Mobile-app</Link>
            <Link to="/" onClick={(e) => handleMenuClick(e, "footer")} className={menu === "contact us" ? "active" : ""}>Contact us</Link>

          </ul>
          <div className='navbar-right'>
            {/* <img src={assets.search_icon} alt="" /> */}
            <div className="navbar-search-icon">
              <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
              <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>:
            <div className='navbar-profile'>
                <img src={assets.profile_icon} alt='' />
                <ul className="nav-profile-dropdown">
                    <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                </ul>

            </div>}
            
          </div>
        
    </div>
  )
}

export default Navbar