// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';

// // function Navbar() {
// //   const [adminOpen, setAdminOpen] = useState(false);
// //   const [dispatcherOpen, setDispatcherOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   return (
// //     <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-md">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-16 items-center">
// //           <div className="text-white font-bold text-xl">Lemon Software  Gate Pass</div>

// //           {/* Hamburger button */}
// //           <div className="md:hidden">
// //             <button
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //               className="text-white focus:outline-none text-2xl"
// //             >
// //               ☰
// //             </button>
// //           </div>

// //         {/* Desktop Menu */}
// //           <div className="hidden md:flex space-x-6 items-center font-medium text-white">
// //             {/* Admin Dropdown (on click) */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => setAdminOpen(!adminOpen)}
// //                 className="hover:text-yellow-400 flex items-center focus:outline-none"
// //               >
// //                 Admin <span className="ml-1">▼</span>
// //               </button>
// //               {adminOpen && (
// //                 <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-50 py-2">
// //                   <Link to="/plantmaster" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black">Plant Master</Link>
// //                   {/* <Link to="/zone-master" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black">Zone Master</Link>
// //                   <Link to="/user-master" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black">User Master</Link> */}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Dispatcher Dropdown (on click) */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => setDispatcherOpen(!dispatcherOpen)}
// //                 className="hover:text-yellow-400 flex items-center focus:outline-none"
// //               >
// //                 Dispatcher <span className="ml-1">▼</span>
// //               </button>
// //               {dispatcherOpen && (
// //                 <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg z-50 py-2">
// //                   <Link to="/truck" className="block px-4 py-2 text-white hover:bg-yellow-400 hover:text-black">Truck Transaction</Link>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Static Links */}
// //             <Link to="/gate" style={{ textDecoration: 'none' }} className="text-white hover:text-yellow-400">Gate Keeper</Link>
// //             <Link to="/loader" style={{ textDecoration: 'none' }} className="text-white hover:text-yellow-400">Loader</Link>
// //             <Link to="/reports" style={{ textDecoration: 'none' }} className="text-white hover:text-yellow-400">Reports</Link>
// //           </div>
// //         </div>


// //         {/* Mobile Menu */}
// //         {mobileMenuOpen && (
// //           <div className="md:hidden mt-2 space-y-2 bg-gray-900 p-4 rounded shadow-md text-white font-medium z-50">
// //             {/* Admin mobile */}
// //             <div>
// //               <button
// //                 onClick={() => setAdminOpen(!adminOpen)}
// //                 className="w-full text-left hover:text-yellow-400"
// //               >
// //                 Admin ▼
// //               </button>
// //               {adminOpen && (
// //                 <div className="pl-4 space-y-1 mt-1">
// //                   <Link to="/plantmaster" className="block hover:text-yellow-400">Plant Master</Link>
// //                   {/* <Link to="/zone-master" className="block hover:text-yellow-400">Zone Master</Link>
// //                   <Link to="/user-master" className="block hover:text-yellow-400">User Master</Link> */}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Dispatcher mobile */}
// //             <div>
// //               <button
// //                 onClick={() => setDispatcherOpen(!dispatcherOpen)}
// //                 className="w-full text-left hover:text-yellow-400"
// //               >
// //                 Dispatcher ▼
// //               </button>
// //               {dispatcherOpen && (
// //                 <div className="pl-4 space-y-1 mt-1">
// //                   <Link to="/truck" className="block hover:text-yellow-400">Truck Transaction</Link>
// //                 </div>
// //               )}
// //             </div>

// //             <Link to="/gate" className="block hover:text-yellow-400">Gate Keeper</Link>
// //             <Link to="/loader" className="block hover:text-yellow-400">Loader</Link>
// //             <Link to="/reports" className="block hover:text-yellow-400">Reports</Link>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;

// ////////////////////////////////////////////////////////////////////////////

// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';

// // function Navbar() {
// //   const [adminOpen, setAdminOpen] = useState(false);
// //   const [dispatcherOpen, setDispatcherOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   return (
// //     <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-20 items-center">
// //           <div className="text-white font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
// //             Lemon Software Gate Pass
// //           </div>

// //           {/* Hamburger button */}
// //           <div className="md:hidden">
// //             <button
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transform transition-all duration-300 hover:scale-110"
// //             >
// //               ☰
// //             </button>
// //           </div>

// //           {/* Desktop Menu */}
// //           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
// //             {/* Admin Dropdown (on click) */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => {
// //                   setAdminOpen((prev) => {
// //                     if (!prev) setDispatcherOpen(false);
// //                     return !prev;
// //                   });
// //                 }}
// //                 className="hover:text-yellow-400 flex items-center focus:outline-none transition-all duration-300 transform hover:scale-105"
// //               >
// //                 Admin <span className="ml-1 text-sm">▼</span>
// //               </button>
// //               {adminOpen && (
// //                 <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 transform transition-all duration-300 border border-gray-700">
// //                   <Link 
// //                     to="/plantmaster" 
// //                     className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 flex items-center"
// //                   >
// //                     <span className="mr-2">🏭</span> Plant Master
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Dispatcher Dropdown (on click) */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => {
// //                   setDispatcherOpen((prev) => {
// //                     if (!prev) setAdminOpen(false);
// //                     return !prev;
// //                   });
// //                 }}
// //                 className="hover:text-yellow-400 flex items-center focus:outline-none transition-all duration-300 transform hover:scale-105"
// //               >
// //                 Dispatcher <span className="ml-1 text-sm">▼</span>
// //               </button>
// //               {dispatcherOpen && (
// //                 <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 transform transition-all duration-300 border border-gray-700">
// //                   <Link 
// //                     to="/truck" 
// //                     className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 flex items-center"
// //                   >
// //                     <span className="mr-2">🚛</span> Truck Transaction
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Static Links */}
// //             <Link 
// //               to="/gate" 
// //               className="text-white hover:text-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center"
// //             >
// //               <span className="mr-2">🚪</span> Gate Keeper
// //             </Link>
// //             <Link 
// //               to="/loader" 
// //               className="text-white hover:text-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center"
// //             >
// //               <span className="mr-2">📦</span> Loader
// //             </Link>
// //             <Link 
// //               to="/reports" 
// //               className="text-white hover:text-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center"
// //             >
// //               <span className="mr-2">📊</span> Reports
// //             </Link>
// //           </div>
// //         </div>

