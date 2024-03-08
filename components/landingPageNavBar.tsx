import React from "react";
import { ModeToggle } from "./theme-switcher";

const LandingPageNavBar = () => {
  return (
    <div className="flex justify-between items-center p-3">
      <p className="text-2xl italic">Library Management System</p>
      <ModeToggle />
    </div>
  );
};

export default LandingPageNavBar;
