import logo from './logo.svg';
import './App.css';
import Input from './components/input'
import Button from './components/Button'

function App() {
  return (
    <>
     <h1>Authentication React-Firebase</h1>
     <Input placeholder={'Username'}/>
     <Input placeholder={'Password'}/>
     <Button />
    </>
  );
}

export default App;