// //         {/* Mobile Menu */}
// //         {mobileMenuOpen && (
// //           <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700 transform transition-all duration-300">
// //             {/* Admin mobile */}
// //             <div>
// //               <button
// //                 onClick={() => {
// //                   setAdminOpen((prev) => {
// //                     if (!prev) setDispatcherOpen(false);
// //                     return !prev;
// //                   });
// //                 }}
// //                 className="w-full text-left hover:text-yellow-400 transition-all duration-300 flex items-center"
// //               >
// //                 <span className="mr-2">👨‍💼</span> Admin <span className="ml-1 text-sm">▼</span>
// //               </button>
// //               {adminOpen && (
// //                 <div className="pl-8 space-y-2 mt-2 border-l-2 border-gray-700">
// //                   <Link 
// //                     to="/plantmaster" 
// //                     className="block hover:text-yellow-400 transition-all duration-300 flex items-center"
// //                   >
// //                     <span className="mr-2">🏭</span> Plant Master
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Dispatcher mobile */}
// //             <div>
// //               <button
// //                 onClick={() => {
// //                   setDispatcherOpen((prev) => {
// //                     if (!prev) setAdminOpen(false);
// //                     return !prev;
// //                   });
// //                 }}
// //                 className="w-full text-left hover:text-yellow-400 transition-all duration-300 flex items-center"
// //               >
// //                 <span className="mr-2">🚛</span> Dispatcher <span className="ml-1 text-sm">▼</span>
// //               </button>
// //               {dispatcherOpen && (
// //                 <div className="pl-8 space-y-2 mt-2 border-l-2 border-gray-700">
// //                   <Link 
// //                     to="/truck-transaction" 
// //                     className="block hover:text-yellow-400 transition-all duration-300 flex items-center"
// //                   >
// //                     <span className="mr-2">📝</span> Truck Transaction
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             <Link 
// //               to="/gate" 
// //               className="block hover:text-yellow-400 transition-all duration-300 flex items-center"
// //             >
// //               <span className="mr-2">🚪</span> Gate Keeper
// //             </Link>
// //             <Link 
// //               to="/loader" 
// //               className="block hover:text-yellow-400 transition-all duration-300 flex items-center"
// //             >
// //               <span className="mr-2">📦</span> Loader
// //             </Link>
// //             <Link 
// //               to="/reports" 
// //               className="block hover:text-yellow-400 transition-all duration-300 flex items-center"
// //             >
// //               <span className="mr-2">📊</span> Reports
// //             </Link>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;

// /////////////////////////////////////////////////////

// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';

// // function Navbar() {
// //   const [adminOpen, setAdminOpen] = useState(false);
// //   const [dispatcherOpen, setDispatcherOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   const toggleMenu = (menu) => {
// //     if (menu === 'admin') {
// //       setAdminOpen(!adminOpen);
// //       setDispatcherOpen(false);
// //     } else if (menu === 'dispatcher') {
// //       setDispatcherOpen(!dispatcherOpen);
// //       setAdminOpen(false);
// //     }
// //   };

// //   return (
// //     <nav className="bg-gray-900 shadow-md text-white font-medium relative z-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-16 items-center">
// //           <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
// //             Lemon Software Gate Pass
// //           </div>

// //           {/* Hamburger (mobile) */}
// //           <div className="md:hidden">
// //             <button
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //               className="text-white hover:text-yellow-400 text-2xl"
// //             >
// //               ☰
// //             </button>
// //           </div>

// //           {/* Desktop Menu */}
// //           <div className="hidden md:flex items-center space-x-8">
// //             <div className="relative group">
// //               <button
// //                 onClick={() => toggleMenu('admin')}
// //                 className="flex items-center hover:text-yellow-400 transition"
// //               >
// //                 Admin <span className="ml-1">▼</span>
// //               </button>
// //               {adminOpen && (
// //                 <div className="absolute bg-gray-800 mt-2 py-2 w-56 rounded-xl shadow-lg border border-yellow-500 transition">
// //                   <Link
// //                     to="/plantmaster"
// //                     className="block px-4 py-2 hover:bg-yellow-400 hover:text-black rounded transition"
// //                   >
// //                     🏭 Plant Master
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             <div className="relative group">
// //               <button
// //                 onClick={() => toggleMenu('dispatcher')}
// //                 className="flex items-center hover:text-yellow-400 transition"
// //               >
// //                 Dispatcher <span className="ml-1">▼</span>
// //               </button>
// //               {dispatcherOpen && (
// //                 <div className="absolute bg-gray-800 mt-2 py-2 w-56 rounded-xl shadow-lg border border-yellow-500 transition">
// //                   <Link
// //                     to="/truck"
// //                     className="block px-4 py-2 hover:bg-yellow-400 hover:text-black rounded transition"
// //                   >
// //                     🚛 Truck Transaction
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             <Link to="/gate" className="hover:text-yellow-400 transition">🚪 Gate Keeper</Link>
// //             <Link to="/loader" className="hover:text-yellow-400 transition">📦 Loader</Link>
// //             <Link to="/reports" className="hover:text-yellow-400 transition">📊 Reports</Link>
// //           </div>
// //         </div>

