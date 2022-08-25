import React from "react";

function CatCard(props) {


    return(
        <div className="cat--card">
            <img src={props.imgUrl} className="card--image" alt="cat"/>
            <p className="card--caption">{props.caption}</p>
            <div className="card--icons">
                <span className="card--span" id={props.catCardId} onClick={props.handleEdit}>✍</span>
                <span className="card--span" id={props.catCardId} onClick={props.handleDelete}>❌</span>
            </div>
        </div>
    )
}

export default CatCard;