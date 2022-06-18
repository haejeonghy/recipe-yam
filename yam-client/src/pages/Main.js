import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom"
import { format } from "date-fns"
import styled from 'styled-components'

const StyledIconImg = styled.img`
        width:50px;
        height:50px;
        padding:10px;
    `
    const StyledFoodImg = styled.img`
        width: 600px;
    `

    const StyledIconDiv = styled.div`

    `

    const StyledTagDiv = styled.div`
        margin-top:30px;
        margin-bottom:30px;
        float:center;
    `

    const StyledPostDiv = styled.div`
        margin-bottom: 30px;
        border: 1px solid #dbdbdb;
        border-radius: 5px;
        padding:20px
    `

const Main = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const [keyword, setKeyword] = useState('')

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
            <div>
                {
                userInfo !== undefined
                ?   
                    <div>
                        <span onClick={()=> search('', userInfo['id'])}>{userInfo['nickname']}님이 로그인했습니다.</span>
                        <StyledIconDiv>
                            <StyledIconImg src={'/write.png'} alt="write" type="button" onClick={() => window.location.href='/write'}/>
                            <StyledIconImg src={'/logout.png'} alt="logout" type="button" onClick={() => logout()}/>
                            <StyledIconImg src={'/setting.png'} alt="setting"type="button" onClick={() => window.location.href='/modify'}/>
                        </StyledIconDiv>
                    </div>
                :   
                    <StyledIconDiv>
                        <StyledIconImg src={'/login.png'} alt="login" type="button" onClick={() => window.location.href='/login'} className='.login-button'/>
                        <StyledIconImg src={'/add-user.png'} alt="join" type="button" onClick={() => window.location.href='/join'}/>
                    </StyledIconDiv>
                }
            </div>
            <StyledTagDiv>
                {tags.map((el) => {
                        if(keyword !== '' && el.id === keyword) {
                            return (
                                <span key={el.id} onClick={(e) => {
                                    setKeyword(el.id)
                                    search(el.id,'')
                                }}> {el.ingredient} </span>
                            )
                        }
                        return (
                            <span key={el.id} onClick={(e) => {
                                setKeyword(el.id)
                                search(el.id,'')
                            }}> {el.ingredient} </span>

                            )
                    })}
            </StyledTagDiv>
            <div> 
                {posts.length > 0 ?  
                    posts.map((el, index) => {
                        let ingredients = el.ingredients.split(',')
                        const date = new Date(el.createdAt)
                        el.createdAt = format(date, 'yyyy-MM-dd')
                        return (
                            <StyledPostDiv className="post" key={el.postId} 
                                onClick={() => {
                                    if(userInfo !== undefined && userInfo.id === el.userId) {
                                        navigate(`/update/${el.postId}`)
                                    }
                            }}>
                                <StyledFoodImg src={"http://localhost:4000/" + el.imagePath} alt=''/>
                                <div>
                                    <span>{el.title}</span><span>{el.nickname}</span><span> {el.createdAt}</span>
                                </div>
                                <div>
                                    <img src={'/price-tag.png'} alt=""/>
                                    {
                                        ingredients.map((el, index) => {
                                            let map = el.split('--')
                                            let name = map[0]
                                            let id = map[1]
                                            return (
                                                <span key={index} onClick={() => {
                                                    search({id},'')
                                                    setKeyword(id)
                                                }}>{name}</span>
                                            )
                                        })
                                    }
                                </div>
                                <div>
                                    {el.recipe}
                                </div>
                            </StyledPostDiv>
                        )
                    }) 
                    : ''}
            </div>
        </div>
    )
}

export default Main;