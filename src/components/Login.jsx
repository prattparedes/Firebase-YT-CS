function Login({ login, setEmail, setPass }) {
    return (
        <div>
        <input type="text" className="login__email" placeholder="Email" onChange={setEmail}/>
        <input type="text" className="login__password" placeholder="Password" onChange={setPass}/>
        <br></br>
        <button onClick={login} className="login__btn">LOG IN</button>
        </div>
    )
}

export default Login