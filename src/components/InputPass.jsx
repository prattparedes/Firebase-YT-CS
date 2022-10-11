function Input({ name, placeholder, passwordSet }) {
    return (
        <>
        <input name={name} placeholder={placeholder} onChange={passwordSet}></input>
        </>
    )
}

export default Input