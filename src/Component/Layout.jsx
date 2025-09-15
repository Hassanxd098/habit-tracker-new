import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Outlet /> {/* This will render the page content */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
