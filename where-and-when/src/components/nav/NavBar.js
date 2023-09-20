import { Link, useNavigate } from "react-router-dom";
import "../../Generic.css";

export const NavBar = () => {
    const navigate = useNavigate();

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("lu_token") !== null;

    const handleLoginRegister = () => {
        // Navigate to the login page
        navigate("/login");
    };

    const handleLogout = () => {
        // Remove the token from local storage and navigate to the login page
        localStorage.removeItem("lu_token");
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/">
                    <img src="/images/AFSlogo.png" alt="Logo" className="logo-image" />
                </Link>
            </div>
            <h2>Where & When: Meetings in Middle TN</h2>

            <div>
                {isLoggedIn ? (
                    <>
                    <button className="navbar-button" onClick={() => navigate("/manage/add")}>
                        Add Meeting
                    </button>
                    <button className="navbar-button" onClick={handleLogout}>
                        Logout
                    </button>
                </>
                ) : (
                    <button className="navbar-button" onClick={handleLoginRegister}>
                        Login/Register
                    </button>
                )}
            </div>
        </nav>
    );
};
