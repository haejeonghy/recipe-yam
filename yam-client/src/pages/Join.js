import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
import './Join.css';


const Join = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

    function join() {
        fetch('http://localhost:4000/join', {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                nickname: nickname
            })
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
                <label>이메일</label>
                <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/>    
            </div> 
            <div>
                <label>비밀번호</label>
                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
            </div>
            <div>
                <label>닉네임</label>
                <input type="text" name="nickname" onChange={(e) => setNickname(e.target.value)} value={nickname}/>
            </div>
            <div>
                <button type="button">구글 계정으로 가입하기</button>
            </div>
            <div>
                <button type="button" onClick={() => join()}>가입</button>
                <button type="button">취소</button>
            </div>
        </div>
    )
}

export default Join;