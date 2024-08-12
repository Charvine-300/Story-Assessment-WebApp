import React from "react";

interface SpinnerProps {
  color?: "black" | "white";
  size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ color = "black", size = 8 }) => {
  const borderColor = color === "black" ? "border-black" : "border-white";
  
  return (
    <div
      className={`w-${size} h-${size} border-2 border-t-transparent ${borderColor} rounded-full animate-spin`}
    ></div>
  );
};

export default Spinner;
