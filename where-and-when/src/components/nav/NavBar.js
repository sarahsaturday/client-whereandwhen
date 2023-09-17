import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
    const navigate = useNavigate();

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("lu_token") !== null;

    const handleLogout = () => {
        // Remove the token from local storage and navigate to the login page
        localStorage.removeItem("lu_token");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <Link to="/" className="logo-link">LOGO</Link>
            </div>
            <ul className="navbar__list">
                <li className="navbar__item">
                    {isLoggedIn ? (
                        <button className="navbar__button" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <Link className="navbar__link" to="/login">
                            Login/Register
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};
