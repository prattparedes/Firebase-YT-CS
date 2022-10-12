function Login() {
    return (
        <div>
        <input type="text" className="login__email" placeholder="email"/>
        <input type="text" className="login__password" placeholder="password"/>
        <br></br>
        <button className="login__btn">LOG IN</button>
        </div>
    )
}

export default Login