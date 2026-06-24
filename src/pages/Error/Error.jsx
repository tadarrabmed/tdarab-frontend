import React from "react";
import "./Error.css";
export default function Error({ error }) {
  return (
    <div className="error-sec flex-center">
      <p>{error} ❌</p>
    </div>
  );
}
