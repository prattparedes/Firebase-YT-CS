import logo from "./logo.svg";
import "./App.css";
import Input from "./components/Input";
import InputPass from "./components/InputPass";
import Button from "./components/Button";
import Login from './components/Login'
import React, { useState, useEffect } from "react";
import app from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

function App() {
  const auth = getAuth();

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
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  useEffect(() => {
    console.log(generalData);
  }, [generalData]);

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
      <Login />
    </>
  );
}

export default App;
