import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';
export const Footer = (props) => {
    return (
        <footer className="footer">
            <div className="footer-left col-md-4 col-sm-6">
                <p> METAVERSE</p>
                <p className="about">
                <span> Banner Cleaner</span>
                </p>
                <div className="icons">
                <Link to="#"><img src='facebook.png' className="icon-size"/></Link>
                <Link to="#"><img src='newgram.png' className="icon-size"/></Link>
                <Link to="#"><img src='twitter.png' className="icon-size"/></Link>
                </div>
            </div>
            <div className="footer-center col-md-4 col-sm-6">
                <div>
                <i className="fa fa-map-marker"></i>
                
                </div>
                <div>
                <i className="fa fa-phone"></i>
            </div>
                
            </div>
            <div className="footer-right col-md-4 col-sm-6">
                <h2> MTVS<span> <img src='./MTVS_logo_white.png' alt='logo' style={{width:'100px',height:'100px'}}></img></span></h2>
                <p className="menu">
                <Link> develop by </Link>&nbsp; | &nbsp;
                <Link> 나인채</Link>&nbsp; | &nbsp;
                <Link> 임정민</Link>&nbsp; | &nbsp;
                <Link> 김종민</Link>&nbsp; | &nbsp;
                <Link> 차민수</Link>&nbsp;
                </p>
                <p className="name"> MTVS &copy; 2023</p>
            </div>
        </footer>      
    )
};