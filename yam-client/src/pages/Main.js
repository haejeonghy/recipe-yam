import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"

const Main = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])

    let userInfo;

    function search(keyword, userId) {
        if(typeof keyword === 'object'){
            keyword = keyword.id
        }
        fetch('http://localhost:4000/search?' + new URLSearchParams({keyword: keyword, userId:userId})
        , {credentials: 'include'})
        .then((response) => response.json())
        .then(data => {
            let newPosts = Array(data.result[0])
            setPosts(newPosts[0])
        })
    }

    function getTags() {
        fetch('http://localhost:4000/tags', {credentials: 'include'})
        .then((response) => response.json())
        .then(data => {
            setTags(data.result)
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


    useEffect(() => {
        search('','')
        getTags()
    }, [])

    return (
        <div>
            <h2>메인페이지</h2>
            {
            userInfo !== undefined
            ?   <div>
                    <div>
                        <span onClick={()=> search('', userInfo['id'])}>{userInfo['nickname']}님이 로그인했습니다.</span>
                    </div>
                    <div>
                        <button type="button" onClick={() => logout()}>로그아웃</button>
                        <button type="button" onClick={() => window.location.href='/modify'}>사용자 정보</button>
                    </div>
                </div>
            : 
                <div>
                    <button type="button" onClick={() => window.location.href='/login'}>로그인</button>
                    <button type="button" onClick={() => window.location.href='/join'}>회원 가입</button>
                </div>
            }
            <div>
                {tags.map((el) => {
                        return (
                            <span key={el.id} onClick={(e) => search(el.id,'')}> {el.ingredient} </span>
                            )
                    })}
            </div>
            <div> 
                {posts.length > 0 ? 
                    posts.map((el, index) => {
                        let ingredients = el.ingredients.split(',')
                        return (
                            <div className="post" key={el.postId}>
                                <img src={"http://localhost:4000/" + el.imagePath} alt=''/>
                                <div>
                                    {
                                        ingredients.map((el, index) => {
                                            let map = el.split('--')
                                            let name = map[0]
                                            let id = map[1]
                                            return (
                                                <span key={index} onClick={() => {search({id},'')}} >{name}</span>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    <span>{el.title}</span><span>{el.nickname}</span><span> {el.createdAt}</span>
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