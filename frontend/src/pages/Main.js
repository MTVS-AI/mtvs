import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import { Footer } from '../components/Footer';
import axiosInstance from '../axiosInstance';

const Btn = styled.button`
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
    border-top-right-radius: 5px;
    border-bottom-left-radius: 5px;
    background-color: #C4C4C4;
    border-style: none;
    width: 100px;
    height: 40px;    
`;
const Box = styled.div`
    cursor: pointer;
`;

function Main() {
    const history = useNavigate();
    const [carouselItems, setCarouselItems] = useState([]);
    const [logIn, setLogIn] = useState(false);
    const [nickname, setNickname] = useState("");
    const [userAuth, setUserAuth] = useState(null);

    useEffect(() => {
        const logInUser = JSON.parse(localStorage.getItem("login"));
        if (logInUser && logInUser.nickname) {
            setLogIn(true);
            setNickname(logInUser.nickname);
            setUserAuth(logInUser.auth);
        }
    }, []);


    const handleInquiryClick =() => {
        history('/inquiry');
    }

    return (
        <>
            <Header />
            <Container>
                <Row style={{ marginTop: '5vh' }}>
                    <Col style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <h1>MTVS</h1>
                        <div style={{ fontSize: '1vw' }}>
                            <div>MTVS 최고</div>
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '10px',

                        }}>
                            
                            <Btn onClick={handleInquiryClick} style={{
                                
                                backgroundColor: '#D9D9D9'
                            }}>문의하기</Btn>
                        </div>
                    </Col>
                    <Col>
                        <img
                            src="./gpt_logo.png"
                            style={{
                                width: '250px',
                                marginLeft: '10vw'
                            }}
                        />
                    </Col>
                </Row>                
            </Container>
            <Footer />
        </>
    )
}

export default Main;