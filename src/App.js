import logo from "./logo.svg";
import "./App.css";
import Input from "./components/Input";
import InputPass from "./components/InputPass";
import Button from "./components/Button";
import Login from './components/Login'
import ButtonG from './components/ButtonGoogle'

import React, { useState, useEffect } from "react";
import { app, database, storage } from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

import { } from ''


function App() {
  // AUTHENTICATION SECTION
  
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const provider2 = new GithubAuthProvider();

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
    }, []);
  
    function googleLogIn() {
      signInWithPopup(auth, provider)    
      .then((result) => {
        console.log(result)
        alert('Iniciaste sesión')
      }).catch((error) => {
        console.log(error)
      });
    }
  
    function githubLogIn() {
      signInWithPopup(auth, provider2)
      .then((response) => {
        console.log(response);
        alert('Iniciaste con GitHub');
      }).catch((err) => {
        console.log(err)
      })
    }

  // Section Firestore
  const [actualID, setActualID] = useState('')
  const collectionRef = collection(database, 'users')

  function addData() {
    addDoc(collectionRef, {
      email: email,
      password: password
    })
    .then(() => {
      alert('Data añadida')
    }).catch((err) => {
      alert(err.message)
    })
  }

  function getData() {
    getDocs(collectionRef)
    .then((response) => {
      console.log(response.docs.map((item) => {
        return { ...item.data(), id: item.id}
      }))
    })
  }

  function updateData () {
    const docToUpdate = doc(database, 'users', actualID)
    updateDoc(docToUpdate, {
      email: email,
      password: password
    })
    .then(() => {
      alert('Data Updated')
    }).catch((err) => {
      alert(err.message)
    })
  }

  function deleteData() {
    const docToDelete = doc(database, 'users', actualID)
    deleteDoc(docToDelete)
    .then((response) => {
      console.log('data deleted')
    }).catch((err) => {
      console.log(err.message)
    })
  }

  function inputID(event) {
    setActualID(event.target.value)
  }

  //Firebase Storage

  return (
    <>
      <h1>Authentication React-Firebase</h1>
      <h2 style={{ marginTop: '12px '}}>REGISTER</h2>
      <Input placeholder={"Email"} emailSet={emailSet} />
      <InputPass placeholder={"Password"} passwordSet={passwordSet} />
      <br></br>
      <Button submit={Submit} />
      <h2 style={{ marginTop: '16px '}}>LOGIN</h2>
      <Login login={LogIn} setEmail={inputEmailLogIn} setPass={inputPassLogIn}/>
      <ButtonG googleLogIn={googleLogIn}/>
      <a onClick={githubLogIn}><i className="fa-brands fa-github" style={{ marginTop:'16px', fontSize:'24px', cursor:'pointer' }}></i></a>
      <br />
      <input placeholder="Enter doc ID" onChange={inputID} style={{ minWidth:'300px' }}/><br />
      <button onClick={addData}>ADD TO DATABASE</button>
      <button onClick={getData}>GET DATA FROM DB</button>
      <br />
      <button onClick={updateData}>UPDATE DATA</button>
      <button onClick={deleteData}>DELETE DATA</button>
    </>
  );
}

export default App;
