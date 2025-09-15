// import { signOut } from "firebase/auth";
// import React, { useState } from "react";

// const Header = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleAuth = () => {
//     setIsLoggedIn((prev) => !prev);
//   };

//   return (
//     <div className="w-full bg-violet-500 h-[7vh] flex items-center px-5">
//       <h1 className="text-white font-bold text-2xl">
//         <span className="text-orange-600">Habit</span> Tracker
//       </h1>

//       <div className="ml-auto">
//         <button onClick={() => signOut(auth)}>Logout</button>

//         {/* <button
//           onClick={handleAuth}
//           className={`h-[30px] w-[80px] rounded-md font-medium transition duration-300 ${
//             isLoggedIn
//               ? "bg-orange-300 text-white hover:bg-red-600"
//               : "bg-orange-300 text-white hover:bg-pink-700"
//           }`}
//         >
//           {isLoggedIn ? "Logout" : "Login"}
//         </button> */}
//       </div>
//     </div>
//   );
// };

// export default Header;
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // ✅ import auth
import React from "react";

const Header = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-full bg-violet-500 h-[7vh] flex items-center px-5">
      <h1 className="text-white font-bold text-2xl">
        <span className="text-orange-600">Habit</span> Tracker
      </h1>

      <div className="ml-auto">
        <button
          onClick={handleLogout}
          className="bg-orange-400 text-white px-4 py-1 rounded-md hover:bg-orange-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
