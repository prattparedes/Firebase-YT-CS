function UsersList({ userHTML }) {

  return (
    <div
      className="Users__List"
      style={{
        backgroundColor: "lightgray",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginTop: "16px" }}>LISTA DE USUARIOS</h1>
      <ul style={{marginTop:'8px'}}>
        <li style={{ fontSize:'20px', listStyleType:'none' }}>1. prattcito@hotmail.com</li>
      </ul>
    </div>
  );
}

export default UsersList;
