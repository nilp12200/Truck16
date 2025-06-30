
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

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     alert("You have been logged out.");
// //     window.location.href = "/";
// //   };

// //   // Access map with all keys in lowercase
// //   const roleAccess = {
// //     owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports'],
// //     admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports'],
// //     dispatch: ['truck'],
// //     gatekeeper: ['gate'],
// //     report: ['reports'],
// //     loader: ['loader'],
// //   };

// //   // Case insensitive access check
// //   const canAccess = (route) => {
// //     if (!userRole) return false;
// //     const roles = userRole.split(',').map(r => r.trim().toLowerCase());
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
// //       <Link
// //         to={to}
// //         onClick={handleClick}
// //         {...props}
// //         style={{
// //           cursor: canAccess(routeKey) ? 'pointer' : 'not-allowed',
// //           opacity: canAccess(routeKey) ? 1 : 0.6,
// //         }}
// //       >
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

// //           <div className="md:hidden">
// //             <button
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
// //             >
// //               ☰
// //             </button>
// //           </div>

// //           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
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

// //             <button
// //               onClick={handleLogout}
// //               className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-semibold"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </div>

// //         {mobileMenuOpen && (
// //           <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
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
// //                   <NavLink to="/usermaster" routeKey="usermaster">
// //                     <span className="block hover:text-yellow-400">👤 User Master</span>
// //                   </NavLink>
// //                 </div>
// //               )}
// //             </div>

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

// // export default Navbar;///////////////////////////////my code ///////////////////////////////////////////////

// // import React, { useState, useEffect } from 'react';
// // import { Link, useLocation } from 'react-router-dom';

// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// // function Navbar() {
// //   const [adminOpen, setAdminOpen] = useState(false);
// //   const [dispatcherOpen, setDispatcherOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [userRole, setUserRole] = useState(null);
// //   const location = useLocation();

// //   useEffect(() => {
// //     const role = localStorage.getItem('userRole');
// //     setUserRole(role);
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     alert("You have been logged out.");
// //     window.location.href = "/";
// //   };

// //   // Match roles exactly as stored in DB/localStorage
// //   const roleAccess = {
// //     Owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
// //     Admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
// //     Dispatch: ['truck', 'truckfind'],
// //     GateKeeper: ['gate'],
// //     Report: ['reports'],
// //     Loader: ['loader'],
// //   };

// //   const canAccess = (route) => {
// //     if (!userRole) return false;
// //     const roles = userRole.split(',').map(r => r.trim()); // no toLowerCase()
// //     return roles.some(role => roleAccess[role]?.includes(route));
// //   };

// //   const NavLink = ({ to, routeKey, children, ...props }) => (
// //     <Link to={to} {...props}>{children}</Link>
// //   );

// //   // Hide navbar on login page
// //   if (location.pathname === '/') return null;

// //   return (
// //     <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-20 items-center">
// //           <div className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
// //             Lemon Software Gate Pass
// //           </div>

// //           <div className="md:hidden">
// //             <button
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
// //             >
// //               ☰
// //             </button>
// //           </div>

