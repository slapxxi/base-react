import { useState } from "react";
import "./App.css";

export let App: React.FC = () => {
  const state = useState(0);

  console.log(state);

  const handleClick = () => {
    console.log("click");
  };

  return <div onClick={handleClick}>hello</div>;
};