// //         {/* Mobile Menu */}
// //         {mobileMenuOpen && (
// //           <div className="md:hidden mt-2 bg-gray-800 rounded-xl shadow-lg p-4 space-y-2 border border-yellow-500">
// //             <div>
// //               <button
// //                 onClick={() => toggleMenu('admin')}
// //                 className="w-full text-left hover:text-yellow-400 transition"
// //               >
// //                 👨‍💼 Admin ▼
// //               </button>
// //               {adminOpen && (
// //                 <div className="pl-4 mt-1 space-y-1 border-l border-yellow-400">
// //                   <Link
// //                     to="/plantmaster"
// //                     className="block hover:text-yellow-400 transition"
// //                   >
// //                     🏭 Plant Master
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             <div>
// //               <button
// //                 onClick={() => toggleMenu('dispatcher')}
// //                 className="w-full text-left hover:text-yellow-400 transition"
// //               >
// //                 🚛 Dispatcher ▼
// //               </button>
// //               {dispatcherOpen && (
// //                 <div className="pl-4 mt-1 space-y-1 border-l border-yellow-400">
// //                   <Link
// //                     to="/truck"
// //                     className="block hover:text-yellow-400 transition"
// //                   >
// //                     📝 Truck Transaction
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             <Link to="/gate" className="block hover:text-yellow-400 transition">🚪 Gate Keeper</Link>
// //             <Link to="/loader" className="block hover:text-yellow-400 transition">📦 Loader</Link>
// //             <Link to="/reports" className="block hover:text-yellow-400 transition">📊 Reports</Link>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;
// //////////////////////////////////////////////////////////////////////////////////////


// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';

// // function Navbar() {
// //   const [adminOpen, setAdminOpen] = useState(false);
// //   const [dispatcherOpen, setDispatcherOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// //   const closeAllMenus = () => {
// //     setAdminOpen(false);
// //     setDispatcherOpen(false);
// //     setMobileMenuOpen(false);
// //   };

// //   return (
// //     <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-20 items-center">
// //           <div className="text-white font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
// //             Lemon Software Gate Pass
// //           </div>

// //           {/* Hamburger for mobile */}
// //           <div className="md:hidden">
// //             <button
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transform transition-all duration-300 hover:scale-110"
// //             >
// //               ☰
// //             </button>
// //           </div>

        
// //        {/* Desktop Menu */}
// // <div className="hidden md:flex space-x-8 items-center font-medium text-white">
// //   {/* Admin Dropdown */}
// //   <div className="relative">
// //     <button
// //       onClick={() => {
// //         setAdminOpen(!adminOpen);
// //         setDispatcherOpen(false);
// //       }}
// //       className="hover:text-yellow-400 flex items-center focus:outline-none transition duration-300 hover:scale-105"
// //     >
// //       Admin <span className="ml-1 text-sm">▼</span>
// //     </button>
// //     {adminOpen && (
// //       <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
// //         <Link 
// //           to="/plantmaster" 
// //           onClick={closeAllMenus}
// //           className="block px-6 py-3 text-white no-underline hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 flex items-center"
// //         >
// //           🏭 Plant Master
// //         </Link>
// //         <Link 
// //           to="/usermaster" 
// //           onClick={closeAllMenus}
// //           className="block px-6 py-3 text-white no-underline hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 flex items-center"
// //         >
// //           👤 User Master
// //         </Link>
// //       </div>
// //     )}
// //   </div>

// //             {/* Dispatcher Dropdown */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => {
// //                   setDispatcherOpen(!dispatcherOpen);
// //                   setAdminOpen(false);
// //                 }}
// //                 className="hover:text-yellow-400 flex items-center focus:outline-none transition duration-300 hover:scale-105"
// //               >
// //                 Dispatcher <span className="ml-1 text-sm">▼</span>
// //               </button>
// //               {dispatcherOpen && (
// //                 <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
// //                   <Link 
// //                     to="/truck" 
// //                     onClick={closeAllMenus}
// //                     className="block px-6 py-3 text-white no-underline hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 flex items-center"
// //                   >
// //                     🚛 Truck Transaction
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Static Links */}
// //             <Link 
// //               to="/gate" 
// //               onClick={closeAllMenus}
// //               className="text-white no-underline hover:text-yellow-400 transition duration-300 hover:scale-105 flex items-center"
// //             >
// //               🚪 Gate Keeper
// //             </Link>
// //             <Link 
// //               to="/loader" 
// //               onClick={closeAllMenus}
// //               className="text-white no-underline hover:text-yellow-400 transition duration-300 hover:scale-105 flex items-center"
// //             >
// //               📦 Loader
// //             </Link>
// //             <Link 
// //               to="/reports" 
// //               onClick={closeAllMenus}
// //               className="text-white no-underline hover:text-yellow-400 transition duration-300 hover:scale-105 flex items-center"
// //             >
// //               📊 Reports
// //             </Link>
// //           </div>
// //         </div>

