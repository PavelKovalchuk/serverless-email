import logo from './logo.svg';
import './App.css';
import EmailContainer from "./EmailContainer";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Sending email app</h1>
      </header>
      <EmailContainer />
    </div>
  );
}

export default App;
