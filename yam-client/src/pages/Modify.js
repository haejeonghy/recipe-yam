import React, { useState } from "react";
import { useNavigate } from "react-router-dom"

const Modify = () => {
    const navigate = useNavigate();

    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [nickname, setNickname] = useState(userInfo.nickname)


    function sendModify() {
        fetch('http://localhost:4000/modify', {
            method: "POST",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify({
                email: userInfo.email
                , currentPassword: currentPassword
                , newPassword: newPassword
                , nickname: nickname
            })
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
                <label>이메일</label>
                <label>{userInfo['email']}</label>    
            </div> 
            <div>
                <label>현재 비밀번호</label>
                <input type="password" name="password" onChange={(e) => setCurrentPassword(e.target.value)} value={currentPassword}/>
            </div>
            <div>
                <label>새 비밀번호</label>
                <input type="password" name="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword}/>
            </div>
            <div>
                <label>닉네임</label>
                <input type="text" name="nickname" onChange={(e) => setNickname(e.target.value)} value={nickname}/>
            </div>
            <div>
                <button type="button" onClick={() => sendModify()}>수정</button>
                <button type="button" onClick={() => window.location.href='/'}>취소</button>
            </div>
        </div>
    )
}

export default Modify;