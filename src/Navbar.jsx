
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

// import { useState, useEffect } from 'react';
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
//     Dispatch: ['truck', 'truckfind'],
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
//           <div className="flex items-center space-x-3 text-white font-bold text-xl">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/4/48/Emoji_u1f34b.svg"
//               alt="Lemon Logo"
//               className="w-8 h-8"
//             />
//             <span>Lemon ERP</span>
//           </div>

//           <div className="md:hidden">
//             {/* <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-white hover:text-yellow-400 text-2xl transition-all duration-300 hover:scale-110"
//             >
//               ☰
//             </button> */}
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-8 items-center font-medium text-white">
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

//             {canAccess('gate') && (
//               <NavLink to="/gate">
//                 <span className="text-white hover:text-yellow-400 flex items-center">🚪 Gate Keeper</span>
//               </NavLink>
//             )}

//             {canAccess('loader') && (
//               <NavLink to="/loader">
//                 <span className="text-white hover:text-yellow-400 flex items-center">📦 Loader</span>
//               </NavLink>
//             )}

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

//             <button
//               onClick={handleLogout}
//               className="ml-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg border border-red-700 transition duration-300 hover:scale-105"
//             >
//               🔓 Logout
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Panel Style */}
//         {mobileMenuOpen && (
//           <div className="md:hidden mt-4 grid grid-cols-2 gap-4 bg-gray-900 p-4 rounded-xl shadow-2xl text-white font-medium">

//             {canAccess('plantmaster') && (
//               <NavLink to="/plantmaster">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🏭 <span className="mt-2">Plant Master</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('usermaster') && (
//               <NavLink to="/usermaster">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   👤 <span className="mt-2">User Master</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('userregister') && (
//               <NavLink to="/userregister">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   📝 <span className="mt-2">User Register</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truck') && (
//               <NavLink to="/truck">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🚛 <span className="mt-2">Truck Transaction</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truckfind') && (
//               <NavLink to="/truckfind">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🔍 <span className="mt-2">Truck Find</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('gate') && (
//               <NavLink to="/gate">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🚪 <span className="mt-2">Gate Keeper</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('loader') && (
//               <NavLink to="/loader">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   📦 <span className="mt-2">Loader</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('reports') && (
//               <NavLink to="/reports">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   📈 <span className="mt-2">Reports</span>
//                 </div>
//               </NavLink>
//             )}
//             {canAccess('truckshedule') && (
//               <NavLink to="/truckshedule">
//                 <div className="bg-gray-800 hover:bg-blue-600 p-4 rounded-xl flex flex-col items-center justify-center shadow-lg">
//                   🚛 <span className="mt-2">Truck Schedule</span>
//                 </div>
//               </NavLink>
//             )}

//             <button
//               onClick={handleLogout}
//               className="col-span-2 mt-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl shadow-lg"
//             >
//               🔓 Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// export default Navbar;




import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiTruck, 
  FiUsers, 
  FiPieChart,
  FiLogOut,
  FiChevronDown,
  FiMenu,
  FiX,
  FiSettings,
  FiClock
} from 'react-icons/fi';
import { 
  MdOutlineWarehouse,
  MdOutlineSchedule
} from 'react-icons/md';
import { 
  BsShieldLock,
  BsBoxSeam
} from 'react-icons/bs';

