import React, {useState} from "react";
import { useNavigate } from "react-router-dom"

const Main = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])

    let userInfo;

    search()

    function search() {
        fetch('http://localhost:4000/search?' + new URLSearchParams({keyword: '', userId:''})
        , {credentials: 'include'})
        .then((response) => response.json())
        .then(data => {
            let newPosts = Array(data.result[0])
            setPosts(newPosts[0])
        })
    }

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
                태그 들어갈 자리<button onClick={()=> search()}>클릭</button>
            </div>
            <div> 
                {posts.length > 0 ? 
                    posts.map((el, index) => {
                        return (
                            <div className="post" key={el.postId}>
                                <img src={"http://localhost:4000/" + el.imagePath} alt=''/>
                                <div>
                                    {el.ingredients}
                                </div>
                                <div>
                                    <span>{el.title}</span><span>{el.nickname}</span><span>{el.created_at}</span>
                                </div>
                                <div>
                                    {el.recipe}
                                </div>
                            </div>
                        )
                    }) 
                    : ''}
            </div>
        </div>
    )
}

export default Main;