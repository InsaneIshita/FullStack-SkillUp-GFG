import React, { useContext } from "react";
import Chat from "./components/Chat.jsx";
import ThemeProvider, { ThemeContext } from './contexts/ThemeContext.jsx'

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="app__header">
      <div className="logo"><img src="src\assets\icons8-chatbot-32.png" alt="AI Chatbot Logo" /></div>
      <div className="titles">
        <h1>ClarifAI</h1>
        <p>Where curiosity meets clarity.</p>
      </div>
      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="theme-toggle-btn"
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
    </header>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <Chat />
      </div>
    </ThemeProvider>
  );
}