// //           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
// //             {(canAccess('plantmaster') || canAccess('usermaster')) && (
// //               <div className="relative">
// //                 <button
// //                   onClick={() => {
// //                     setAdminOpen(!adminOpen);
// //                     if (!adminOpen) setDispatcherOpen(false);
// //                   }}
// //                   className="hover:text-yellow-400 flex items-center"
// //                 >
// //                   Admin Master <span className="ml-1 text-sm">▼</span>
// //                 </button>
// //                 {adminOpen && (
// //                   <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
// //                     {canAccess('plantmaster') && (
// //                       <NavLink to="/plantmaster" routeKey="plantmaster">
// //                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
// //                           🏭 Plant Master
// //                         </span>
// //                       </NavLink>
// //                     )}
// //                     {canAccess('usermaster') && (
// //                       <NavLink to="/usermaster" routeKey="usermaster">
// //                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
// //                           👤 User Master
// //                         </span>
// //                       </NavLink>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {(canAccess('truck') || canAccess('truckfind')) && (
// //               <div className="relative">
// //                 <button
// //                   onClick={() => {
// //                     setDispatcherOpen(!dispatcherOpen);
// //                     if (!dispatcherOpen) setAdminOpen(false);
// //                   }}
// //                   className="hover:text-yellow-400 flex items-center"
// //                 >
// //                   Dispatcher <span className="ml-1 text-sm">▼</span>
// //                 </button>
// //                 {dispatcherOpen && (
// //                   <div className="absolute mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl z-50 py-2 border border-gray-700">
// //                     {canAccess('truck') && (
// //                       <NavLink to="/truck" routeKey="truck">
// //                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
// //                           🚛 Truck Transaction
// //                         </span>
// //                       </NavLink>
// //                     )}
// //                     {canAccess('truckfind') && (
// //                       <NavLink to="/truckfind" routeKey="truckfind">
// //                         <span className="block px-6 py-3 text-white hover:bg-yellow-400 hover:text-gray-900">
// //                           🔍 Truck Transaction Find
// //                         </span>
// //                       </NavLink>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {canAccess('gate') && (
// //               <NavLink to="/gate" routeKey="gate">
// //                 <span className="hover:text-yellow-400 transition-all flex items-center">🚪 Gate Keeper</span>
// //               </NavLink>
// //             )}
// //             {canAccess('loader') && (
// //               <NavLink to="/loader" routeKey="loader">
// //                 <span className="hover:text-yellow-400 flex items-center">📦 Loader</span>
// //               </NavLink>
// //             )}
// //             {canAccess('reports') && (
// //               <NavLink to="/reports" routeKey="reports">
// //                 <span className="hover:text-yellow-400 transition-all flex items-center">📊 Reports</span>
// //               </NavLink>
// //             )}

// //             <button
// //               onClick={handleLogout}
// //               className="ml-4 px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 transition text-white text-sm font-semibold"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </div>

// //         {/* Mobile menu */}
// //         {mobileMenuOpen && (
// //           <div className="md:hidden mt-2 space-y-2 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
// //             {(canAccess('plantmaster') || canAccess('usermaster')) && (
// //               <div>
// //                 <button
// //                   onClick={() => {
// //                     setAdminOpen(!adminOpen);
// //                     if (!adminOpen) setDispatcherOpen(false);
// //                   }}
// //                   className="w-full text-left hover:text-yellow-400"
// //                 >
// //                   👨‍💼 Admin ▼
// //                 </button>
// //                 {adminOpen && (
// //                   <div className="pl-6 space-y-2 mt-2">
// //                     {canAccess('plantmaster') && (
// //                       <NavLink to="/plantmaster" routeKey="plantmaster">
// //                         <span className="block hover:text-yellow-400">🏭 Plant Master</span>
// //                       </NavLink>
// //                     )}
// //                     {canAccess('usermaster') && (
// //                       <NavLink to="/usermaster" routeKey="usermaster">
// //                         <span className="block hover:text-yellow-400">👤 User Master</span>
// //                       </NavLink>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {(canAccess('truck') || canAccess('truckfind')) && (
// //               <div>
// //                 <button
// //                   onClick={() => {
// //                     setDispatcherOpen(!dispatcherOpen);
// //                     if (!dispatcherOpen) setAdminOpen(false);
// //                   }}
// //                   className="w-full text-left hover:text-yellow-400"
// //                 >
// //                   🚛 Dispatcher ▼
// //                 </button>
// //                 {dispatcherOpen && (
// //                   <div className="pl-6 space-y-2 mt-2">
// //                     {canAccess('truck') && (
// //                       <NavLink to="/truck" routeKey="truck">
// //                         <span className="block hover:text-yellow-400">📝 Truck Transaction</span>
// //                       </NavLink>
// //                     )}
// //                     {canAccess('truckfind') && (
// //                       <NavLink to="/truckfind" routeKey="truckfind">
// //                         <span className="block hover:text-yellow-400">🔍 Truck Find</span>
// //                       </NavLink>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {canAccess('gate') && (
// //               <NavLink to="/gate" routeKey="gate" className="block hover:text-yellow-400">
// //                 🚪 Gate Keeper
// //               </NavLink>
// //             )}
// //             {canAccess('loader') && (
// //               <NavLink to="/loader" routeKey="loader" className="block hover:text-yellow-400">
// //                 📦 Loader
// //               </NavLink>
// //             )}
// //             {canAccess('reports') && (
// //               <NavLink to="/reports" routeKey="reports" className="block hover:text-yellow-400">
// //                 📊 Reports
// //               </NavLink>
// //             )}

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

// // export default Navbar;////////////////////////////////working navbar////////////

// // import React, { useState, useEffect } from 'react';
// // import { Link, useLocation } from 'react-router-dom';

