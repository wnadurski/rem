import React, { useState } from 'react'


const MyForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
            <form className="flex-column" onSubmit={
                e => {
                    e.preventDefault()
                }
            }>
                <label htmlFor="username" className="field">
                    <input className="text-input"
                        id="username"
                        //value={username}
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                        onBlur={e => setUsername(e.target.value)}
                    />
                </label>
                <label htmlFor="password" className="field">
                    <input className="text-input"
                        id="password"
                        //value={password}
                        placeholder="Password"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        onBlur={e => setPassword(e.target.value)}
                    />
                </label>
                <label htmlFor="remember-me" className="remember-me">
                    Remember me
                    <input
                    id="remember-me"
                    type="checkbox"
                    />
                </label>
                <button type="submit" className="submit-button">Log in</button>
            </form>
        </div>
    )
}
export default MyForm;