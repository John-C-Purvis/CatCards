import React from "react";
import CatCard from "./CatCard";

function Collection(props) {



   const showCards = props.catCards.map( (card) =>{
    return(
        <CatCard 
            key={card.catCardId} 
            catCardId={card.catCardId}
            catFact={card.catFact}
            imgUrl={card.imgUrl}
            caption={card.caption}
            handleEdit={props.handleEdit}
            handleDelete={props.handleDelete}
        />
    )}
)

    return(
        <div className="collection">
            <h2 className="collection--title">Your Collection</h2>
            <div className="collection--cards">{showCards}</div>
        </div>
    )
}

export default Collection;