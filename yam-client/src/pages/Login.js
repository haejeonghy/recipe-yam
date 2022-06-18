import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
import './css/User.css';
import styled from 'styled-components'
import StyledFormLabel from './common/StyleFormLabel'

const StyledInput = styled.input`
    height: 30px;
    margin-top: 10px;
    width: 200px;
`
const StyledButtonDiv = styled.div`
    display:flex;
    justify-content: center;
    align-item:center;
    margin-top: 25px;
`

const StyledButton = styled.button`
font-size: 20px;
    margin: 10px;
    padding-right: 10px;
    padding-left: 10px;
`

const StyledLabelDiv = styled.div`
    margin-left: 40px;
`

const Login = (props) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function login() {
        
        fetch('http://localhost:4000/login', {
            method: "POST"
            , headers: {
                "content-type":"application/json"
            }
            , body: JSON.stringify({
                email: email
                , password: password
            })
            , credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            window.sessionStorage.setItem("userInfo", JSON.stringify(data.userInfo))
            navigate('/')
        })
    }
    
    return (
        <div>
            <h2>로그인</h2>
            <div>
                <StyledLabelDiv>
                    <StyledFormLabel name="이메일"/>
                    <StyledInput type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>    
                </StyledLabelDiv> 
                <StyledLabelDiv>
                    <StyledFormLabel name="비밀번호"/>
                    <StyledInput type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                </StyledLabelDiv>
            </div>
            <StyledButtonDiv>
                <StyledButton type="button" onClick={() => login()}>로그인</StyledButton>
                <StyledButton type="button" onClick={() => window.location.href='/join'}>회원 가입</StyledButton>
                <StyledButton type="button" onClick={() => window.location.href='/'}>메인으로</StyledButton>
            </StyledButtonDiv>
        </div>
    )
}

export default Login;