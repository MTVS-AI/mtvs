import React, { useState, useEffect,useMemo } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import axios from 'axios';
import './Header.css'
import Chatbot from './Chatbot';

const Nav = styled.nav`
    background-color: #343a40;
    color: white;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
`;

const NavbarBrand = styled(Link)`
    color: white;
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    align-items: left;
    text-decoration: none;

    img {
        height: 40px;
        margin-right: 10px;
    }
`;

const TogglerButton = styled.button`
    text-transform: uppercase;
    font-weight: bold;
    color: white !important;
    background: none !important;
    border: none;
`;
const NavbarList = styled.ul`
    align-items: ${props => props.$isToggled ? 'flex-end' : 'left'};
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    margin-left: auto; 
    margin-right: auto;

    li {
        margin: 0 10px;
        text-align: left;
    }

    a {
        color: white;
        padding: 0.5rem 1rem;
        text-decoration: none;

        &:hover {
            background-color: #495057;
            border-radius: 5px;
        }
    }

    @media (min-width: 992px) {
        flex-direction: row;
    }
`;


function Header({ handleShowModal }) { // handleShowModal을 프로퍼티로 받음
    const [isToggled, setIsToggled] = useState(false);
    
    const handleToggle = () => {
        setIsToggled(!isToggled);
    };

    const handleCloseOnEsc = (e) => {
        if (e.key === 'Escape') {
            setIsToggled(false);
        }
    };

    useEffect(() => {
        const handleCloseOnOutsideClick = (e) => {
            if (isToggled && !document.querySelector('.navbar').contains(e.target)) {
                setIsToggled(false);
            }
        };
    
        if (isToggled) {
            window.addEventListener('click', handleCloseOnOutsideClick);
        } else {
            window.removeEventListener('click', handleCloseOnOutsideClick);
        }
    
        return () => {
            window.removeEventListener('click', handleCloseOnOutsideClick);
        };
    }, [isToggled]);

    return (
        <>
        <Nav className="navbar navbar-expand-lg text-uppercase">
            <div className="container">
                <NavbarBrand to="/">
                    <img src="/MTVS_logo_white.png" alt="mtvs" className="navbar-logo" />
                    <i className="fas fa-bars">MTVS</i>
                </NavbarBrand>
                <TogglerButton
                    className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive"
                    onClick={handleToggle}
                >
                    <i className="fas fa-bars">Menu</i>
                </TogglerButton>
                <div className={`collapse navbar-collapse ${isToggled ? 'show' : ''}`} id="navbarResponsive">
                    <NavbarList $isToggled={isToggled} className="navbar-nav">
                        <li className="nav-item mx-0 mx-lg-1">
                            <Link to="/Main" className="nav-link py-3 px-0 px-lg-3 rounded">
                                <i className="fas fa-bars">CLEANER</i>
                            </Link>
                        </li>
                        <li className="nav-item mx-0 mx-lg-1">
                            <Link to="#" className="nav-link py-3 px-0 px-lg-3 rounded" onClick={handleShowModal}>
                                <i className="fas fa-bars">INQUIRY</i>
                            </Link>
                        </li>
                    </NavbarList>
                </div>
            </div>
        </Nav>
        </>
    );
};

export default Header;