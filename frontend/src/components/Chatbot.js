import React, { useState, useRef, useEffect, useCallback} from 'react';
import axios from 'axios';
import './Custom.css'
import Header from './Header';

const buttonStyle = {
    position: 'fixed',
    bottom: '35px',
    right: '50px',
    zIndex: '9999',
    fontSize: '24px',
    cursor: 'pointer',
    width: '60px',
    height: '60px',
    border: 'transparent',
    backgroundColor: 'transparent', // 또는 background: 'none'
};



const Chatbot = () => {
    const [showModal, setShowModal] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const chatboxRef = useRef(null);
    const userInputRef = useRef(null);

    const handleHideModal = () => {
        setShowModal(false);
    };


    const sendMessage = useCallback(async () => {
        const chatbox = chatboxRef.current;
        chatbox.innerHTML += `<div class="chat-message user-message">User: ${userMessage}</div>`;
        
        try {
            const response = await axios.post('http://localhost:5000/myhome/chatbot', { chat: userMessage });
            chatbox.innerHTML += `<div class="chat-message bot-message">Chatbot: ${response.data}</div>`;
        } catch (error) {
            chatbox.innerHTML += '<div>Error: 서버 응답 없음</div>';
        }

        setUserMessage('');
        chatbox.scrollTop = chatbox.scrollHeight;
    }, [userMessage]); 

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.which === 13) {
                e.preventDefault();
                sendMessage();
            }
        };
    
        const currentInputRef = userInputRef.current;
    
        if (currentInputRef) {
            currentInputRef.addEventListener('keypress', handleKeyPress);
    
            return () => {
                if (currentInputRef) {
                    currentInputRef.removeEventListener('keypress', handleKeyPress);
                }
            };
        }
    }, [sendMessage]);  // 의존성 배열에 sendMessage 추가

    return (
        <>            
        <Header handleShowModal={() => setShowModal(true)} />
            <button className="chatbot-button" 
                    style={buttonStyle}
                    onClick={() => setShowModal(true)}> {/* 부모로부터 받아온 setShowModal 사용 */}
                <img src="chatbot.png" alt="chatbot" style={{width: '200%', height: 'auto'}} />
            </button>
            <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'}`} 
                    id="chatbotModal" 
                    tabIndex="-1" 
                    aria-labelledby="chatbotModalLabel" 
                    aria-hidden={!showModal}>
                <div className="modal-dialog modal-dialog-centered"> 
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="chatbotModalLabel">MTVS's CHATBOT</h5>
                            <button type="button" 
                                    className="btn-close" 
                                    data-bs-dismiss="modal" 
                                    aria-label="Close" 
                                    onClick={handleHideModal}>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div id="chatbox" ref={chatboxRef} className="chatbox"></div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="userInput"
                                    className="user-input"
                                    placeholder="메시지를 입력하세요..."
                                    value={userMessage}
                                    onChange={(e) => setUserMessage(e.target.value)}
                                    ref={userInputRef}
                                />
                                <button onClick={sendMessage} className="btn-primary">
                                    <i className="fas fa-paper-plane">전송</i> 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbot;
