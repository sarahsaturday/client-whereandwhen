// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getGameById, updateGame } from "../../managers/GameManager.js";

// export const UpdateGameForm = () => {
//     const { gameId } = useParams();
//     const navigate = useNavigate();

//     const [currentGame, setCurrentGame] = useState({
//         title: "",
//         type: "",
//         gamer: "",
//     });

//     useEffect(() => {
//         getGameById(gameId)
//             .then(game => {
//                 setCurrentGame(game);
//             })
//             .catch(error => {
//                 console.error("Error fetching game:", error);
//             });
//     }, [gameId]);

//     const changeGameState = (domGame) => {
//         const { name, value } = domGame.target;
//         setCurrentGame(prevGame => ({
//             ...prevGame,
//             [name]: value
//         }));
//     }

//     const handleSubmit = (evt) => {
//         evt.preventDefault();

//         const updatedGame = {
//             title: currentGame.title,
//             type: currentGame.type,
//             gamer: parseInt(currentGame.gamer),
//         };

//         // Send PUT request to update game
//         updateGame(gameId, updatedGame)
//             .then(() => {
//                 navigate(`/games/${gameId}`); // Redirect to game's detail page
//             })
//             .catch(error => {
//                 console.error("Error updating game:", error);
//             });
//     }

//     return (
//         <form className="gameForm">
//             <h2 className="gameForm__title">Update Game</h2>
//             <fieldset>
//                 <div className="game-group">
//                     <label htmlFor="title">Title: </label>
//                     <input
//                         type="text"
//                         name="title"
//                         required
//                         autoFocus
//                         className="game-control"
//                         value={currentGame.title}
//                         onChange={changeGameState}
//                     />
//                 </div>
//             </fieldset>
    
//             <fieldset>
//                 <div className="game-group">
//                     <label htmlFor="type">Type: </label>
//                     <input
//                         type="text"
//                         name="type"
//                         required
//                         className="game-control"
//                         value={currentGame.type}
//                         onChange={changeGameState}
//                     />
//                 </div>
//             </fieldset>
    
//             <fieldset>
//                 <div className="game-group">
//                     <label htmlFor="gamer">Edited by: </label>
//                     <input
//                         type="text"
//                         name="gamer"
//                         required
//                         className="game-control"
//                         value={currentGame.gamer}
//                         onChange={changeGameState}
//                     />
//                 </div>
//             </fieldset>
    
//             <button type="submit" onClick={handleSubmit} className="btn btn-primary">Update</button>
//         </form>
//     );

// };