import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import { Footer } from '../components/Footer';
import Chatbot from '../components/Chatbot';
import axiosInstance from '../axiosInstance';
import axios from 'axios';

const MainContainer = styled.div`
    background-color: #22741C;
    min-height: 110vh;
    color: white;
`;

function Main() {
    const history = useNavigate();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);


    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new FormData();
    
        files.forEach(file => {
            formData.append('files[]', file);
        });
        console.log('Files:', files); // handleFileChange 함수에 이 코드를 추가

        try {
            const response = await axios.post('http://localhost:5000/myhome/map', formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);

            // 추가된 부분 시작
            if (response.data.mapHtml) {
                document.getElementById("map-container").innerHTML = response.data.mapHtml;
                alert('Map loaded successfully.');
                setUploadComplete(true);
            } else {
                alert('No map data received from server.');
            }
            // 추가된 부분 끝
        } catch (error) {
            console.log('Error:', error.response.data); // catch 블록에 이 코드를 추가
            alert('An error occurred.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Header />
            {uploadComplete && (
            <div>
                {/* 이 부분에 업로드 완료 시 표시할 내용을 넣습니다. */}
                <p>Upload Complete! Here is your popup...</p>
                <div id="map-container" />
            </div>
            )}
            
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
                                name="files[]"
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