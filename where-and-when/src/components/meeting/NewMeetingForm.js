// import { useState, useEffect } from "react"
// import { useNavigate } from 'react-router-dom'
// import { createGame, getGames } from '../../managers/GameManager.js'


// export const GameForm = () => {
//     const navigate = useNavigate()
//     const [games, setGames] = useState([])

//     /*
//         Since the input fields are bound to the values of
//         the properties of this state variable, you need to
//         provide some default values.
//     */
//     const [currentGame, setCurrentGame] = useState({
//         title: "",
//         type: 0
//     });

//     useEffect(() => {
//         getGames()
//             .then((games) => setGames(games))
//             .catch((error) => {
//                 // Handle error
//             });
//     }, []);


//     const changeGameState = (event) => {
//         const { name, value } = event.target;
//         setCurrentGame((prevGame) => ({
//             ...prevGame,
//             [name]: value
//         }));
//     };


//     return (
//         <form className="gameForm">
//             <h2 className="gameForm__title">Register New Game</h2>
//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="title">Title: </label>
//                     <input type="text" name="title" required autoFocus className="form-control"
//                         value={currentGame.title}
//                         onChange={changeGameState}
//                     />
//                 </div>
//             </fieldset>

//             {/* <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="gamer">Player: </label>
//                     <input type="text" name="gamer" required autoFocus className="form-control"
//                         value={currentGame.gamer}
//                         onChange={changeGameState}
//                     />
//                 </div>
//             </fieldset> */}

//             <fieldset>
//                 <div className="form-group">
//                     <label htmlFor="type">Type: </label>
//                     <input type="text" name="type" required autoFocus className="form-control"
//                         value={currentGame.type}
//                         onChange={changeGameState}
//                     />
//                 </div>
//             </fieldset>


//             <button
//                 type="submit"
//                 onClick={evt => {
//                     evt.preventDefault();

//                     const game = {
//                         game_type: currentGame.type,
//                         title: currentGame.title,
//                     };

//                     createGame(game)
//                         .then(() => navigate("/games"))
//                         .catch((error) => {
//                             // Handle error
//                         });
//                 }}
//                 className="btn btn-primary"
//             >
//                 Create
//             </button>
//         </form>
//     )
// }