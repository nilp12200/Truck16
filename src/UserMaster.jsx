// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// const UserMaster = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: '',
//     plants: [],
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => {
//         console.error('Error fetching plants:', err);
//         toast.error('Failed to load plant list.');
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handlePlantSelect = (e) => {
//     const selected = Array.from(e.target.selectedOptions).map(option => option.value);
//     setFormData(prev => ({ ...prev, plants: selected }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.warn("Passwords do not match.");
//       return;
//     }

//     try {
//       await axios.post(`${API_URL}/api/users`, formData);
//       toast.success("User created successfully.");
//       setFormData({
//         fullName: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//         role: '',
//         plants: [],
//       });
//     } catch (err) {
//       console.error("Error creating user:", err);
//       toast.error("Failed to create user.");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-6">👤 User Master</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block font-medium">Full Name</label>
//           <input
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             type="text"
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Email</label>
//           <input
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             type="email"
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Password</label>
//           <input
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             type="password"
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Confirm Password</label>
//           <input
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             type="password"
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="w-full border px-4 py-2 rounded-md"
//             required
//           >
//             <option value="">Select Role</option>
//             <option value="admin">Admin</option>
//             <option value="staff">Staff</option>
//           </select>
//         </div>

//         {formData.role === 'staff' && (
//           <div>
//             <label className="block font-medium">Select Plants (for Staff)</label>
//             <select
//               multiple
//               name="plants"
//               value={formData.plants}
//               onChange={handlePlantSelect}
//               className="w-full border px-4 py-2 rounded-md h-40"
//             >
//               {plantList.map((plant, i) => (
//                 <option key={i} value={plant.plantname || plant.PlantName}>
//                   {plant.plantname || plant.PlantName}
//                 </option>
//               ))}
//             </select>
//             <p className="text-xs text-gray-500 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple.</p>
//           </div>
//         )}

//         <div className="flex justify-between pt-4">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Save User
//           </button>
//           <button
//             type="button"
//             onClick={() => setFormData({
//               fullName: '',
//               email: '',
//               password: '',
//               confirmPassword: '',
//               role: '',
//               plants: [],
//             })}
//             className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//           >
//             Reset
//           </button>
//         </div>
//       </form>

//       <ToastContainer position="top-center" autoClose={3000} />
//     </div>
//   );
// };

// export default UserMaster;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// const UserMaster = () => {
//   const [formData, setFormData] = useState({
//     employeeName: '',
//     loginName: '',
//     password: '',
//     confirmPassword: '',
//     modules: {
//       admin: false,
//       gatekeeper: false,
//       report: false,
//       dispatch: false,
//       loader: false
//     },
//     divisions: [],
//     timingFrom: '',
//     timingTo: '',
//     contactNo: ''
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => {
//         console.error('Error fetching plants:', err);
//         toast.error('Failed to load plant list.');
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleModuleChange = (e) => {
//     const { name, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       modules: { ...prev.modules, [name]: checked }
//     }));
//   };

//   const handleDivisionSelect = (e) => {
//     const selected = Array.from(e.target.selectedOptions).map(option => option.value);
//     setFormData(prev => ({ ...prev, divisions: selected }));
//   };

//   const resetForm = () => {
//     setFormData({
//       employeeName: '',
//       loginName: '',
//       password: '',
//       confirmPassword: '',
//       modules: {
//         admin: false,
//         gatekeeper: false,
//         report: false,
//         dispatch: false,
//         loader: false
//       },
//       divisions: [],
//       timingFrom: '',
//       timingTo: '',
//       contactNo: ''
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.warn("Passwords do not match.");
//       return;
//     }

//     try {
//       const payload = {
//         employeeName: formData.employeeName,
//         loginName: formData.loginName,
//         password: formData.password,
//         modules: Object.keys(formData.modules).filter(key => formData.modules[key]),
//         divisions: formData.divisions,
//         timingFrom: formData.timingFrom,
//         timingTo: formData.timingTo,
//         contactNo: formData.contactNo
//       };

//       await axios.post(`${API_URL}/api/users`, payload);
//       toast.success("User created successfully.");
//       resetForm();
//     } catch (err) {
//       console.error("Error creating user:", err);
//       toast.error("Failed to create user.");
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-center mb-6">👤 User Master</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">Employee Name</label>
//             <input name="employeeName" value={formData.employeeName} onChange={handleChange} type="text" className="w-full border px-4 py-2 rounded-md" required />
//           </div>

//           <div>
//             <label className="block font-medium">Login Name</label>
//             <input name="loginName" value={formData.loginName} onChange={handleChange} type="text" className="w-full border px-4 py-2 rounded-md" required />
//           </div>

//           <div>
//             <label className="block font-medium">Password</label>
//             <input name="password" value={formData.password} onChange={handleChange} type="password" className="w-full border px-4 py-2 rounded-md" required />
//           </div>

//           <div>
//             <label className="block font-medium">Confirm Password</label>
//             <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type="password" className="w-full border px-4 py-2 rounded-md" required />
//           </div>
//         </div>

//         <div>
//           <label className="block font-medium">Module Rights</label>
//           <div className="flex gap-4 flex-wrap">
//             {['admin', 'gatekeeper', 'report', 'dispatch', 'loader'].map(module => (
//               <label key={module} className="capitalize">
//                 <input type="checkbox" name={module} checked={formData.modules[module]} onChange={handleModuleChange} className="mr-1" />
//                 {module}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div>
//           <label className="block font-medium">Division Allowed</label>
//           <select multiple name="divisions" value={formData.divisions} onChange={handleDivisionSelect} className="w-full border px-4 py-2 rounded-md h-40">
//             {plantList.map((plant, i) => (
//               <option key={i} value={plant.plantname || plant.PlantName}>
//                 {plant.plantname || plant.PlantName}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block font-medium">User Timing (From)</label>
//             <input type="time" name="timingFrom" value={formData.timingFrom} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" />
//           </div>

//           <div>
//             <label className="block font-medium">User Timing (To)</label>
//             <input type="time" name="timingTo" value={formData.timingTo} onChange={handleChange} className="w-full border px-4 py-2 rounded-md" />
//           </div>
//         </div>

//         <div>
//           <label className="block font-medium">Contact No.</label>
//           <input name="contactNo" value={formData.contactNo} onChange={handleChange} type="text" className="w-full border px-4 py-2 rounded-md" />
//         </div>

//         <div className="flex justify-between pt-4">
//           <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save User</button>
//           <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">Reset</button>
//         </div>
//       </form>

//       <ToastContainer position="top-center" autoClose={3000} />
//     </div>
//   );
// };

// export default UserMaster;




//////////////////////////////////////////////////////////////





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const MODULE_RIGHTS = [
//   { label: 'Admin', value: 'admin' },
//   { label: 'GateKeeper', value: 'gatekeeper' },
//   { label: 'Report', value: 'report' },
//   { label: 'Dispatch', value: 'dispatch' },
//   { label: 'Loader', value: 'loader' },
// ];

// export default function UserMaster() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });
//   const [plantList, setPlantList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get('http://localhost:3001/api/plants');
//       setPlantList(res.data);
//     } catch {
//       console.error('Error fetching plant list');
//     }
//   };
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleModuleRightChange = (e) => {
//     const { value, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       moduleRights: checked
//         ? [...prev.moduleRights, value]
//         : prev.moduleRights.filter((v) => v !== value),
//     }));
//   };

//   const handlePlantChange = (e) => {
//     const value = Number(e.target.value);
//     const checked = e.target.checked;
//     setFormData((prev) => ({
//       ...prev,
//       allowedPlants: checked
//         ? [...prev.allowedPlants, value]
//         : prev.allowedPlants.filter((v) => v !== value),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     // Validation: At least one plant must be selected
//     if (formData.allowedPlants.length === 0) {
//       setMessage('❌ Please select at least one allowed plant.');
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post('http://localhost:3001/api/users', formData);
//       setMessage('✅ User created successfully!');
//       setFormData({ username: '', password: '', contactNumber: '', moduleRights: [], allowedPlants: [] });
//     } catch {
//       setMessage('❌ Error creating user');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 p-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-2xl transform transition-all duration-300 hover:shadow-3xl">
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
//           User Master
//         </h2>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-xl border-2 border-gray-200 shadow-sm p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-xl border-2 border-gray-200 shadow-sm p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-xl border-2 border-gray-200 shadow-sm p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Module Rights</label>
//             <div className="flex flex-wrap gap-4">
//               {MODULE_RIGHTS.map((right) => (
//                 <label key={right.value} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     value={right.value}
//                     checked={formData.moduleRights.includes(right.value)}
//                     onChange={handleModuleRightChange}
//                   />
//                   {right.label}
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">Allowed Plants</label>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border rounded-xl p-2">
//               {[...new Map(plantList.map(plant => [plant.PlantID, plant])).values()].map((plant) => (
//                 <label key={plant.PlantID}>
//                   <input
//                     type="checkbox"
//                     value={plant.PlantID}
//                     checked={formData.allowedPlants.includes(plant.PlantID)}
//                     onChange={handlePlantChange}
//                   />
//                   {plant.PlantName}
//                 </label>
//               ))}
//             </div>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
//             disabled={loading || formData.allowedPlants.length === 0}
//           >
//             {loading ? 'Saving...' : 'Create User'}
//           </button>
//           {message && <div className="text-center mt-4 font-semibold text-blue-700">{message}</div>}
//         </form>
//       </div>
//     </div>
//   );
// }

////////////////////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlant: ''
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching plants:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(`${API_URL}/api/usermaster`, formData);
//       alert('✅ User created successfully!');
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlant: ''
//       });
//     } catch (err) {
//       console.error('❌ Error creating user:', err);
//       alert('Failed to create user.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">👤 User Master</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full border p-2 rounded bg-blue-50"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border p-2 rounded bg-blue-50"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Module Rights</label>
//             <div className="flex flex-wrap gap-2">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader'].map((right) => (
//                 <label key={right} className="flex items-center gap-1">
//                   <input
//                     type="checkbox"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                   />
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>
//           <div>
//             <label className="block mb-1 font-medium">Allowed Plants</label>
//             <select
//               name="allowedPlant"
//               value={formData.allowedPlant}
//               onChange={handleChange}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">-- Select Plant --</option>
//               {plantList.map((plant) => (
//                 <option key={plant.plantid || plant.plantId} value={plant.plantid || plant.plantId}>
//                   {plant.plantname || plant.plantName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//           >
//             Create User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

/////////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [], // now an array
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching plants:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/api/usermaster`, formData);
//       alert('✅ User created successfully!');
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('❌ Error creating user:', err);
//       alert('Failed to create user.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl">
//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center gap-2">
//           <span className="text-4xl">👤</span> User Master
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Username */}
//           <div>
//             <label className="block mb-1 font-semibold">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block mb-1 font-semibold">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           {/* Contact */}
//           <div>
//             <label className="block mb-1 font-semibold">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring"
//             />
//           </div>

//           {/* Module Rights */}
//           <div>
//             <label className="block mb-1 font-semibold">Module Rights</label>
//             <div className="flex flex-wrap gap-3">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader'].map((right) => (
//                 <label key={right} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="accent-blue-600"
//                   />
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Allowed Plants */}
//           <div>
//             <label className="block mb-1 font-semibold">Allowed Plants</label>
//             <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto border p-3 rounded bg-blue-50">
//               {plantList.map((plant) => (
//                 <label key={plant.plantid || plant.plantId} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     name="allowedPlants"
//                     value={plant.plantid || plant.plantId}
//                     checked={formData.allowedPlants.includes(plant.plantid || plant.plantId)}
//                     onChange={handleChange}
//                     className="accent-green-600"
//                   />
//                   {plant.plantname || plant.plantName}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//           >
//             Create User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




////////////////////////////


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching plants:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/api/usermaster`, formData);
//       alert('✅ User created successfully!');
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('❌ Error creating user:', err);
//       alert('Failed to create user.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-2">
//           <span className="text-4xl">👤</span> User Master
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block mb-1 font-semibold">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Module Rights</label>
//             <div className="flex flex-wrap gap-3">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader'].map((right) => (
//                 <label key={right} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="accent-blue-600"
//                   />
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Allowed Plants</label>
//             <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto border p-3 rounded bg-blue-50">
//               {plantList.map((plant) => (
//                 <label key={plant.plantid || plant.plantId} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     name="allowedPlants"
//                     value={plant.plantid || plant.plantId}
//                     checked={formData.allowedPlants.includes(plant.plantid || plant.plantId)}
//                     onChange={handleChange}
//                     className="accent-green-600"
//                   />
//                   {plant.plantname || plant.plantName}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//           >
//             Create User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

/////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching plants:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/api/usermaster`, formData);
//       alert('✅ User created successfully!');
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('❌ Error creating user:', err);
//       alert('Failed to create user.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-2">
//           <span className="text-4xl">👤</span> User Master
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block mb-1 font-semibold">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Module Rights</label>
//             <div className="flex flex-wrap gap-3">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader'].map((right) => (
//                 <label key={right} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="accent-blue-600"
//                   />
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Allowed Plants</label>
//             <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto border p-3 rounded bg-blue-50">
//               {plantList.map((plant) => {
//                 const plantId = String(plant.plantId || plant.plantid);
//                 return (
//                   <label key={plantId} className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       name="allowedPlants"
//                       value={plantId}
//                       checked={formData.allowedPlants.includes(plantId)}
//                       onChange={handleChange}
//                       className="accent-green-600"
//                     />
//                     {plant.plantName || plant.plantname}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//           >
//             Create User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching plants:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/api/usermaster`, formData);
//       alert('✅ User created successfully!');
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('❌ Error creating user:', err);
//       alert('Failed to create user.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl relative">
//         {/* Close Button */}
//         <button
//           onClick={() => navigate('/home')}
//           className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:scale-110 shadow-lg z-10"
//           title="Close"
//         >
//           ✕
//         </button>
        
//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-2">
//           <span className="text-4xl">👤</span> User Master
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block mb-1 font-semibold">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Module Rights</label>
//             <div className="flex flex-wrap gap-3">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader'].map((right) => (
//                 <label key={right} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="accent-blue-600"
//                   />
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Allowed Plants</label>
//             <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto border p-3 rounded bg-blue-50">
//               {plantList.map((plant) => {
//                 const plantId = String(plant.plantId || plant.plantid);
//                 return (
//                   <label key={plantId} className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       name="allowedPlants"
//                       value={plantId}
//                       checked={formData.allowedPlants.includes(plantId)}
//                       onChange={handleChange}
//                       className="accent-green-600"
//                     />
//                     {plant.plantName || plant.plantname}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//           >
//             Create User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
///////////////////////////////////////////////finel

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching plants:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/api/users`, formData); // ✅ FIXED here
//       alert('✅ User created successfully!');
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('❌ Error creating user:', err);
//       alert('Failed to create user.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
//       <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-xl">
//         <button
//           onClick={() => navigate('/home')}
//           className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:scale-110 shadow-lg"
//           title="Close"
//         >
//           ✕
//         </button>
//         <h2 className="text-3xl font-bold text-center mb-6 text-blue-700 flex items-center justify-center gap-2">
//           <span className="text-4xl">👤</span> User Master
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label className="block mb-1 font-semibold">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full border border-blue-300 rounded px-3 py-2 focus:outline-none focus:ring"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Module Rights</label>
//             <div className="flex flex-wrap gap-3">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader'].map((right) => (
//                 <label key={right} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="accent-blue-600"
//                   />
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label className="block mb-1 font-semibold">Allowed Plants</label>
//             <div className="grid grid-cols-2 gap-3 max-h-40 overflow-y-auto border p-3 rounded bg-blue-50">
//               {plantList.map((plant) => {
//                 const plantId = String(plant.plantId || plant.plantid);
//                 return (
//                   <label key={plantId} className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       name="allowedPlants"
//                       value={plantId}
//                       checked={formData.allowedPlants.includes(plantId)}
//                       onChange={handleChange}
//                       className="accent-green-600"
//                     />
//                     {plant.plantName || plant.plantname}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
//           >
//             Create User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
/////////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function UserMaster() {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     contactNumber: '',
//     moduleRights: [],
//     allowedPlants: [],
//   });

//   const [plantList, setPlantList] = useState([]);

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlantList(res.data);
//     } catch (err) {
//       console.error('❌ Error fetching plants:', err);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === 'checkbox' && name === 'moduleRights') {
//       setFormData((prev) => ({
//         ...prev,
//         moduleRights: checked
//           ? [...prev.moduleRights, value]
//           : prev.moduleRights.filter((right) => right !== value),
//       }));
//     } else if (type === 'checkbox' && name === 'allowedPlants') {
//       setFormData((prev) => ({
//         ...prev,
//         allowedPlants: checked
//           ? [...prev.allowedPlants, value]
//           : prev.allowedPlants.filter((plant) => plant !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSelectAllPlants = () => {
//     const allPlantIds = plantList.map((plant) => String(plant.plantId || plant.plantid));
//     const isAllSelected = allPlantIds.every((id) => formData.allowedPlants.includes(id));

//     setFormData((prev) => ({
//       ...prev,
//       allowedPlants: isAllSelected ? [] : allPlantIds,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${API_URL}/api/users`, formData);
//       alert('✅ User created successfully!');
//       setFormData({
//         username: '',
//         password: '',
//         contactNumber: '',
//         moduleRights: [],
//         allowedPlants: [],
//       });
//     } catch (err) {
//       console.error('❌ Error creating user:', err);
//       alert('Failed to create user.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-50 p-4">
//       <div className="relative bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl border border-indigo-200">
//         <CancelButton />
//         <h2 className="text-4xl font-bold text-center mb-8 text-indigo-700 flex items-center justify-center gap-2">
//           <span className="text-5xl">👤</span> User Master
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-slate-700">Username</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               required
//               className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Username"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-slate-700">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Password"
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-semibold text-slate-700">Contact Number</label>
//             <input
//               type="text"
//               name="contactNumber"
//               value={formData.contactNumber}
//               onChange={handleChange}
//               className="w-full border border-indigo-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter Contact Number"
//             />
//           </div>

//           <div>
//             <label className="font-semibold text-slate-700 block mb-2">Module Rights</label>
//             <div className="flex flex-wrap gap-3">
//               {['Admin', 'GateKeeper', 'Report', 'Dispatch', 'Loader','UserMaster','UserRegister'].map((right) => (
//                 <label key={right} className="flex items-center gap-2 text-sm bg-indigo-50 px-3 py-1 rounded-full shadow">
//                   <input
//                     type="checkbox"
//                     name="moduleRights"
//                     value={right}
//                     checked={formData.moduleRights.includes(right)}
//                     onChange={handleChange}
//                     className="accent-indigo-600"
//                   />
//                   {right}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div>
//             <div className="flex justify-between items-center mb-2">
//               <label className="font-semibold text-slate-700">Allowed Plants</label>
//               <button
//                 type="button"
//                 onClick={handleSelectAllPlants}
//                 className="text-indigo-600 text-sm font-medium hover:underline"
//               >
//                 {formData.allowedPlants.length === plantList.length ? 'Deselect All' : 'Select All'}
//               </button>
//             </div>
//             <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-indigo-200 p-3 rounded-xl bg-indigo-50">
//               {plantList.map((plant) => {
//                 const plantId = String(plant.plantId || plant.plantid);
//                 return (
//                   <label key={plantId} className="flex items-center gap-2 text-sm">
//                     <input
//                       type="checkbox"
//                       name="allowedPlants"
//                       value={plantId}
//                       checked={formData.allowedPlants.includes(plantId)}
//                       onChange={handleChange}
//                       className="accent-green-600"
//                     />
//                     {plant.plantName || plant.plantname}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-transform transform hover:scale-105"
//           >
//             Create User
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUser, FiLock, FiPhone, FiX, FiCheck, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("UserMaster Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-red-500">
          Something went wrong. Please try again.
        </div>
      );
    }
    return this.props.children;
  }
}

export default function UserMaster({ onClose }) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    contactNumber: '',
    moduleRights: [],
    allowedPlants: [],
  });
  const [plantList, setPlantList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const loggedInUsername = localStorage.getItem('username');
  const loggedInRole = localStorage.getItem('userRole');

  // useEffect(() => {
  //   setMounted(true);
    
  //   if (!['Admin', 'Owner'].some(role => loggedInRole?.includes(role))) {
  //     toast.error('You are not authorized to create users');
  //     handleClose();
  //     return;
  //   }
    
  //   fetchPlants();
    
  //   return () => setMounted(false);
  // }, [loggedInRole]);


  useEffect(() => {
  setMounted(true);

  const roles = (loggedInRole || '').split(',').map(r => r.trim().toLowerCase());
  if (!roles.includes('admin') && !roles.includes('owner') && !roles.includes('usermaster')) {
    toast.error('You are not authorized to create users');
    handleClose();
    return;
  }

  fetchPlants();

  return () => setMounted(false);
}, [loggedInRole]);


  const fetchPlants = async () => {
    console.log('Fetching plants...');
    try {
      const res = await axios.get(`${API_URL}/api/plants`);
      console.log('Plants data:', res.data);
      setPlantList(res.data);
    } catch (err) {
      console.error('Error fetching plants:', err);
      toast.error('Failed to load plant list');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? checked
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
        : value
    }));
  };

  const handleSelectAllPlants = () => {
    const allPlantIds = plantList.map(plant => String(plant.plantId || plant.plantid));
    setFormData(prev => ({
      ...prev,
      allowedPlants: prev.allowedPlants.length === allPlantIds.length ? [] : allPlantIds
    }));
  };

  const handleClose = () => {
    onClose?.();
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${API_URL}/api/users`, {
        ...formData,
        createdBy: loggedInUsername
      });
      
      toast.success('User created successfully!');
      setFormData({
        username: '',
        password: '',
        contactNumber: '',
        moduleRights: [],
        allowedPlants: [],
      });
    } catch (err) {
      console.error('Error creating user:', err);
      toast.error(err.response?.data?.message || 'Failed to create user');
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
        <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-2xl border border-indigo-100">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-colors"
            aria-label="Close"
          >
            <FiX className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center mb-8">
            <div className="bg-indigo-100 p-3 rounded-full mb-4">
              <FiUser className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
              User Master Registration
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Logged in as: <span className="font-medium text-indigo-700">
                {loggedInUsername} ({loggedInRole})
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 text-sm">Username</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter username"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 text-sm">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-medium text-gray-700 text-sm">Contact Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter contact number"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-medium text-gray-700 text-sm block mb-2">Module Rights</label>
              <div className="flex flex-wrap gap-2">
                {['Admin', 'PlantMaster', 'GateKeeper', 'Report', 'Dispatch', 'Loader', 'UserMaster', 'UserRegister'].map((right) => (
                  <label 
                    key={right} 
                    className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg cursor-pointer transition-all ${
                      formData.moduleRights.includes(right)
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="moduleRights"
                      value={right}
                      checked={formData.moduleRights.includes(right)}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {formData.moduleRights.includes(right) ? <FiCheck className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
                    {right}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium text-gray-700 text-sm">Allowed Plants</label>
                <button
                  type="button"
                  onClick={handleSelectAllPlants}
                  className="text-indigo-600 text-xs font-medium hover:underline flex items-center gap-1"
                >
                  {formData.allowedPlants.length === plantList.length ? (
                    <>
                      <FiX className="w-3 h-3" /> Deselect All
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-3 h-3" /> Select All
                    </>
                  )}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2">
                {plantList.map((plant) => {
                  const plantId = String(plant.plantId || plant.plantid);
                  return (
                    <label 
                      key={plantId} 
                      className={`flex items-center gap-2 text-sm p-2 rounded-lg cursor-pointer transition-colors ${
                        formData.allowedPlants.includes(plantId)
                          ? 'bg-indigo-50 border border-indigo-200'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <div className={`w-4 h-4 border rounded-sm flex items-center justify-center ${
                        formData.allowedPlants.includes(plantId)
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'border-gray-300'
                      }`}>
                        {formData.allowedPlants.includes(plantId) && <FiCheck className="w-3 h-3" />}
                      </div>
                      <input
                        type="checkbox"
                        name="allowedPlants"
                        value={plantId}
                        checked={formData.allowedPlants.includes(plantId)}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {plant.plantName || plant.plantname}
                    </label>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-lg bg-indigo-600 px-4 py-3 text-white font-medium shadow-md transition-all ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-indigo-700 hover:shadow-lg'
              }`}
            >
              {isLoading ? 'Creating User...' : 'Create User'}
            </button>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
}
