import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { PostMessageTrigger } from "./components/PostMessageTrigger";

function App() {
  const [show, setShow] = useState(true);
  const handleClick = () => {
    setShow((show) => !show);
  };
  return (
    <main>
      {/* <button onClick={handleClick}>Click to show my component</button> */}
      <div className="body-content">{show && <PostMessageTrigger />}</div>
    </main>
  );
}

export default App;
