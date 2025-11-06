import { useState } from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "300%",
        width: "100%",
        height: "100%",
        position: "relative",
        top: "50%"
      }}
    >
      Counter App
      <div
        style={{
          fontSize: "120%",
          position: "relative",
          top: "10vh",
        }}
      >
        {count}
      </div>
      <div className="buttons">
        <button
          style={{
            fontSize: "60%",
            position: "relative",
            top: "20vh",
            marginRight: "5px",
            backgroundColor: "rgba(8, 228, 104, 1)",
            borderRadius: "20px",
            color: "white",
          }}
          onClick={increment}
        >
          Increment
        </button>
        <button
          style={{
            fontSize: "60%",
            position: "relative",
            top: "20vh",
            marginLeft: "5px",
            backgroundColor: "rgba(255, 71, 87, 1)",
            borderRadius: "20px",
            color: "white",
          }}
          onClick={decrement}
        >
          Decrement
        </button><br></br>

        <button
          style={{
            padding: "5px 20px",
            fontSize: "40%",
            position: "relative",
            top: "18vh",
            marginLeft: "5px",
            backgroundColor: "rgba(89, 211, 245, 1)",
            borderRadius: "20px",
            color: "white",
          }}
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default App
