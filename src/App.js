import UsersList from "./components/UsersList";
import "./App.css";
import Input from "./components/Input";
import InputPass from "./components/InputPass";
import Button from "./components/Button";
import Login from "./components/Login";
import ButtonG from "./components/ButtonGoogle";

import React, { useState, useEffect } from "react";

import { app, database, storage } from "./firebaseConfig";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDoc,
  query,
  where
} from "firebase/firestore";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
        alert("Registro exitoso");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const [emailLogIn, setEmailLogIn] = useState("");
  const [passLogIn, setPassLogIn] = useState("");

  function inputEmailLogIn(event) {
    setEmailLogIn(event.target.value);
  }

  function inputPassLogIn(event) {
    setPassLogIn(event.target.value);
  }

  function LogIn() {
    signInWithEmailAndPassword(auth, emailLogIn, passLogIn)
      .then((response) => {
        console.log(response.user);
        alert("Iniciaste Sesi??n");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // useEffect(() => {
  //   console.log(generalData);
  // }, []);

  function googleLogIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        alert("Iniciaste sesi??n");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function githubLogIn() {
    signInWithPopup(auth, provider2)
      .then((response) => {
        console.log(response);
        alert("Iniciaste con GitHub");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Section Firestore
  const [actualID, setActualID] = useState("");
  const collectionRef = collection(database, "users");

  function addData() {
    addDoc(collectionRef, {
      email: email,
      password: password,
    })
      .then(() => {
        alert("Data a??adida");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function getData() {
    getDocs(collectionRef).then((response) => {
      console.log(
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  }

  function updateData() {
    const docToUpdate = doc(database, "users", actualID);
    updateDoc(docToUpdate, {
      email: email,
      password: password,
    })
      .then(() => {
        alert("Data Updated");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  function deleteData() {
    const docToDelete = doc(database, "users", actualID);
    deleteDoc(docToDelete)
      .then((response) => {
        console.log("data deleted");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function inputID(event) {
    setActualID(event.target.value);
  }

  //Firebase Storage
  const [fileToUpload, setFileToUpload] = useState({});

  function inputFile(event) {
    setFileToUpload(event.target.files[0]);
  }

  function submitFile() {
    const storageRef = ref(storage, `images/${fileToUpload.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileToUpload);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at ", downloadURL);
        });
      }
    );
    console.log(fileToUpload.name);
  }

  //REALTIME USER LIST
  // function getUsersData() {
  //   // getDocs(collectionRef).then((data) => {
  //   //   console.log(
  //   //     data.docs.map((item) => {
  //   //       return item.data();
  //   //     })
  //   //   );
  //   // });
  //   // // onSnapshot(collectionRef, (data) => {
  //   // //   console.log(
  //   // //     data.docs.map((item) => {
  //   // //       return item.data();
  //   // //     })
  //   // //   );
  //   // // });
  // }

  // useEffect(() => {
  //   getUsersData();
  // }, []);

  getDocs(collectionRef);

  async function UserHTML() {
    const userListRef = await getDocs(collectionRef);
    const userList = userListRef.docs.map((data) => data.data());

    const userListHTML = userList
      .map((user) => {
        return `<li style="font-size: 20px; list-style-type: none">${user.email}</li>`;
      })
      .join("");
    ;
    const usersListEl = document.querySelector('.users__list')
    usersListEl.innerHTML = userListHTML

    return userListHTML;
  }

  onSnapshot(collectionRef, (data) => {
    UserHTML()
  })

   /* FIRESTORE QUERYS */
   const usersAgeRef = collection(database, "users__age");
   const [name,setName] = useState('')
   const [age,setAge] = useState(0)

   function handleInputName(event) {
    setName(event.target.value)
   }

   function handleInputAge(event) {
    setAge(parseInt(event.target.value))
   }
   
   function addData2() {
    addDoc(usersAgeRef, {
      name: name,
      age: age,
    })
      .then(() => {
        alert("Data a??adida");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const nameQuery = query(usersAgeRef, where("name", "!=", 'Mari'))
  const ageQuery = query(usersAgeRef, where("age", "<", 20))

  function getData2() {
    onSnapshot(nameQuery, (data) => {
      console.log(data.docs.map((item) => {
        return item.data();
      }))
    })
  }

  function getData3() {
    onSnapshot(ageQuery, (data) => {
      console.log(data.docs.map((item) => {
        return item.data();
      }))
    })
  }

  useEffect(() => {
    getData2()
  }, [])

  useEffect(() => {
    getData3()
  }, [])
  



  return (
    <>
      <h1>Authentication React-Firebase</h1>
      <h2 style={{ marginTop: "12px " }}>REGISTER</h2>
      <Input placeholder={"Email"} emailSet={emailSet} />
      <InputPass placeholder={"Password"} passwordSet={passwordSet} />
      <br></br>
      <Button submit={Submit} />
      <h2 style={{ marginTop: "16px " }}>LOGIN</h2>
      <Login
        login={LogIn}
        setEmail={inputEmailLogIn}
        setPass={inputPassLogIn}
      />
      <ButtonG googleLogIn={googleLogIn} />
      <a onClick={githubLogIn}>
        <i
          className="fa-brands fa-github"
          style={{ marginTop: "16px", fontSize: "24px", cursor: "pointer" }}
        ></i>
      </a>
      <br />
      <input
        placeholder="Enter doc ID"
        onChange={inputID}
        style={{ minWidth: "300px" }}
      />
      <br />
      <button onClick={addData}>ADD TO DATABASE</button>
      <button onClick={getData}>GET DATA FROM DB</button>
      <br />
      <button onClick={updateData}>UPDATE DATA</button>
      <button onClick={deleteData}>DELETE DATA</button>
      <div className="fb__storage" style={{ marginTop: "24px" }}>
        <h1>FIREBASE STORAGE</h1>
        <input
          type="file"
          placeholder="Enter here"
          style={{ minWidth: "300px", marginTop: "16px" }}
          onChange={inputFile}
        />
        <br />
        <button style={{ marginTop: "24px" }} onClick={submitFile}>
          Upload to Storage
        </button>
      </div>
      <div
        className="Users__List"
        style={{
          backgroundColor: "lightgray",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ marginTop: "16px" }}>LISTA DE USUARIOS</h1>
        <ul className="users__list" style={{ marginTop: "8px" }}>Loading...</ul>
      </div>

      <h2 style={{ marginTop:'16px' }}>FireStore Querys (Users age)</h2>
      <input onChange={handleInputName} placeholder="Enter Name" style={{ minWidth:'300px', marginTop:'8px'}}></input>
      <input onChange={handleInputAge} placeholder="Age" style={{ maxWidth:'50px'}}></input> <br />
      <button onClick={addData2} style={{ marginTop:'24px'}}>SUBMIT TO DB</button>
    </>
  );
}

export default App;