// //        {/* Mobile Menu */}
// // {mobileMenuOpen && (
// //   <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium border border-gray-700">
// //     {/* Admin Mobile */}
// //     <div>
// //       <button
// //         onClick={() => {
// //           setAdminOpen(!adminOpen);
// //           setDispatcherOpen(false);
// //         }}
// //         className="w-full text-left hover:text-yellow-400 transition duration-300 flex items-center"
// //       >
// //         👨‍💼 Admin <span className="ml-1 text-sm">▼</span>
// //       </button>
// //       {adminOpen && (
// //         <div className="pl-8 space-y-2 mt-2 border-l-2 border-gray-700">
// //           <Link 
// //             to="/plantmaster" 
// //             onClick={closeAllMenus}
// //             className="block no-underline text-white hover:text-yellow-400 transition duration-300 flex items-center"
// //           >
// //             🏭 Plant Master
// //           </Link>
// //           <Link 
// //             to="/usermaster" 
// //             onClick={closeAllMenus}
// //             className="block no-underline text-white hover:text-yellow-400 transition duration-300 flex items-center"
// //           >
// //             👤 User Master
// //           </Link>
// //         </div>
// //       )}
// //     </div>

// //             {/* Dispatcher Mobile */}
// //             <div>
// //               <button
// //                 onClick={() => {
// //                   setDispatcherOpen(!dispatcherOpen);
// //                   setAdminOpen(false);
// //                 }}
// //                 className="w-full text-left hover:text-yellow-400 transition duration-300 flex items-center"
// //               >
// //                 🚛 Dispatcher <span className="ml-1 text-sm">▼</span>
// //               </button>
// //               {dispatcherOpen && (
// //                 <div className="pl-8 space-y-2 mt-2 border-l-2 border-gray-700">
// //                   <Link 
// //                     to="/truck" 
// //                     onClick={closeAllMenus}
// //                     className="block no-underline text-white hover:text-yellow-400 transition duration-300 flex items-center"
// //                   >
// //                     📝 Truck Transaction
// //                   </Link>
// //                 </div>
// //               )}
// //             </div>

// //             <Link 
// //               to="/gate" 
// //               onClick={closeAllMenus}
// //               className="block no-underline text-white hover:text-yellow-400 transition duration-300 flex items-center"
// //             >
// //               🚪 Gate Keeper
// //             </Link>
// //             <Link 
// //               to="/loader" 
// //               onClick={closeAllMenus}
// //               className="block no-underline text-white hover:text-yellow-400 transition duration-300 flex items-center"
// //             >
// //               📦 Loader
// //             </Link>
// //             <Link 
// //               to="/reports" 
// //               onClick={closeAllMenus}
// //               className="block no-underline text-white hover:text-yellow-400 transition duration-300 flex items-center"
// //             >
// //               📊 Reports
// //             </Link>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;


// // //////////////////////////////////////////////////////////



// // import React, { useState, useEffect } from 'react';
// // import { Link } from 'react-router-dom';

// // function Navbar() {
// //   const [adminOpen, setAdminOpen] = useState(false);
// //   const [dispatcherOpen, setDispatcherOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [userRole, setUserRole] = useState(null);

// //   useEffect(() => {
// //     const role = localStorage.getItem('userRole');
// //     setUserRole(role);
// //   }, []);

// //   const handleRestrictedAccess = () => {
// //     alert("You are not the owner");
// //   };

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     alert("You have been logged out.");
// //     window.location.href = "/"; // or navigate('/') if using useNavigate
// //   };

// //   const RestrictedLink = ({ to, children }) => {
// //     return userRole === "owner" ? (
// //       <Link to={to}>{children}</Link>
// //     ) : (
// //       <button onClick={handleRestrictedAccess} className="w-full text-left">
// //         {children}
// //       </button>
// //     );
// //   };

// //   const roleAccess = {
// //     owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports'],
// //     admin: ['plantmaster', 'usermaster','truck', 'gate', 'loader','reports'],
// //     dispatch: ['truck'],
// //     gatekeeper: ['gate'],
// //     report: ['reports'],
// //     loader: ['loader'],
// //     // Add more roles as needed
// //   };

// //   const canAccess = (route) => {
// //     if (!userRole) return false;
// //     // Split roles by comma and trim spaces
// //     const roles = userRole.split(',').map(r => r.trim());
// //     // Check if any role grants access
// //     return roles.some(role => roleAccess[role]?.includes(route));
// //   };

// //   const NavLink = ({ to, routeKey, children, ...props }) => {
// //     const handleClick = (e) => {
// //       if (!canAccess(routeKey)) {
// //         e.preventDefault();
// //         alert('You do not have rights to access this page.');
// //       }
// //     };
// //     return (
// //       <Link to={to} onClick={handleClick} {...props} style={{ cursor: canAccess(routeKey) ? 'pointer' : 'not-allowed', opacity: canAccess(routeKey) ? 1 : 0.6 }}>
// //         {children}
// //       </Link>
// //     );
// //   };

// //   return (
// //     <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-20 items-center">
// //           <div className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
// //             Lemon Software Gate Pass
// //           </div>

// //           {/* Mobile toggle */}
// //           <div className="md:hidden">
// //             <button
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
// //             >
// //               ☰
// //             </button>
// //           </div>

