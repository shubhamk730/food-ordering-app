import React from "react";
import Navbar from "./Navbar/Navbar";

const Base = (props) => {
  const styles = props.styles || "";
  return (
    <div style={{ minHeight: "100vh", ...styles, margin: 0 }}>
      <Navbar />
      {props.children}
    </div>
  );
};

export default Base;
