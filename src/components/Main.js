import React from "react";
import Collection from "./Collection";

function Main() {
    // const [catFact, setCatFact] = React.useState("")
    // const [catPic, setCatPic] = React.useState("")
    // const [catCaption, setCatCaption] = React.useState("")
    const API_BASE = 'http://localhost:8080/api/cards';

    const initialState = {
        catCardId: null,
        catFact: '',
        imgUrl: '',
        caption: ''
    }
    const [catCardData, setCatCardData] = React.useState(initialState)

    const [catCards, setCatCards] = React.useState([]);

    React.useEffect( () => {
     fetch(API_BASE) 
         .then(result => result.json())
         .then(data => setCatCards(data))
    }, [catCards])

    React.useEffect( () => {
        getNewCard()
    }, [])

    function getNewCard() {

        fetch(API_BASE + "/random")
            .then(result => result.json())
            .then(data => setCatCardData(prevCatCardData => ({...data, caption: ''})))
            
    }

    const handleCaption = (event) => {
        setCatCardData(prevCatCardData => ({
            ...prevCatCardData,
            caption: event.target.value
        }))
    }

    const handleSave = (e) => {
        e.preventDefault();

        if( catCardData.catCardId !== null ) {
            // update
            fetch(API_BASE + '/' + catCardData.catCardId, {
                method: 'PUT',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(catCardData)
            })
                .then((response) => {
                    if( response.ok ) {
                        alert('Saved!');
                        getNewCard();
                
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert('Could not save card!');
                });
        } else {
            // save
            fetch(API_BASE, {
                method: 'POST',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(catCardData)
            })
                .then((response) => {
                    if( response.ok ) {
                        alert('Saved!');
                        getNewCard();
                    }
                })
                .catch((err) => {
                    console.error(err);
                    alert('Could not save card!');
                });
        }
    }

    const handleEdit = (event) => {
        event.preventDefault();
        

        fetch(API_BASE + '/' + event.target.id)
        .then(result => result.json())
        .then(data => setCatCardData(data))

    }

    const handleDelete = (e) => {
        e.preventDefault();

        fetch(API_BASE + '/' + e.target.id, {
            method: 'DELETE',
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(data);
                alert('Cat Card deleted!');
                
            })
            .catch((err) => {
                console.error(err);
                alert('Could not delete Cat Card!');
            });
    }

    return(
        <main>
            <div className="main--container">
                <h3 className="main--catFact">{catCardData.catFact}</h3>
                <img src={catCardData.imgUrl} className="main--catPic" alt="random cat"/>
            </div>
            <input type='text' name='catCaption' value={catCardData.caption} placeholder="Caption me!" className="main--caption"
                onChange={handleCaption}/>
            <div>
                <button onClick={handleSave}>💾 Save to Collection</button>
                <button onClick={getNewCard}>Get Next Card ⇒</button>
            </div>
            <Collection catCards={catCards} handleDelete={handleDelete} handleEdit={handleEdit}/>
        </main>

    )
}

export default Main;