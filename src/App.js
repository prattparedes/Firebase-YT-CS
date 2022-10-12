import logo from "./logo.svg";
import "./App.css";
import Input from "./components/Input";
import InputPass from "./components/InputPass";
import Button from "./components/Button";
import Login from './components/Login'
import ButtonG from './components/ButtonGoogle'

import React, { useState, useEffect } from "react";
import app from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";


function App() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [generalData, setGeneralData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function emailSet(event) {
    setEmail(event.target.value);
  }

  function passwordSet(event) {
    setPassword(event.target.value);
  }

  function Submit() {
    setGeneralData([...generalData, { email: email, password: password }]);
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user);
        alert('Registro exitoso')
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const [emailLogIn, setEmailLogIn] = useState('')
  const [passLogIn, setPassLogIn] = useState('')

function inputEmailLogIn(event) {
  setEmailLogIn(event.target.value)
  }

  function inputPassLogIn(event) {
    setPassLogIn(event.target.value)
  }

  function LogIn() {
    signInWithEmailAndPassword(auth, emailLogIn, passLogIn)
    .then((response) => {
      console.log(response.user);
      alert('Iniciaste Sesión')
    })
    .catch((err) => {
      alert(err.message);
    });
  }

  useEffect(() => {
    console.log(generalData);
  }, [generalData]);

  function googleLogIn() {
    signInWithPopup(auth, provider)    
    .then((result) => {
      console.log(result)
      alert('Iniciaste sesión')
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <>
      <h1>Authentication React-Firebase</h1>
      <h2 style={{ marginTop: '12px '}}>REGISTER</h2>
      <Input placeholder={"Email"} emailSet={emailSet} />
      <InputPass placeholder={"Password"} passwordSet={passwordSet} />
      <br></br>
      <Button submit={Submit} />
      {/* <div className="registeredUsers">
        <br></br>
        <h3>Registered Users</h3>
        email: {generalData.email}, password: {generalData.password}
      </div> */}
      <h2 style={{ marginTop: '16px '}}>LOGIN</h2>
      <Login login={LogIn} setEmail={inputEmailLogIn} setPass={inputPassLogIn}/>
      <ButtonG googleLogIn={googleLogIn}/>
      <a onClick={}></a>
    </>
  );
}

export default App;
