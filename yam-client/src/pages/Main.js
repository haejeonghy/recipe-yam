import React, {useState} from "react";
import { useNavigate } from "react-router-dom"

const Main = () => {

    const [posts, setPosts] = useState(null)

    const navigate = useNavigate();
    let userInfo;

    function logout() {
        fetch('http://localhost:4000/logout', {
            method: "POST"
            , headers: {
                "content-type":"application/json"
            }
            , credentials: 'include'
        })
        window.sessionStorage.clear()
        navigate('/')
    }

    if(posts === null) {
        getPostInfo()
    }

    function getPostInfo() {
        fetch('http://localhost:4000/search?' + new URLSearchParams({keyword: '', userId:''})
        , {credentials: 'include'})
        .then((response) => response.json())
        .then(data => {
            console.log(data.result[0])
        })
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
            <div>
                태그 들어갈 자리
            </div>
            <div className="post">
                <img src='' alt=''/>
                <div>
                    tags
                </div>
                <div>
                    <span>제목</span><span>작성자 닉네임</span><span>작성 일자</span>
                </div>
                <div>
                    레시피
                </div>
            </div>
        </div>
    )
}

export default Main;