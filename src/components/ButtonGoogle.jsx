function ButtonG({ googleLogIn }) {
  return (
    <div style={{ marginTop: '32px' }}>
      <button onClick={googleLogIn} style={{ fontWeight:'bold' }}><span style={{color:'blue'}}>LogIn</span> With <span style={{color:'red'}}>Google</span> <i class="fa-brands fa-google" style={{ marginLeft: '8px', fontWeight:'bold' }}></i></button>
    </div>
  );
}

export default ButtonG;
