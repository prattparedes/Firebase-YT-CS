import logo from './logo.svg';
import './App.css';
import Input from './components/Input'
import InputPass from './components/InputPass'
import Button from './components/Button'
import React, { useState} from 'react'

function App() {
  const [generalData, setGeneralData] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  function emailSet(event) {
    setEmail(event.target.value)
  }

  function passwordSet(event) {
    setPassword(event.target.value)
  }

  function submit() {
    setGeneralData(prevArr => [...prevArr, { email: email, password: password}])
    console.log(generalData)
  }


  return (
    <>
     <h1>Authentication React-Firebase</h1>
     <Input placeholder={'Email'} emailSet={emailSet}/>
     <InputPass placeholder={'Password'} passwordSet={passwordSet}/>
     <br></br>
     <Button submit={submit}/>
     <div className='registeredUsers'>
      <br></br>
      <h3>Registered Users</h3>
      email: {generalData.email}, password: {generalData.password}
     </div>
    </>
  );
}

export default App;
