import React from "react";
import { useNavigate } from "react-router-dom"

function FullCart (){
const navigate = useNavigate();
    return (
        <div>
            <h1>Your Cart</h1>
            <h3></h3>
            <button onClick={()=> navigate('/')}>Back to Book List</button> 
        </div>
    )
}

export default FullCart;