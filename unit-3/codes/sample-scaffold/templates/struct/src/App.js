import React from 'react';
import logo from './logo.svg';
import './App.css';

<% if(typescript) { %>interface HeaderProps {
  logo: string
}
<% } %>
<% if(typescript) { %>function Header(props: HeaderProps) {<% } else { %>function Header(props) {<% } %>
  return (
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
        Learn React
      </a>
    </header>
  )
}

function App() {
  return (
    <div className="App">
      <Header logo={logo} />
    </div>
  );
}

export default App;
