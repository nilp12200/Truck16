// import React from "react";
// import { Link } from "react-router-dom";

// export default function Sidebar({ isOpen, toggleSidebar, darkMode, setDarkMode }) {
//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-64 bg-[#111827] text-white shadow-xl transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } transition-transform duration-300 z-50 p-5`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-lg font-bold">Lemon ERP</h2>
//         <button onClick={toggleSidebar} className="text-gray-300 hover:text-white">✖</button>
//       </div>

//       {/* Links */}
//       <div className="space-y-4">
//         <Link to="/home" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           🏠 <span>Home</span>
//         </Link>
//         <Link to="/gate" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           🚪 <span>Gate Keeper</span>
//         </Link>
//         <Link to="/truck" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           🚛 <span>Truck Transaction</span>
//         </Link>
//         <Link to="/reports" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded">
//           📊 <span>Reports</span>
//         </Link>

//         <button
//           onClick={() => {
//             localStorage.clear();
//             window.location.href = "/";
//           }}
//           className="flex items-center gap-3 p-2 hover:bg-red-600 rounded text-red-400"
//         >
//           🔓 <span>Logout</span>
//         </button>

//         {/* Dark Mode Toggle */}
//         <div className="flex items-center justify-between mt-8">
//           <span>🌙 Dark Mode</span>
//           <input
//             type="checkbox"
//             checked={darkMode}
//             onChange={(e) => setDarkMode(e.target.checked)}
//             className="accent-blue-500 w-5 h-5"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
///////////////////



import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar, darkMode, setDarkMode }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#111827] text-white shadow-2xl transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50 p-5 flex flex-col justify-between`}
    >
      {/* Top Close Button */}
      <div>
        <div className="flex justify-end mb-4">
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white text-xl">
            ✖
          </button>
        </div>

        {/* Navigation Links */}
        <div className="space-y-3 text-base font-medium">
          <Link to="/home" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-xl transition-all">
            🏠 <span>Home</span>
          </Link>
          <Link to="/gate" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-xl transition-all">
            🚪 <span>Gate Keeper</span>
          </Link>
          <Link to="/truck" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-xl transition-all">
            🚛 <span>Truck Transaction</span>
          </Link>
          <Link to="/reports" className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded-xl transition-all">
            📊 <span>Reports</span>
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <span>🌙 Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            className="accent-blue-500 w-5 h-5"
          />
        </div>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="flex items-center gap-3 p-2 hover:bg-red-600 bg-red-500 rounded-xl w-full justify-center font-semibold"
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
}
