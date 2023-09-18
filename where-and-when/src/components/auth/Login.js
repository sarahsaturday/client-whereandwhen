import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../../managers/AuthManager"
import "../../Generic.css"

export const Login = () => {
    const email = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            email: email.current.value,
            password: password.current.value
        }
        loginUser(user)
            .then(res => {
                console.log(res);
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("lu_token", res.token)
                    navigate("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <div>
            <main>
                <dialog className="form-dialog" ref={invalidDialog}>
                    <div>Username or password was not valid.</div>
                    <button
                        className="navbar-button"
                        onClick={(e) => invalidDialog.current.close()}
                    >
                        Close
                    </button>
                </dialog>
                <section>
                    <form className="form-container" onSubmit={handleLogin}>
                        <h1 className="form-title">Where & When</h1>
                        <h2 className="form-subtitle">Please sign in:</h2>
                        <fieldset className="form-input">
                            <label htmlFor="inputEmail" className="form-label">
                                Email Address
                            </label>
                            <input
                                ref={email}
                                type="email"
                                id="email"
                                className="form-input"
                                placeholder="Email Address"
                                required
                                autoFocus
                            />
                        </fieldset>
                        <fieldset className="form-input">
                            <label htmlFor="inputPassword" className="form-label">
                                Password
                            </label>
                            <input
                                ref={password}
                                type="password"
                                id="password"
                                className="form-input"
                                placeholder="Password"
                                required
                            />
                        </fieldset>
                        <fieldset className="form-input">
                            <button className="form-button" type="submit">
                                Sign In
                            </button>
                        </fieldset>
                    </form>
                </section>
                <section className="form-link-container">
                    <Link to="/register" className="form-link">
                        Not a member yet? Register here!
                    </Link>
                </section>

            </main>
        </div>
    );
}