// // const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// // function Navbar() {
// //   const [adminOpen, setAdminOpen] = useState(false);
// //   const [dispatcherOpen, setDispatcherOpen] = useState(false);
// //   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// //   const [userRole, setUserRole] = useState(null);
// //   const location = useLocation();

// //   useEffect(() => {
// //     const role = localStorage.getItem('userRole');
// //     setUserRole(role);
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.clear();
// //     alert("You have been logged out.");
// //     window.location.href = "/";
// //   };

// //   const roleAccess = {
// //     Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
// //     Admin: ['plantmaster', 'usermaster','userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind'],
// //     Dispatch: ['truck', 'truckfind'],
// //     GateKeeper: ['gate'],
// //     Report: ['reports'],
// //     Loader: ['loader'],
// //   };

// //   const canAccess = (route) => {
// //     if (!userRole) return false;
// //     const roles = userRole.split(',').map(r => r.trim());
// //     return roles.some(role => roleAccess[role]?.includes(route));
// //   };

// //   const NavLink = ({ to, routeKey, children, ...props }) => (
// //     <Link to={to} {...props} className="no-underline">
// //       {children}
// //     </Link>
// //   );

// //   if (location.pathname === '/') return null;

// //   return (
// //     <nav className="bg-black shadow-xl">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex justify-between h-20 items-center">
// //           <div className="font-bold text-2xl text-white">
// //             Lemon Software Gate Pass
// //           </div>

// //           <div className="md:hidden">
// //             <button
// //               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
// //               className="text-white hover:text-yellow-400 focus:outline-none text-2xl transition-all duration-300 hover:scale-110"
// //             >
// //               ☰
// //             </button>
// //           </div>

