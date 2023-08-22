import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import Chatbot from '../components/Chatbot';
import axiosInstance from '../axiosInstance';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const MainContainer = styled.div`
    background-color: #22741C;
    min-height: 110vh;
    color: white;
`;

function Main() {
    const history = useNavigate();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData();
    
        files.forEach(file => {
            formData.append('images[]', file);
        });

    try {
        const response = await axios.post('/myhome/upload', formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        alert(response.data.message);
        } catch (error) {
        alert('An error occurred.');
        }finally {
            setLoading(false); 
        }        
    };



    return (
        <>
            <Header />
            <Helmet>
                <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" />
            </Helmet>
            
            <MainContainer className="d-flex flex-column align-items-center justify-content-center">
                <div className="container d-flex align-items-center flex-column">
                <div style={{ height: '80px' }}></div>
                    <img 
                        className="masthead-avatar mb-1" 
                        src="/MTVS_logo_white.png" 
                        alt="..." 
                        style={{ width: '400px', height: '400px' }} 
                    />
                    {/* <img className="masthead-avatar mb-1" src="/MTVS_logo_white.png" alt="..." /> */}
                    <h1 className="masthead-heading text-uppercase mb-0">Banner Cleaner</h1>
                    <p className="masthead-subheading font-weight-light mb-0">Developed by JM, MS, JM, IC</p>
                    <div className="text-center mt-4">
                        <form id="csvUploadForm" onSubmit={handleUpload}>
                            <input
                                type="file"
                                id="csvFile"
                                name="images[]"
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                            <label htmlFor="csvFile" className="btn btn-xl btn-outline-light mt-3">
                                <i className="fas fa-upload me-2">
                                Choose Files <span id="fileName">{files.map(file => file.name).join(', ') || 'No files chosen'}</span>
                                </i>
                            </label>
                            <button type="submit" className="btn btn-xl btn-outline-light mt-3">
                                Upload
                            </button>
                        </form>
                        {loading && <div id="loading"><i className="fa fa-spinner fa-spin"> 처리 중...</i></div>}
                    </div>
                </div>
                <div style={{ height: '80px' }}></div>
            </MainContainer>
                <Chatbot />
            <Footer />
        </>
    );
}

export default Main;