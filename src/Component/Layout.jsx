import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
   
      <Header />

      <div className="flex flex-1 overflow-hidden">
       
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default Layout;
