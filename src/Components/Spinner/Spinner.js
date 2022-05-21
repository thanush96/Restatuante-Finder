import React from "react";
import ReactLoading from "react-loading";
import "./Spinner.css";

export default function Spinner() {
  return (
    <div className="viewLoading">
      <ReactLoading type={"cylon"} color={"white"} height={"5%"} width={"5%"} />
    </div>
  );
}