// //           {/* Desktop Menu */}
// //           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
// //             {/* Admin Dropdown */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => {
// //                   setAdminOpen((prev) => {
// //                     if (!prev) setDispatcherOpen(false);
// //                     return !prev;
// //                   });
// //                 }}
// //                 className="hover:text-yellow-400 flex items-center"
// //               >
// //                 Admin Master <span className="ml-1 text-sm">▼</span>
// //               </button>
// //               {adminOpen && (
// //                 <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
// //                   <NavLink to="/plantmaster" routeKey="plantmaster">
// //                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
// //                       🏭 Plant Master
// //                     </span>
// //                   </NavLink>

// //                   <NavLink to="/usermaster" routeKey="usermaster">
// //                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
// //                       👤 User Master
// //                     </span>
// //                   </NavLink>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Dispatcher Dropdown */}
// //             <div className="relative">
// //               <button
// //                 onClick={() => {
// //                   setDispatcherOpen((prev) => {
// //                     if (!prev) setAdminOpen(false);
// //                     return !prev;
// //                   });
// //                 }}
// //                 className="hover:text-yellow-400 flex items-center"
// //               >
// //                 Dispatcher <span className="ml-1 text-sm">▼</span>
// //               </button>
// //               {dispatcherOpen && (
// //                 <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
// //                   <NavLink to="/truck" routeKey="truck">
// //                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
// //                       🚛 Truck Transaction
// //                     </span>
// //                   </NavLink>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Public or Semi-Public Routes */}
// //             <NavLink to="/gate" routeKey="gate">
// //               <span className="hover:text-yellow-400 transition-all flex items-center">
// //                 🚪 Gate Keeper
// //               </span>
// //             </NavLink>

// //             <NavLink to="/loader" routeKey="loader">
// //               <span className="hover:text-yellow-400 flex items-center">
// //                 📦 Loader
// //               </span>
// //             </NavLink>

// //             <NavLink to="/reports" routeKey="reports">
// //               <span className="hover:text-yellow-400 transition-all flex items-center">
// //                 📊 Reports
// //               </span>
// //             </NavLink>

// //             {/* Logout Button */}
// //             <button
// //               onClick={handleLogout}
// //               className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-semibold"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </div>

// //         {/* Mobile Menu */}
// //         {mobileMenuOpen && (
// //           <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
// //             {/* Admin mobile */}
// //             <div>
// //               <button
// //                 onClick={() => {
// //                   setAdminOpen((prev) => {
// //                     if (!prev) setDispatcherOpen(false);
// //                     return !prev;
// //                   });
// //                 }}
// //                 className="w-full text-left hover:text-yellow-400"
// //               >
// //                 👨‍💼 Admin ▼
// //               </button>
// //               {adminOpen && (
// //                 <div className="pl-6 space-y-2 mt-2">
// //                   <NavLink to="/plantmaster" routeKey="plantmaster">
// //                     <span className="block hover:text-yellow-400">🏭 Plant Master</span>
// //                   </NavLink>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Dispatcher mobile */}
// //             <div>
// //               <button
// //                 onClick={() => {
// //                   setDispatcherOpen((prev) => {
// //                     if (!prev) setAdminOpen(false);
// //                     return !prev;
// //                   });
// //                 }}
// //                 className="w-full text-left hover:text-yellow-400"
// //               >
// //                 🚛 Dispatcher ▼
// //               </button>
// //               {dispatcherOpen && (
// //                 <div className="pl-6 space-y-2 mt-2">
// //                   <NavLink to="/truck" routeKey="truck">
// //                     <span className="block hover:text-yellow-400">📝 Truck Transaction</span>
// //                   </NavLink>
// //                 </div>
// //               )}
// //             </div>

// //             <NavLink to="/gate" routeKey="gate" className="block hover:text-yellow-400">
// //               🚪 Gate Keeper
// //             </NavLink>

// //             <NavLink to="/loader" routeKey="loader" className="block hover:text-yellow-400">
// //               📦 Loader
// //             </NavLink>

// //             <NavLink to="/reports" routeKey="reports" className="block hover:text-yellow-400">
// //               📊 Reports
// //             </NavLink>

// //             <button
// //               onClick={handleLogout}
// //               className="mt-4 block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Navbar;

// /////////////////////////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   // Access map with all keys in lowercase
//   const roleAccess = {
//     owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports'],
//     admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports'],
//     dispatch: ['truck'],
//     gatekeeper: ['gate'],
//     report: ['reports'],
//     loader: ['loader'],
//   };

//   // Case insensitive access check
//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim().toLowerCase());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, routeKey, children, ...props }) => {
//     const handleClick = (e) => {
//       if (!canAccess(routeKey)) {
//         e.preventDefault();
//         alert('You do not have rights to access this page.');
//       }
//     };
//     return (
//       <Link
//         to={to}
//         onClick={handleClick}
//         {...props}
//         style={{
//           cursor: canAccess(routeKey) ? 'pointer' : 'not-allowed',
//           opacity: canAccess(routeKey) ? 1 : 0.6,
//         }}
//       >
//         {children}
//       </Link>
//     );
//   };

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
//             Lemon Software Gate Pass
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button>
//           </div>

//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setAdminOpen((prev) => {
//                     if (!prev) setDispatcherOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="hover:text-yellow-400 flex items-center"
//               >
//                 Admin Master <span className="ml-1 text-sm">▼</span>
//               </button>
//               {adminOpen && (
//                 <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                   <NavLink to="/plantmaster" routeKey="plantmaster">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       🏭 Plant Master
//                     </span>
//                   </NavLink>
//                   <NavLink to="/usermaster" routeKey="usermaster">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       👤 User Master
//                     </span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setDispatcherOpen((prev) => {
//                     if (!prev) setAdminOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="hover:text-yellow-400 flex items-center"
//               >
//                 Dispatcher <span className="ml-1 text-sm">▼</span>
//               </button>
//               {dispatcherOpen && (
//                 <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                   <NavLink to="/truck" routeKey="truck">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       🚛 Truck Transaction
//                     </span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <NavLink to="/gate" routeKey="gate">
//               <span className="hover:text-yellow-400 transition-all flex items-center">
//                 🚪 Gate Keeper
//               </span>
//             </NavLink>

