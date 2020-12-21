import logo from './logo.svg';
import './App.css';

function App() {


  const formatname = (user) => {
    return user.firstName + ' ' + user.lastName;
  }

  const user = {firstName:"Koralp",lastName:"Catalsakal"}

  const element = <h1>Hello {formatname(user)}</h1>
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React, {element}
        </a>
      </header>
    </div>
  );
}

export default App;
