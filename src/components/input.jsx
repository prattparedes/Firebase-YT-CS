function Input({ type, name, placeholder, emailSet }) {
    return (
        <>
        <input name={name} placeholder={placeholder} onChange={emailSet}></input>
        </>
    )
}

export default Input