//             <NavLink to="/loader" routeKey="loader">
//               <span className="hover:text-yellow-400 flex items-center">
//                 📦 Loader
//               </span>
//             </NavLink>

//             <NavLink to="/reports" routeKey="reports">
//               <span className="hover:text-yellow-400 transition-all flex items-center">
//                 📊 Reports
//               </span>
//             </NavLink>

//             <button
//               onClick={handleLogout}
//               className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-semibold"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
//             <div>
//               <button
//                 onClick={() => {
//                   setAdminOpen((prev) => {
//                     if (!prev) setDispatcherOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="w-full text-left hover:text-yellow-400"
//               >
//                 👨‍💼 Admin ▼
//               </button>
//               {adminOpen && (
//                 <div className="pl-6 space-y-2 mt-2">
//                   <NavLink to="/plantmaster" routeKey="plantmaster">
//                     <span className="block hover:text-yellow-400">🏭 Plant Master</span>
//                   </NavLink>
//                   <NavLink to="/usermaster" routeKey="usermaster">
//                     <span className="block hover:text-yellow-400">👤 User Master</span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <div>
//               <button
//                 onClick={() => {
//                   setDispatcherOpen((prev) => {
//                     if (!prev) setAdminOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="w-full text-left hover:text-yellow-400"
//               >
//                 🚛 Dispatcher ▼
//               </button>
//               {dispatcherOpen && (
//                 <div className="pl-6 space-y-2 mt-2">
//                   <NavLink to="/truck" routeKey="truck">
//                     <span className="block hover:text-yellow-400">📝 Truck Transaction</span>
//                   </NavLink>
//                   <NavLink to="/truckfind" routeKey="truck">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       🚛 Truck Transaction Find
//                     </span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <NavLink to="/gate" routeKey="gate" className="block hover:text-yellow-400">
//               🚪 Gate Keeper
//             </NavLink>

//             <NavLink to="/loader" routeKey="loader" className="block hover:text-yellow-400">
//               📦 Loader
//             </NavLink>

//             <NavLink to="/reports" routeKey="reports" className="block hover:text-yellow-400">
//               📊 Reports
//             </NavLink>

//             <button
//               onClick={handleLogout}
//               className="mt-4 block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
// //////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   const roleAccess = {
//     owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
//     admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
//     dispatch: ['truck', 'truckfind'],
//     gatekeeper: ['gate'],
//     report: ['reports'],
//     loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim().toLowerCase());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, routeKey, children, ...props }) => {
//     const handleClick = (e) => {
//       if (!canAccess(routeKey)) {
//         e.preventDefault();
//         alert('You do not have rights to access this page.');
//       }
//     };
//     return (
//       <Link
//         to={to}
//         onClick={handleClick}
//         {...props}
//         style={{
//           cursor: canAccess(routeKey) ? 'pointer' : 'not-allowed',
//           opacity: canAccess(routeKey) ? 1 : 0.6,
//         }}
//       >
//         {children}
//       </Link>
//     );
//   };

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
//             Lemon Software Gate Pass
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button>
//           </div>

//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setAdminOpen((prev) => {
//                     if (!prev) setDispatcherOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="hover:text-yellow-400 flex items-center"
//               >
//                 Admin Master <span className="ml-1 text-sm">▼</span>
//               </button>
//               {adminOpen && (
//                 <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                   <NavLink to="/plantmaster" routeKey="plantmaster">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       🏭 Plant Master
//                     </span>
//                   </NavLink>
//                   <NavLink to="/usermaster" routeKey="usermaster">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       👤 User Master
//                     </span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setDispatcherOpen((prev) => {
//                     if (!prev) setAdminOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="hover:text-yellow-400 flex items-center"
//               >
//                 Dispatcher <span className="ml-1 text-sm">▼</span>
//               </button>
//               {dispatcherOpen && (
//                 <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                   <NavLink to="/truck" routeKey="truck">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       🚛 Truck Transaction
//                     </span>
//                   </NavLink>
//                   <NavLink to="/truckfind" routeKey="truckfind">
//                     <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                       🔍 Truck Transaction Find
//                     </span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <NavLink to="/gate" routeKey="gate">
//               <span className="hover:text-yellow-400 transition-all flex items-center">
//                 🚪 Gate Keeper
//               </span>
//             </NavLink>

//             <NavLink to="/loader" routeKey="loader">
//               <span className="hover:text-yellow-400 flex items-center">
//                 📦 Loader
//               </span>
//             </NavLink>

//             <NavLink to="/reports" routeKey="reports">
//               <span className="hover:text-yellow-400 transition-all flex items-center">
//                 📊 Reports
//               </span>
//             </NavLink>

