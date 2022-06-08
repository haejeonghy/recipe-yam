import React from "react";

const Main = (props) => {

    function logout() {
        fetch('http://localhost:4000/logout', {
            method: "GET",
            headers: {
                "content-type":"application/json"
            }
        })
        .then(window.location.replace('/'))
        props.setIsLoggedIn(false)
        props.setUserInfo(null)
    }

    return (
        <div>
            <h2>메인페이지</h2>
            {
            props.isLoggedIn
            ?   <div>
                    <div>
                        <div>{props.userInfo.nickname}님이 로그인했습니다.</div>
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