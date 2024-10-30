import React, { ReactNode } from "react";
import "./CustomScrollbar.css";

interface CustomScrollbarProps {
  children: ReactNode;
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ children }) => {
  return (
    <div className="scrollable-container">
      {children}
    </div>
  );
};

export default CustomScrollbar;