//             <button
//               onClick={handleLogout}
//               className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-semibold"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
//             <div>
//               <button
//                 onClick={() => {
//                   setAdminOpen((prev) => {
//                     if (!prev) setDispatcherOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="w-full text-left hover:text-yellow-400"
//               >
//                 👨‍💼 Admin ▼
//               </button>
//               {adminOpen && (
//                 <div className="pl-6 space-y-2 mt-2">
//                   <NavLink to="/plantmaster" routeKey="plantmaster">
//                     <span className="block hover:text-yellow-400">🏭 Plant Master</span>
//                   </NavLink>
//                   <NavLink to="/usermaster" routeKey="usermaster">
//                     <span className="block hover:text-yellow-400">👤 User Master</span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <div>
//               <button
//                 onClick={() => {
//                   setDispatcherOpen((prev) => {
//                     if (!prev) setAdminOpen(false);
//                     return !prev;
//                   });
//                 }}
//                 className="w-full text-left hover:text-yellow-400"
//               >
//                 🚛 Dispatcher ▼
//               </button>
//               {dispatcherOpen && (
//                 <div className="pl-6 space-y-2 mt-2">
//                   <NavLink to="/truck" routeKey="truck">
//                     <span className="block hover:text-yellow-400">📝 Truck Transaction</span>
//                   </NavLink>
//                   <NavLink to="/truckfind" routeKey="truckfind">
//                     <span className="block hover:text-yellow-400">🔍 Truck Transaction Find</span>
//                   </NavLink>
//                 </div>
//               )}
//             </div>

//             <NavLink to="/gate" routeKey="gate" className="block hover:text-yellow-400">
//               🚪 Gate Keeper
//             </NavLink>

//             <NavLink to="/loader" routeKey="loader" className="block hover:text-yellow-400">
//               📦 Loader
//             </NavLink>

//             <NavLink to="/reports" routeKey="reports" className="block hover:text-yellow-400">
//               📊 Reports
//             </NavLink>

//             <button
//               onClick={handleLogout}
//               className="mt-4 block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
///////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const role = localStorage.getItem('userRole');
//     setUserRole(role);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     alert("You have been logged out.");
//     window.location.href = "/";
//   };

//   const roleAccess = {
//     owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
//     admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
//     dispatch: ['truck', 'truckfind'],
//     gatekeeper: ['gate'],
//     report: ['reports'],
//     loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim().toLowerCase());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, routeKey, children, ...props }) => (
//     <Link to={to} {...props}>{children}</Link>
//   );

//   return (
//     <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
//             Lemon Software Gate Pass
//           </div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button>
//           </div>

