import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';
export const Footer = (props) => {
    return (
        <footer class="footer">
            <div class="footer-left col-md-4 col-sm-6">
                <p class="about">
                <span> MTVS</span> MTVS 최고
                </p>
                <div class="icons">
                <Link><img src='facebook-f.svg' style={{width:'30px', height:'30px'}}/></Link>
                <Link><img src='instagram.svg' style={{width:'30px', height:'30px'}}/></Link>
                <Link><img src='twitter.svg' style={{width:'30px', height:'30px'}}/></Link>
                </div>
            </div>
            <div class="footer-center col-md-4 col-sm-6">
                <div>
                <i class="fa fa-map-marker"></i>
                <p> MultiCapmus, Final 7 Team</p>
                </div>
                <div>
                <i class="fa fa-phone"></i>
                
                </div>
                <div>
                <i class="fa fa-envelope"></i>
                <p><Link> dlsco1230@gmail.com</Link></p>
                </div>
            </div>
            <div class="footer-right col-md-4 col-sm-6">
                <h2> MTVS<span> <img src='./gpt_logo.png' alt='logo' style={{width:'100px',height:'100px'}}></img></span></h2>
                <p class="menu">
                <Link> develop by </Link>&nbsp; | &nbsp;
                <Link> 나인채</Link>&nbsp; | &nbsp;
                <Link> 임정민</Link>&nbsp; | &nbsp;
                <Link> 김종민</Link>&nbsp; | &nbsp;
                <Link> 차민수</Link>&nbsp; | &nbsp;
                </p>
                <p class="name"> Gympt-5 &copy; 2023</p>
            </div>
        </footer>      
    )
};