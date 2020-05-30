// ./Index.jsx
// import {React} from "https://raw.githubusercontent.com/deligenius/react-engine/master/react.ts"
import React from "./react.ts"

const Index = (props) => {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h3>{props.data.name}</h3>
    </div>
  );
};
export default Index;
