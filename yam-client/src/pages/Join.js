import React from "react";
import './Join.css';

const Join = () => {
    return (
        <div>
            <h2>회원 가입</h2>
            <div>
                <label>이메일</label>
                <input type="email"/>    
            </div> 
            <div>
                <label>비밀번호</label>
                <input type="password"/>
            </div>
            <div>
                <label>닉네임</label>
                <input type="text"/>
            </div>
            <div>
                <button type="button">구글 계정으로 로그인하기</button>
            </div>
            <div>
                <button type="button">가입</button>
                <button type="button">취소</button>
            </div>
        </div>
    )
}

export default Join;