import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
import './css/Post.css';

const Write = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [recipe, setRecipe] = useState('')
    const [image, setImage] = useState(null)
    const [tags, setTags] = useState('')

    function write() {
        const data = new FormData()
        data.append('file', image)
        data.append('title', title)
        data.append('recipe', recipe)
        data.append('tags', tags)
        fetch('http://localhost:4000/write', {
            method: "POST"
            , body: data
            , credentials: 'include'
        })
        .then(() => {
            navigate('/')
        })
    }

    return (
        <div>
            <h3>레시피 등록</h3>
            <div>
                <label>제목</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>이미지</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}/>
            </div>
            <div>
                <textarea value={recipe} onChange={(e) => setRecipe(e.target.value)}/>
            </div>
            <div>
                <label>재료 태그</label>
                <input type="text" placeholder="쉼표로 구분합니다." value={tags} onChange={(e)=> setTags(e.target.value.trim())}/>
            </div>
            <div>
                <button type="button" onClick={() => write()}>등록</button>
                <button type="button">취소</button>
            </div> 
        </div>
    )
}

export default Write;