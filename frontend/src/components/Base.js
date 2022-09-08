import React from "react";
import Navbar from "./Navbar/Navbar";

const Base = (props) => {
  const styles = props.styles || "";
  return (
    <div style={{ height: "100vh", ...styles }}>
      <Navbar />
      {props.children}
    </div>
  );
};

export default Base;
