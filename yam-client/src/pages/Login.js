import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
import './css/User.css';

const Login = (props) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function login() {
        
        fetch('http://localhost:4000/login', {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
            ,credentials: 'include'
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
                <label>이메일</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>    
            </div> 
            <div>
                <label>비밀번호</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div>
                <button type="button">구글 계정으로 로그인하기</button>
            </div>
            <div>
                <button type="button" onClick={() => login()}>로그인</button>
                <button type="button" onClick={() => window.location.href='/join'}>회원 가입</button>
                <button type="button" onClick={() => window.location.href='/'}>취소</button>
            </div>
        </div>
    )
}

export default Login;