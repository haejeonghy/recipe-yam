import React, {useState} from "react";
import { useNavigate, useParams } from "react-router-dom"
import './css/Post.css';

const Update = (props) => {

    const navigate = useNavigate();
    
    const [title, setTitle] = useState('')
    const [recipe, setRecipe] = useState('')
    const [image, setImage] = useState(null)
    const [imagePath, setImagePath] = useState('')
    const [tags, setTags] = useState('')

    let {id} = useParams()

    function getPostInfo() {
        fetch('http://localhost:4000/read?' + new URLSearchParams({id: id}))
        .then((response) => response.json())
        .then(data => {
            const postInfo = data.postInfo
            setTitle(postInfo.title)
            setRecipe(postInfo.recipe)
            setImagePath(postInfo.image_path)
            setTags(data.tags[0][0].tags)
        })
    }
    if(imagePath === '') {
        getPostInfo()
    }

    function update() {
        const data = new FormData()
        data.append('file', image)
        data.append('title', title)
        data.append('recipe', recipe)
        data.append('tags', tags)
        data.append('id', id)
        fetch('http://localhost:4000/update', {
            method: "POST"
            , body: data
            , credentials: 'include'
        })
        .then(() => {
            navigate('/')
        })
    }

    function remove() {
        if(window.confirm("삭제하시겠습니까?")){
            fetch('http://localhost:4000/remove?' + new URLSearchParams({id: id}), {
                credentials: 'include'
            })
            .then(() => {
                navigate('/')
            })
        }
    }

    return (
        <div>
            <h3>레시피 수정</h3> 
            <div>
                <label>제목</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>이미지</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
            </div>
            <div>
                <img src={"http://localhost:4000/" + imagePath} alt=""/>
            </div>
            <div>
                <textarea value={recipe} onChange={(e) => setRecipe(e.target.value)}/>
            </div>
            <div>
                <label>재료 태그</label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="쉼표로 구분합니다."/>
            </div>
            <div>
                <button type="button" onClick={() => update()}>수정</button>
                <button type="button" onClick={() => remove()}>삭제</button>
                <button type="button">취소</button>
            </div> 
        </div>
    )
}

export default Update;