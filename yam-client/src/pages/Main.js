import React from "react";
import { useNavigate } from "react-router-dom"

const Main = (props) => {

    const navigate = useNavigate();
    let userInfo;

    function logout() {
        fetch('http://localhost:4000/logout', {
            method: "POST",
            headers: {
                "content-type":"application/json"
            }
        })
        window.sessionStorage.clear()
        navigate('/')
    }

    if(window.sessionStorage.getItem("userInfo") !== null) {
        userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    } 
    return (
        <div>
            <h2>메인페이지</h2>
            {
            userInfo !== undefined
            ?   <div>
                    <div>
                        <div>{userInfo['nickname']}님이 로그인했습니다.</div>
                    </div>
                    <div>
                        <button type="button" onClick={() => logout()}>로그아웃</button>
                        <button type="button">사용자 정보</button>
                    </div>
                </div>
            : 
                <div>
                    <button type="button" onClick={() => window.location.href='/login'}>로그인</button>
                    <button type="button" onClick={() => window.location.href='/join'}>회원 가입</button>
                </div>
            }
        </div>
    )
}

export default Main;