import React from "react";
import Header from "./components/header";

const App: React.FC<any> = (props: any) => {
  return (
    <div className="App">
      <Header />
      {props.children}
    </div>
  );
};

export default App;
