import React from "react";
import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 onClick={() => navigate('/')}>Recipe, Yam!</h1> 
        </div>
    )
}

export default Header;