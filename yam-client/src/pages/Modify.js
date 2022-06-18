import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import styled from 'styled-components'
import StyledFormLabel from './common/StyleFormLabel'

const Modify = () => {
    const navigate = useNavigate();

    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [nickname, setNickname] = useState(userInfo.nickname)

    const StyledInput = styled.input`
        height: 30px;
        margin-top: 10px;
        width: 200px;
    `
    const StyledButtonDiv = styled.div`
        display:flex;
        justify-content: center;
        align-item:center;
        margin-top: 50px;
    `

    const StyledButton = styled.button`
        font-size: 30px;
        margin: 10px;
        padding-right: 10px;
        padding-left: 10px;
`

    function sendModify() {
        fetch('http://localhost:4000/modify', {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                currentPassword: currentPassword
                , newPassword: newPassword
                , nickname: nickname
            })
            ,credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            window.sessionStorage.setItem("userInfo", JSON.stringify(data.userInfo))
            navigate('/')
        })
        .catch((error) => {
            console.log('error', error)
        })
    }
    
    return (
        <div>
            <h2>개인정보 수정</h2>
            <div>
                <StyledFormLabel name="이메일"/>
                <StyledFormLabel name={userInfo['email']}/>    
            </div> 
            <div>
                <StyledFormLabel name="현재 비밀번호"/>
                <StyledInput type="password" name="password" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword}/>
            </div>
            <div>
                <StyledFormLabel name="새 비밀번호"/>
                <StyledInput type="password" name="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
            </div>
            <div>
                <StyledFormLabel name="닉네임"/>
                <StyledInput type="text" name="nickname" onChange={(e) => setNickname(e.target.value)} value={nickname}/>
            </div>
            <StyledButtonDiv>
                <StyledButton type="button" onClick={() => sendModify()}>수정</StyledButton>
                <StyledButton type="button" onClick={() => window.location.href='/'}>취소</StyledButton>
            </StyledButtonDiv>
        </div>
    )
}

export default Modify;