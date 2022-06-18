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

const Join = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

    function join() {
        fetch('http://localhost:4000/join', {
            method: "POST"
            , headers: {
                "content-type":"application/json"
            }
            , body: JSON.stringify({
                email: email
                , password: password
                , nickname: nickname
            })
            , credentials: 'include'
        }).then(function(res){
            if(res.status === 200) {
                alert("가입되었습니다.")
                navigate('/')
            }
        })
    }

    return (
        <div>
            <h2>회원 가입</h2>
            <div>
                <StyledFormLabel name="이메일"/>
                <StyledInput type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>    
            </div> 
            <div>
                <StyledFormLabel name="비밀번호"/>
                <StyledInput type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div>
                <StyledFormLabel name="닉네임"/>
                <StyledInput type="text" name="nickname" onChange={(e) => setNickname(e.target.value)} value={nickname}/>
            </div>
            <StyledButtonDiv>
                <StyledButton type="button" onClick={() => join()}>가입</StyledButton>
                <StyledButton type="button" onClick={() => window.location.href='/'}>메인으로</StyledButton>
            </StyledButtonDiv>
        </div>
    )
}

export default Join;