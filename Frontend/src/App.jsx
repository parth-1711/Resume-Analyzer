import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FileUpload from "./FileUpload";
import { TypeAnimation } from "react-type-animation";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="m-0 top-0">
      {/* bg-[#222831] */}
      <h1 className="text-slate-500 p-7 pt-0 top-0 left-0 h-28 w-full shadow-md text-center font-bold font-mono">
        Resume Analyser
      </h1>

      <div className="m-2">
        <TypeAnimation
          className="text-black"
          sequence={[
            "Get Suggestion on your resume based on the Job Profile",
            2000,
            "Know what you are Missing",
            2000,
          ]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "2em", display: "inline-block" }}
          repeat={Infinity}
        />
      </div>
      <FileUpload />
    </div>
  );
}

export default App;
