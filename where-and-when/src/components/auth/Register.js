import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser } from "../../managers/AuthManager"
import "../../Generic.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const phone = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const navigate = useNavigate()

    const isStaff = useRef(false);
    const isGroupRep = useRef(false);
    const isIsr = useRef(false);

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "email": email.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "password": password.current.value,
                "phone": phone.current.value,
                "is_staff": isStaff.current.checked,
                "is_group_rep": isGroupRep.current.checked,
                "is_isr": isIsr.current.checked,
            };

            registerUser(newUser)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("lu_token", res.token)
                        navigate("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <div>
            <main>
                <dialog className="form-dialog" ref={passwordDialog}>
                    <div>Passwords do not match</div>
                    <button
                        className="navbar-button"
                        onClick={(e) => passwordDialog.current.close()}
                    >
                        Close
                    </button>
                </dialog>
                <section>
                    <form className="form-container" onSubmit={handleRegister}>
                        <h1 className="form-title">Register</h1>
                        <fieldset className="form-input">
                            <label htmlFor="firstName" className="form-label">
                                First Name
                            </label>
                            <input
                                ref={firstName}
                                type="text"
                                name="firstName"
                                className="form-input"
                                placeholder="First name"
                                required
                                autoFocus
                            />
                        </fieldset>
                        <fieldset className="form-input">
                            <label htmlFor="lastName" className="form-label">
                                Last Initial
                            </label>
                            <input
                                ref={lastName}
                                type="text"
                                name="lastName"
                                className="form-input"
                                placeholder="Last name"
                                required
                            />
                        </fieldset>
                        <fieldset className="form-input">
                            <label htmlFor="inputEmail" className="form-label">
                                Email
                            </label>
                            <input
                                ref={email}
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Email"
                                required
                            />
                        </fieldset>
                        <fieldset className="form-input">
                            <label htmlFor="inputPhone" className="form-label">
                                Phone
                            </label>
                            <input
                                ref={phone}
                                type="tel"
                                name="phone"
                                className="form-input"
                                placeholder="Phone"
                            />
                        </fieldset>
                        <fieldset className="form-input">
                            <label className="block text-gray-700">Roles</label>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_staff"
                                        ref={isStaff}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Staff</span>
                                </label>
                            </div>
                            <div className="mb-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_group_rep"
                                        ref={isGroupRep}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">Group Rep</span>
                                </label>
                            </div>
                            <div>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="is_isr"
                                        ref={isIsr}
                                        className="form-checkbox"
                                    />
                                    <span className="ml-2">ISR</span>
                                </label>
                            </div>
                        </fieldset>
                        <fieldset className="form-input">
                            <label htmlFor="inputPassword" className="form-label">
                                Password
                            </label>
                            <input
                                ref={password}
                                type="password"
                                name="password"
                                className="form-input"
                                placeholder="Password"
                                required
                            />
                        </fieldset>
                        <fieldset className="form-input">
                            <label htmlFor="verifyPassword" className="form-label">
                                Verify Password
                            </label>
                            <input
                                ref={verifyPassword}
                                type="password"
                                name="verifyPassword"
                                className="form-input"
                                placeholder="Verify password"
                                required
                            />
                        </fieldset>
                        <fieldset className="form-input">
                            <button
                                className="form-button bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full"
                                type="submit"
                            >
                                Submit
                            </button>
                        </fieldset>
                    </form>
                </section>
                <section className="form-link-container">
                    <Link to="/login" className="form-link">
                        Already registered? Login here!
                    </Link>
                </section>
            </main>
        </div>
    );
}
