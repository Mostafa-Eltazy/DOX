import React from "react";
import { RiDeleteBack2Line } from "react-icons/ri";

const FileLabel = ({ fileName, onRemoved }) => {
  return (
    <div
      className="d-flex w-75 justify-content-around mb-2 "
      style={{ backgroundColor: "silver" }}
    >
      <span className="file-label-title">{fileName}</span>
      <RiDeleteBack2Line
        className="mt-1"
        style={{ color: "red", cursor: "pointer" }}
        onClick={() => onRemoved(fileName)}
      />
    </div>
  );
};

export default FileLabel;