// Role access mapping matching your App.js
const roleAccess = {
  owner: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff', 'userregister', 'truckshedule','truckfind'],
  admin: ['plantmaster', 'usermaster', 'truck', 'gate', 'loader', 'reports', 'staff', 'userregister', 'truckshedule','truckfind'],
  dispatch: ['truck', 'truckfind'],
  gatekeeper: ['gate'],
  plantmaster: ['plantmaster'],
  usermaster: ['usermaster'],
  userregister: ['userregister'],
  report: ['reports', 'truckshedule'],
  loader: ['loader'],
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // const hasModuleAccess = (module) => {
  //   if (!userRole) return false;
    
  //   const roles = userRole.split(',').map(r => r.trim().toLowerCase());
  //   const moduleKey = module.toLowerCase();

  //   // Admin and owner have full access
  //   if (roles.includes('admin') || roles.includes('owner')) {
  //     return true;
  //   }

  //   // Check against roleAccess mapping
  //   return roles.some(role => {
  //     const accessibleModules = roleAccess[role] || [];
  //     return accessibleModules.includes(moduleKey);
  //   });
  // };


  const hasModuleAccess = (module) => {
  if (!userRole) return false;
  const roles = userRole.split(',').map(r => r.trim().toLowerCase());
  const moduleKey = module.toLowerCase();

  // Admin and owner have full access
  if (roles.includes('admin') || roles.includes('owner')) {
    return true;
  }

  // Check roleAccess map
  return roles.some(role => {
    const accessibleModules = roleAccess[role] || [];
    return accessibleModules.includes(moduleKey);
  });
};


  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <FiHome className="flex-shrink-0" size={18} />,
      show: () => userRole && userRole.length > 0
    },
    {
      title: "Admin",
      icon: <FiSettings className="flex-shrink-0" size={18} />,
      show: () => hasModuleAccess('plantmaster') || hasModuleAccess('usermaster') || hasModuleAccess('userregister'),
      subItems: [
        { 
          title: "Plant Master", 
          path: "/plantmaster", 
          icon: <MdOutlineWarehouse size={16} />,
          show: () => hasModuleAccess('plantmaster')
        },
        { 
          title: "User Master", 
          path: "/usermaster", 
          icon: <FiUsers size={16} />,
          show: () => hasModuleAccess('usermaster')
        },
        { 
          title: "User Register", 
          path: "/userregister", 
          icon: <BsShieldLock size={16} />,
          show: () => hasModuleAccess('userregister')
        }
      ].filter(item => item.show())
    },
    {
      title: "Dispatch",
      icon: <FiTruck className="flex-shrink-0" size={18} />,
      show: () => hasModuleAccess('truck') || hasModuleAccess('truckfind'),
      subItems: [
        { 
          title: "Truck Transaction", 
          path: "/truck", 
          icon: <FiTruck size={16} />,
          show: () => hasModuleAccess('truck')
        },
        { 
          title: "Truck Locator", 
          path: "/truckfind", 
          icon: <FiClock size={16} />,
          show: () => hasModuleAccess('truckfind')
        }
      ].filter(item => item.show())
    },
    {
      title: "Gate Keeper",
      path: "/gate",
      icon: <MdOutlineWarehouse className="flex-shrink-0" size={18} />,
      show: () => hasModuleAccess('gate')
    },
    {
      title: "Loading",
      path: "/loader",
      icon: <BsBoxSeam className="flex-shrink-0" size={18} />,
      show: () => hasModuleAccess('loader')
    },
    {
      title: "Reports",
      icon: <FiPieChart className="flex-shrink-0" size={18} />,
      show: () => hasModuleAccess('reports') || hasModuleAccess('truckshedule'),
      subItems: [
        { 
          title: "General Report", 
          path: "/reports", 
          icon: <FiPieChart size={16} />,
          show: () => hasModuleAccess('reports')
        },
        { 
          title: "Truck Schedule", 
          path: "/truckshedule", 
          icon: <MdOutlineSchedule size={16} />,
          show: () => hasModuleAccess('truckshedule')
        }
      ].filter(item => item.show())
    }
  ].filter(item => item.show());

  if (location.pathname === '/') return null;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-16 items-center">
            <Link to="/dashboard" className="flex items-center min-w-max">
              <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white shadow-sm">
                <FiTruck className="h-5 w-5" />
              </div>
              <span className="ml-3 text-xl font-semibold text-gray-800">Lemon Logistics</span>
            </Link>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                {menuItems.map((item, index) => (
                  <div key={index} className="relative h-full">
                    {item.path ? (
                      <Link
                        to={item.path}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          location.pathname === item.path 
                            ? 'text-blue-700 bg-blue-50 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        style={{ textDecoration: 'none' }}
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.title}
                      </Link>
                    ) : (
                      <div className="h-full">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveDropdown(activeDropdown === index ? null : index);
                          }}
                          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            activeDropdown === index || (item.subItems && item.subItems.some(subItem => location.pathname === subItem.path))
                              ? 'text-blue-700 bg-blue-50 font-medium' 
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                          style={{ textDecoration: 'none' }}
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.title}
                          {item.subItems && item.subItems.length > 0 && (
                            <FiChevronDown 
                              className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                                activeDropdown === index ? 'rotate-180' : ''
                              }`} 
                            />
                          )}
                        </button>

                        {activeDropdown === index && item.subItems && item.subItems.length > 0 && (
                          <div 
                            className="absolute right-0 mt-1 w-56 bg-white rounded-lg shadow-lg ring-1 ring-gray-200 py-1 z-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {item.subItems.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.path}
                                onClick={() => setActiveDropdown(null)}
                                className={`flex items-center px-4 py-2.5 text-sm transition-colors ${
                                  location.pathname === subItem.path
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                                style={{ textDecoration: 'none' }}
                              >
                                <span className="mr-3 text-gray-500">{subItem.icon}</span>
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors min-w-max"
                style={{ textDecoration: 'none' }}
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="px-4">
          <div className="flex justify-between h-16 items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white shadow-sm">
                <FiTruck className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold text-gray-800 tracking-tight">Lemon ERP</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className={`fixed inset-0 z-40 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <div className="relative flex flex-col w-80 max-w-sm h-full bg-white shadow-xl">

            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
              <div className="text-xl font-semibold text-gray-800">Menu</div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {menuItems.map((item, index) => (
                <div key={index} className="px-2">
                  {item.path ? (
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center px-4 py-3 rounded-lg mx-2 text-base font-medium ${
                        location.pathname === item.path 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="mr-3">{item.icon}</span>
                      {item.title}
                    </Link>
                  ) : (
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdown(activeDropdown === index ? null : index);
                        }}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg mx-2 text-base font-medium ${
                          activeDropdown === index || (item.subItems && item.subItems.some(subItem => location.pathname === subItem.path))
                            ? 'bg-blue-50 text-blue-700' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        style={{ textDecoration: 'none' }}
                      >
                        <div className="flex items-center">
                          <span className="mr-3">{item.icon}</span>
                          {item.title}
                        </div>
                        {item.subItems && item.subItems.length > 0 && (
                          <FiChevronDown 
                            className={`h-5 w-5 transition-transform ${
                              activeDropdown === index ? 'rotate-180' : ''
                            }`} 
                          />
                        )}
                      </button>

                      <div 
                        className={`overflow-hidden transition-all duration-300 ${
                          activeDropdown === index ? 'max-h-96' : 'max-h-0'
                        }`}
                      >
                        {item.subItems && item.subItems.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                            className={`flex items-center pl-12 pr-4 py-2.5 text-base ${
                              location.pathname === subItem.path 
                                ? 'bg-blue-100 text-blue-700 font-medium' 
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            style={{ textDecoration: 'none' }}
                          >
                            <span className="mr-3">{subItem.icon}</span>
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Logout Button */}
            <div className="px-4 py-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-gray-50 text-red-600 hover:bg-red-50 font-medium"
                style={{ textDecoration: 'none' }}
              >
                <FiLogOut className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