// //           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
// //             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
// //               <div className="relative group">
// //                 <button
// //                   onClick={() => {
// //                     setAdminOpen(!adminOpen);
// //                     if (!adminOpen) setDispatcherOpen(false);
// //                   }}
// //                   className="hover:text-yellow-400 flex items-center"
// //                 >
// //                   Admin Master <span className="ml-1 text-sm">▼</span>
// //                 </button>
// //                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${adminOpen ? 'block' : 'hidden'}`}>
// //                   {canAccess('plantmaster') && (
// //                     <NavLink to="/plantmaster" routeKey="plantmaster">
// //                       <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
// //                         🏭 Plant Master
// //                       </span>
// //                     </NavLink>
// //                   )}
// //                   {canAccess('usermaster') && (
// //                     <NavLink to="/usermaster" routeKey="usermaster">
// //                       <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
// //                         👤 User Master
// //                       </span>
// //                     </NavLink>
// //                   )}
// //                       {canAccess('userregister') && (
// //                     <NavLink to="/userregister" routeKey="userregister">
// //                       <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
// //                         👤 User Register
// //                       </span>
// //                     </NavLink>
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             {(canAccess('truck') || canAccess('truckfind')) && (
// //               <div className="relative group">
// //                 <button
// //                   onClick={() => {
// //                     setDispatcherOpen(!dispatcherOpen);
// //                     if (!dispatcherOpen) setAdminOpen(false);
// //                   }}
// //                   className="hover:text-yellow-400 flex items-center"
// //                 >
// //                   Dispatcher <span className="ml-1 text-sm">▼</span>
// //                 </button>
// //                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${dispatcherOpen ? 'block' : 'hidden'}`}>
// //                   {canAccess('truck') && (
// //                     <NavLink to="/truck" routeKey="truck">
// //                       <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
// //                         🚛 Truck Transaction
// //                       </span>
// //                     </NavLink>
// //                   )}
// //                   {canAccess('truckfind') && (
// //                     <NavLink to="/truckfind" routeKey="truckfind">
// //                       <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
// //                         🔍 Truck Find
// //                       </span>
// //                     </NavLink>
// //                   )}
// //                 </div>
// //               </div>
// //             )}

// //             {canAccess('gate') && (
// //               <NavLink
// //                 to="/gate"
// //                 routeKey="gate"
// //                 onClick={() => {
// //                   setDispatcherOpen(false);
// //                   setAdminOpen(false);
// //                 }}
// //               >
// //                 <span className="text-white hover:text-yellow-400 transition-all flex items-center no-underline">
// //                   🚪 Gate Keeper
// //                 </span>
// //               </NavLink>
// //             )}

// //             {canAccess('loader')  && (
// //               <NavLink to="/loader" routeKey="loader">
// //                 <span className="text-white hover:text-yellow-400 transition-all flex items-center no-underline">
// //                   📦 Loader
// //                 </span>
// //               </NavLink>
// //             )}
// //           {(canAccess('reports') || canAccess('truckshedule')) && (
// //   <div className="relative group">
// //     <button
// //       onClick={() => {
// //         setAdminOpen(false);
// //         setDispatcherOpen(false);
// //       }}
// //       className="hover:text-yellow-400 flex items-center"
// //     >
// //       📊 Reports <span className="ml-1 text-sm">▼</span>
// //     </button>
// //     <div className="absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50">
// //       {canAccess('reports') && (
// //         <NavLink to="/reports" routeKey="reports">
// //           <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
// //             📈 Reports
// //           </span>
// //         </NavLink>
// //       )}
// //       {canAccess('truckshedule') && (
// //         <NavLink to="/truckshedule" routeKey="truckshedule">
// //           <span className="block px-4 py-2 text-white hover:bg-blue-600 no-underline">
// //             🚛 Truck Schedule
// //           </span>
// //         </NavLink>
// //       )}
// //     </div>
// //   </div>
// // )}

// //             <button
// //               onClick={handleLogout}
// //               className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg border border-red-700 transition duration-300 ease-in-out hover:scale-105"
// //             >
// //               🔓 Logout
// //             </button>
// //           </div>
// //         </div>

// //         {/* Mobile Menu */}
// //                 {mobileMenuOpen && (
// //           <div className="md:hidden mt-2 space-y-4 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
// //             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister'))  && (
// //               <div>
// //                 <button
// //                   onClick={() => {
// //                     setAdminOpen(!adminOpen);
// //                     if (!adminOpen) setDispatcherOpen(false);
// //                   }}
// //                   className="w-full text-left hover:text-yellow-400"
// //                 >
// //                   👨‍💼 Admin ▼
// //                 </button>
// //                 {adminOpen && (
// //                   <div className="pl-6 space-y-2 mt-2">
// //                     {canAccess('plantmaster') && (
// //                       <NavLink to="/plantmaster">
// //                         <span className="block hover:text-yellow-400">🏭 Plant Master</span>
// //                       </NavLink>
// //                     )}
// //                     {canAccess('usermaster') && (
// //                       <NavLink to="/usermaster">
// //                         <span className="block hover:text-yellow-400">👤 User Master</span>
// //                       </NavLink>
// //                     )}
// //                     {canAccess('userregister') && (
// //                       <NavLink to="/userregister">
// //                         <span className="block hover:text-yellow-400">👤 User Master</span>
// //                       </NavLink>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {(canAccess('truck') || canAccess('truckfind')) && (
// //               <div>
// //                 <button
// //                   onClick={() => {
// //                     setDispatcherOpen(!dispatcherOpen);
// //                     if (!dispatcherOpen) setAdminOpen(false);
// //                   }}
// //                   className="w-full text-left hover:text-yellow-400"
// //                 >
// //                   🚛 Dispatcher ▼
// //                 </button>
// //                 {dispatcherOpen && (
// //                   <div className="pl-6 space-y-2 mt-2">
// //                     {canAccess('truck') && (
// //                       <NavLink to="/truck">
// //                         <span className="block hover:text-yellow-400">📝 Truck Transaction</span>
// //                       </NavLink>
// //                     )}
// //                     {canAccess('truckfind') && (
// //                       <NavLink to="/truckfind">
// //                         <span className="block hover:text-yellow-400">🔍 Truck Find</span>
// //                       </NavLink>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             )}

// //             {canAccess('gate') && (
// //               <div>
// //                 <NavLink to="/gate">
// //                   <span className="block hover:text-yellow-400">🚪 Gate Keeper</span>
// //                 </NavLink>
// //               </div>
// //             )}
// //             {canAccess('loader') && (
// //               <div>
// //                 <NavLink to="/loader">
// //                   <span className="block hover:text-yellow-400">📦 Loader</span>
// //                 </NavLink>
// //               </div>
// //             )}
// //       {(canAccess('reports') || canAccess('truckshedule')) && (
// //   <div>
// //     {canAccess('reports') && (
// //       <NavLink to="/reports">
// //         <span className="block hover:text-yellow-400">📊 Reports</span>
// //       </NavLink>
// //     )}

// //     {canAccess('truckshedule') && (
// //       <NavLink to="/truckshedule">
// //         <span className="block hover:text-yellow-400">🚛 Truck Schedule</span>
// //       </NavLink>
// //     )}
// //   </div>
// // )}

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

// // export default Navbar;////////////////////////////////




// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// function Navbar() {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [dispatcherOpen, setDispatcherOpen] = useState(false);
//   const [reportsOpen, setReportsOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [userRole, setUserRole] = useState(null);
//   const location = useLocation();

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
//     Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Admin: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
//     Dispatch: ['truck', 'truckfind', 'truckshedule'],
//     Report: ['reports', 'truckshedule'],
//     GateKeeper: ['gate'],
//     UserMaster: ['usermaster'],
//     UserRegister: ['userregister'],
//     Loader: ['loader'],
//   };

//   const canAccess = (route) => {
//     if (!userRole) return false;
//     const roles = userRole.split(',').map(r => r.trim());
//     return roles.some(role => roleAccess[role]?.includes(route));
//   };

//   const NavLink = ({ to, children }) => (
//     <Link to={to} className="no-underline">
//       {children}
//     </Link>
//   );

//   if (location.pathname === '/') return null;

//   return (
//     <nav className="bg-black shadow-xl">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           <div className="font-bold text-2xl text-white">Lemon Software Gate Pass</div>

//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
//             {/* Admin Master */}
//             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setAdminOpen(!adminOpen);
//                     setDispatcherOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Admin Master <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${adminOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('plantmaster') && (
//                     <NavLink to="/plantmaster">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🏭 Plant Master</span>
//                     </NavLink>
//                   )}
//                   {canAccess('usermaster') && (
//                     <NavLink to="/usermaster">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">👤 User Master</span>
//                     </NavLink>
//                   )}
//                   {canAccess('userregister') && (
//                     <NavLink to="/userregister">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">📝 User Register</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Dispatcher */}
//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setDispatcherOpen(!dispatcherOpen);
//                     setAdminOpen(false);
//                     setReportsOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   Dispatcher <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${dispatcherOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('truck') && (
//                     <NavLink to="/truck">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Transaction</span>
//                     </NavLink>
//                   )}
//                   {canAccess('truckfind') && (
//                     <NavLink to="/truckfind">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🔍 Truck Find</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Gate */}
//             {canAccess('gate') && (
//               <NavLink to="/gate">
//                 <span className="text-white hover:text-yellow-400 flex items-center">🚪 Gate Keeper</span>
//               </NavLink>
//             )}

//             {/* Loader */}
//             {canAccess('loader') && (
//               <NavLink to="/loader">
//                 <span className="text-white hover:text-yellow-400 flex items-center">📦 Loader</span>
//               </NavLink>
//             )}

//             {/* Reports */}
//             {(canAccess('reports') || canAccess('truckshedule')) && (
//               <div className="relative group">
//                 <button
//                   onClick={() => {
//                     setReportsOpen(!reportsOpen);
//                     setAdminOpen(false);
//                     setDispatcherOpen(false);
//                   }}
//                   className="hover:text-yellow-400 flex items-center"
//                 >
//                   📊 Reports <span className="ml-1 text-sm">▼</span>
//                 </button>
//                 <div className={`absolute top-full left-0 mt-2 w-56 bg-black rounded shadow-lg z-50 ${reportsOpen ? 'block' : 'hidden'}`}>
//                   {canAccess('reports') && (
//                     <NavLink to="/reports">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">📈 Reports</span>
//                     </NavLink>
//                   )}
//                   {canAccess('truckshedule') && (
//                     <NavLink to="/truckshedule">
//                       <span className="block px-4 py-2 text-white hover:bg-blue-600">🚛 Truck Schedule</span>
//                     </NavLink>
//                   )}
//                 </div>
//               </div>
//             )}

//             {/* Logout */}
//             <button
//               onClick={handleLogout}
//               className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg border border-red-700 transition duration-300 hover:scale-105"
//             >
//               🔓 Logout
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mt-2 space-y-4 bg-gray-800 p-6 rounded-xl shadow-2xl text-white font-medium z-50 border border-gray-700">
//             {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
//               <div>
//                 <span className="font-bold">👨‍💼 Admin</span>
//                 {canAccess('plantmaster') && (
//                   <NavLink to="/plantmaster"><span className="block hover:text-yellow-400">🏭 Plant Master</span></NavLink>
//                 )}
//                 {canAccess('usermaster') && (
//                   <NavLink to="/usermaster"><span className="block hover:text-yellow-400">👤 User Master</span></NavLink>
//                 )}
//                 {canAccess('userregister') && (
//                   <NavLink to="/userregister"><span className="block hover:text-yellow-400">📝 User Register</span></NavLink>
//                 )}
//               </div>
//             )}

//             {(canAccess('truck') || canAccess('truckfind')) && (
//               <div>
//                 <span className="font-bold">🚛 Dispatcher</span>
//                 {canAccess('truck') && (
//                   <NavLink to="/truck"><span className="block hover:text-yellow-400">📝 Truck Transaction</span></NavLink>
//                 )}
//                 {canAccess('truckfind') && (
//                   <NavLink to="/truckfind"><span className="block hover:text-yellow-400">🔍 Truck Find</span></NavLink>
//                 )}
//               </div>
//             )}

//             {canAccess('gate') && (
//               <NavLink to="/gate"><span className="block hover:text-yellow-400">🚪 Gate Keeper</span></NavLink>
//             )}
//             {canAccess('loader') && (
//               <NavLink to="/loader"><span className="block hover:text-yellow-400">📦 Loader</span></NavLink>
//             )}

//             {(canAccess('reports') || canAccess('truckshedule')) && (
//               <div>
//                 <span className="font-bold">📊 Reports</span>
//                 {canAccess('reports') && (
//                   <NavLink to="/reports"><span className="block hover:text-yellow-400">📈 Reports</span></NavLink>
//                 )}
//                 {canAccess('truckshedule') && (
//                   <NavLink to="/truckshedule"><span className="block hover:text-yellow-400">🚛 Truck Schedule</span></NavLink>
//                 )}
//               </div>
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

// export default Navbar;///////////////////////////////////full working navbar//////////////
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

function Navbar() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [dispatcherOpen, setDispatcherOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
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
    Owner: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
    Admin: ['plantmaster', 'usermaster', 'userregister', 'truck', 'gate', 'loader', 'reports', 'truckfind', 'truckshedule'],
    Dispatch: ['truck', 'truckfind', 'truckshedule'],
    Report: ['reports', 'truckshedule'],
    GateKeeper: ['gate'],
    UserMaster: ['usermaster'],
    UserRegister: ['userregister'],
    Loader: ['loader'],
  };

  const canAccess = (route) => {
    if (!userRole) return false;
    const roles = userRole.split(',').map(r => r.trim());
    return roles.some(role => roleAccess[role]?.includes(route));
  };

  const NavLink = ({ to, children }) => (
    <Link to={to} className="no-underline">
      {children}
    </Link>
  );

  if (location.pathname === '/') return null;

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold">🚪 Lemon Gate Pass</div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-yellow-400 text-3xl transition-transform duration-300"
            >
              ☰
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center font-medium">
            {/* Admin */}
            {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
              <div className="relative group">
                <button
                  onClick={() => {
                    setAdminOpen(!adminOpen);
                    setDispatcherOpen(false);
                    setReportsOpen(false);
                  }}
                  className="hover:text-yellow-400 flex items-center"
                >
                  Admin Master <span className="ml-1">▼</span>
                </button>
                <div className={`absolute bg-gray-900 mt-2 rounded-lg overflow-hidden shadow-xl transition-all duration-200 ${adminOpen ? 'block' : 'hidden'}`}>
                  {canAccess('plantmaster') && (
                    <NavLink to="/plantmaster">
                      <div className="px-4 py-2 hover:bg-blue-600">🏭 Plant Master</div>
                    </NavLink>
                  )}
                  {canAccess('usermaster') && (
                    <NavLink to="/usermaster">
                      <div className="px-4 py-2 hover:bg-blue-600">👤 User Master</div>
                    </NavLink>
                  )}
                  {canAccess('userregister') && (
                    <NavLink to="/userregister">
                      <div className="px-4 py-2 hover:bg-blue-600">📝 User Register</div>
                    </NavLink>
                  )}
                </div>
              </div>
            )}

            {/* Dispatcher */}
            {(canAccess('truck') || canAccess('truckfind')) && (
              <div className="relative group">
                <button
                  onClick={() => {
                    setDispatcherOpen(!dispatcherOpen);
                    setAdminOpen(false);
                    setReportsOpen(false);
                  }}
                  className="hover:text-yellow-400 flex items-center"
                >
                  Dispatcher <span className="ml-1">▼</span>
                </button>
                <div className={`absolute bg-gray-900 mt-2 rounded-lg overflow-hidden shadow-xl transition-all duration-200 ${dispatcherOpen ? 'block' : 'hidden'}`}>
                  {canAccess('truck') && (
                    <NavLink to="/truck">
                      <div className="px-4 py-2 hover:bg-blue-600">🚛 Truck Transaction</div>
                    </NavLink>
                  )}
                  {canAccess('truckfind') && (
                    <NavLink to="/truckfind">
                      <div className="px-4 py-2 hover:bg-blue-600">🔍 Truck Find</div>
                    </NavLink>
                  )}
                </div>
              </div>
            )}

            {/* Gate */}
            {canAccess('gate') && (
              <NavLink to="/gate">
                <span className="hover:text-yellow-400">🚪 Gate Keeper</span>
              </NavLink>
            )}

            {/* Loader */}
            {canAccess('loader') && (
              <NavLink to="/loader">
                <span className="hover:text-yellow-400">📦 Loader</span>
              </NavLink>
            )}

            {/* Reports */}
            {(canAccess('reports') || canAccess('truckshedule')) && (
              <div className="relative group">
                <button
                  onClick={() => {
                    setReportsOpen(!reportsOpen);
                    setAdminOpen(false);
                    setDispatcherOpen(false);
                  }}
                  className="hover:text-yellow-400 flex items-center"
                >
                  Reports <span className="ml-1">▼</span>
                </button>
                <div className={`absolute bg-gray-900 mt-2 rounded-lg overflow-hidden shadow-xl transition-all duration-200 ${reportsOpen ? 'block' : 'hidden'}`}>
                  {canAccess('reports') && (
                    <NavLink to="/reports">
                      <div className="px-4 py-2 hover:bg-blue-600">📈 Reports</div>
                    </NavLink>
                  )}
                  {canAccess('truckshedule') && (
                    <NavLink to="/truckshedule">
                      <div className="px-4 py-2 hover:bg-blue-600">🚛 Truck Schedule</div>
                    </NavLink>
                  )}
                </div>
              </div>
            )}

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105"
            >
              🔓 Logout
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 bg-gray-800 p-4 rounded-lg text-white">
            {/* Admin */}
            {(canAccess('plantmaster') || canAccess('usermaster') || canAccess('userregister')) && (
              <div>
                <p className="font-semibold">👨‍💼 Admin</p>
                {canAccess('plantmaster') && (
                  <NavLink to="/plantmaster"><div className="pl-2 py-1 hover:text-yellow-400">🏭 Plant Master</div></NavLink>
                )}
                {canAccess('usermaster') && (
                  <NavLink to="/usermaster"><div className="pl-2 py-1 hover:text-yellow-400">👤 User Master</div></NavLink>
                )}
                {canAccess('userregister') && (
                  <NavLink to="/userregister"><div className="pl-2 py-1 hover:text-yellow-400">📝 User Register</div></NavLink>
                )}
              </div>
            )}

            {/* Dispatcher */}
            {(canAccess('truck') || canAccess('truckfind')) && (
              <div>
                <p className="font-semibold">🚛 Dispatcher</p>
                {canAccess('truck') && (
                  <NavLink to="/truck"><div className="pl-2 py-1 hover:text-yellow-400">Truck Transaction</div></NavLink>
                )}
                {canAccess('truckfind') && (
                  <NavLink to="/truckfind"><div className="pl-2 py-1 hover:text-yellow-400">Truck Find</div></NavLink>
                )}
              </div>
            )}

            {canAccess('gate') && (
              <NavLink to="/gate"><div className="hover:text-yellow-400">🚪 Gate Keeper</div></NavLink>
            )}

            {canAccess('loader') && (
              <NavLink to="/loader"><div className="hover:text-yellow-400">📦 Loader</div></NavLink>
            )}

            {(canAccess('reports') || canAccess('truckshedule')) && (
              <div>
                <p className="font-semibold">📊 Reports</p>
                {canAccess('reports') && (
                  <NavLink to="/reports"><div className="pl-2 py-1 hover:text-yellow-400">📈 Reports</div></NavLink>
                )}
                {canAccess('truckshedule') && (
                  <NavLink to="/truckshedule"><div className="pl-2 py-1 hover:text-yellow-400">Truck Schedule</div></NavLink>
                )}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg mt-4"
            >
              🔓 Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