//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             {(canAccess('plantmaster') || canAccess('usermaster')) && (
//               <div className="relative">
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     if (!adminOpen) setDispatcherOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Admin Master <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 {adminOpen && (
//                   <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                     {canAccess('plantmaster') && (
//                       <NavLink to="/plantmaster" routeKey="plantmaster">
//                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                           🏭 Plant Master
//                         </span>
//                       </NavLink>
//                     )}
//                     {canAccess('usermaster') && (
//                       <NavLink to="/usermaster" routeKey="usermaster">
//                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                           👤 User Master
//                         </span>
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div className="relative">
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     if (!dispatcherOpen) setAdminOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Dispatcher <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 {dispatcherOpen && (
//                   <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
//                     {canAccess('truck') && (
//                       <NavLink to="/truck" routeKey="truck">
//                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                           🚛 Truck Transaction
//                         </span>
//                       </NavLink>
//                     )}
//                     {canAccess('truckfind') && (
//                       <NavLink to="/truckfind" routeKey="truckfind">
//                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
//                           🔍 Truck Transaction Find
//                         </span>
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {canAccess('gate') && (
//               <NavLink to="/gate" routeKey="gate">
//                 <span className="hover:text-yellow-400 transition-all flex items-center">🚪 Gate Keeper</span>
//               </NavLink>
//             )}
//             {canAccess('loader') && (
//               <NavLink to="/loader" routeKey="loader">
//                 <span className="hover:text-yellow-400 flex items-center">📦 Loader</span>
//               </NavLink>
//             )}
//             {canAccess('reports') && (
//               <NavLink to="/reports" routeKey="reports">
//                 <span className="hover:text-yellow-400 transition-all flex items-center">📊 Reports</span>
//               </NavLink>
//             )}

//             <button
//               onClick={handleLogout}
//               className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-semibold"
//             >
//               Logout
//             </button>
//           </div>
//         </div>

//         {mobileMenuOpen && (
//           <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
//             {(canAccess('plantmaster') || canAccess('usermaster')) && (
//               <div>
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     if (!adminOpen) setDispatcherOpen(false);
//                   }}
//                   className="w-full text-left hover:text-yellow-400"
//                 >
//                   👨‍💼 Admin ▼
//                 </button>
//                 {adminOpen && (
//                   <div className="pl-6 space-y-2 mt-2">
//                     {canAccess('plantmaster') && (
//                       <NavLink to="/plantmaster" routeKey="plantmaster">
//                         <span className="block hover:text-yellow-400">🏭 Plant Master</span>
//                       </NavLink>
//                     )}
//                     {canAccess('usermaster') && (
//                       <NavLink to="/usermaster" routeKey="usermaster">
//                         <span className="block hover:text-yellow-400">👤 User Master</span>
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div>
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     if (!dispatcherOpen) setAdminOpen(false);
//                   }}
//                   className="w-full text-left hover:text-yellow-400"
//                 >
//                   🚛 Dispatcher ▼
//                 </button>
//                 {dispatcherOpen && (
//                   <div className="pl-6 space-y-2 mt-2">
//                     {canAccess('truck') && (
//                       <NavLink to="/truck" routeKey="truck">
//                         <span className="block hover:text-yellow-400">📝 Truck Transaction</span>
//                       </NavLink>
//                     )}
//                     {canAccess('truckfind') && (
//                       <NavLink to="/truckfind" routeKey="truckfind">
//                         <span className="block hover:text-yellow-400">🔍 Truck Find</span>
//                       </NavLink>
//                     )}
//                   </div>
//                 )}
//               </div>
//             )}

//             {canAccess('gate') && (
//               <NavLink to="/gate" routeKey="gate" className="block hover:text-yellow-400">
//                 🚪 Gate Keeper
//               </NavLink>
//             )}
//             {canAccess('loader') && (
//               <NavLink to="/loader" routeKey="loader" className="block hover:text-yellow-400">
//                 📦 Loader
//               </NavLink>
//             )}
//             {canAccess('reports') && (
//               <NavLink to="/reports" routeKey="reports" className="block hover:text-yellow-400">
//                 📊 Reports
//               </NavLink>
//             )}

//             <button
//               onClick={handleLogout}
//               className="mt-4 block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
///////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Navbar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [dispatcherOpen, setDispatcherOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out.");
    window.location.href = "/";
  };

  const roleAccess = {
    Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
    Admin: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
    Dispatch: ['truck', 'truckfind'],
    GateKeeper: ['gate'],
    Report: ['reports'],
    Loader: ['loader'],
    UserMaster: ['usermaster'],
    UserRegister: ['userregister']
  };

  const canAccess = (route) => {
    if (!userRole) return false;
    const roles = userRole.split(',').map(r => r.trim());
    return roles.some(role => roleAccess[role]?.includes(route));
  };

  const NavLink = ({ to, children }) => (
    <Link to={to} className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
      {children}
    </Link>
  );

  if (location.pathname === '/') return null;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            Lemon Software Gate Pass
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
            >
              ☰
            </button>
          </div>

          <div className="hidden md:flex space-x-8 items-center font-medium text-white">
            {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
              <div className="relative">
                <button
                  onClick={() => {
                    setAdminOpen(!adminOpen);
                    if (!adminOpen) setDispatcherOpen(false);
                  }}
                  className="hover:text-yellow-400 flex items-center"
                >
                  Admin Master <span className="ml-1 text-sm">▼</span>
                </button>
                {adminOpen && (
                  <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
                    {canAccess('plantmaster') && <NavLink to="/plantmaster">🏭 Plant Master</NavLink>}
                    {canAccess('usermaster') && <NavLink to="/usermaster">👤 User Master</NavLink>}
                    {canAccess('userregister') && <NavLink to="/userregister">📝 User Register</NavLink>}
                  </div>
                )}
              </div>
            )}

            {(canAccess('truck') || canAccess('truckfind')) && (
              <div className="relative">
                <button
                  onClick={() => {
                    setDispatcherOpen(!dispatcherOpen);
                    if (!dispatcherOpen) setAdminOpen(false);
                  }}
                  className="hover:text-yellow-400 flex items-center"
                >
                  Dispatcher <span className="ml-1 text-sm">▼</span>
                </button>
                {dispatcherOpen && (
                  <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
                    {canAccess('truck') && <NavLink to="/truck">🚛 Truck Transaction</NavLink>}
                    {canAccess('truckfind') && <NavLink to="/truckfind">🔍 Truck Transaction Find</NavLink>}
                  </div>
                )}
              </div>
            )}

            {canAccess('gate') && <NavLink to="/gate">🚪 Gate Keeper</NavLink>}
            {canAccess('loader') && <NavLink to="/loader">📦 Loader</NavLink>}
            {canAccess('reports') && <NavLink to="/reports">📊 Reports</NavLink>}

            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
            {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
              <div>
                <button
                  onClick={() => {
                    setAdminOpen(!adminOpen);
                    if (!adminOpen) setDispatcherOpen(false);
                  }}
                  className="w-full text-left hover:text-yellow-400"
                >
                  👨‍💼 Admin ▼
                </button>
                {adminOpen && (
                  <div className="pl-6 space-y-2 mt-2">
                    {canAccess('plantmaster') && <NavLink to="/plantmaster">🏭 Plant Master</NavLink>}
                    {canAccess('usermaster') && <NavLink to="/usermaster">👤 User Master</NavLink>}
                    {canAccess('userregister') && <NavLink to="/userregister">📝 User Register</NavLink>}
                  </div>
                )}
              </div>
            )}

            {(canAccess('truck') || canAccess('truckfind')) && (
              <div>
                <button
                  onClick={() => {
                    setDispatcherOpen(!dispatcherOpen);
                    if (!dispatcherOpen) setAdminOpen(false);
                  }}
                  className="w-full text-left hover:text-yellow-400"
                >
                  🚛 Dispatcher ▼
                </button>
                {dispatcherOpen && (
                  <div className="pl-6 space-y-2 mt-2">
                    {canAccess('truck') && <NavLink to="/truck">📝 Truck Transaction</NavLink>}
                    {canAccess('truckfind') && <NavLink to="/truckfind">🔍 Truck Find</NavLink>}
                  </div>
                )}
              </div>
            )}

            {canAccess('gate') && <NavLink to="/gate">🚪 Gate Keeper</NavLink>}
            {canAccess('loader') && <NavLink to="/loader">📦 Loader</NavLink>}
            {canAccess('reports') && <NavLink to="/reports">📊 Reports</NavLink>}

            <button
              onClick={handleLogout}
              className="mt-4 block w-full text-left bg-red-500 hover:bg-red-600 px-3 py-2 rounded-lg text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
