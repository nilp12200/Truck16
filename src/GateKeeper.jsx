
// // GateKeeper.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));
//     }
//   }, [selectedPlant]);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const res = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: {
//           plantName: selectedPlant,
//           truckNo,
//         }
//       });

//       setFormData(prev => ({
//         ...prev,
//         remarks: res.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching remarks:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => t.TruckNo !== truckNo));

//       if (type === 'Check In' && !checkedInTrucks.includes(truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//     } catch (err) {
//       console.error('Error:', err);
//       if (err.response?.status === 400 && err.response.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error('⚠️ Error while updating status');
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={plant.PlantName}>{plant.PlantName}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(truck.TruckNo)}
//                   className="hover:text-blue-600"
//                 >
//                   {truck.TruckNo}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Form */}
//         <div className="col-span-1 space-y-4">
//           <img
//             src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//             alt="Truck"
//             className="w-full object-contain"
//           />

//           <div>
//             <label className="block font-semibold text-gray-700">Truck No.</label>
//             <input
//               name="truckNo"
//               value={formData.truckNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Enter Truck No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Dispatch Date</label>
//             <input
//               name="dispatchDate"
//               value={formData.dispatchDate}
//               onChange={handleChange}
//               type="date"
//               className="w-full border rounded px-4 py-2 shadow-sm"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Invoice Number</label>
//             <input
//               name="invoiceNo"
//               value={formData.invoiceNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Invoice No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Remarks</label>
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               readOnly
//               className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24"
//             />
//           </div>

//           <div className="flex justify-between mt-4">
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleCheckedInClick(truck.TruckNo)}
//                 >
//                   {truck.TruckNo}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));
//     }
//   }, [selectedPlant]);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const res = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: {
//           plantName: selectedPlant,
//           truckNo,
//         }
//       });

//       setFormData(prev => ({
//         ...prev,
//         remarks: res.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching remarks:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));

//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//     } catch (err) {
//       console.error('Error:', err);
//       if (err.response?.status === 400 && err.response.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error('⚠️ Error while updating status');
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Form */}
//         <div className="col-span-1 space-y-4">
//           <img
//             src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//             alt="Truck"
//             className="w-full object-contain"
//           />

//           <div>
//             <label className="block font-semibold text-gray-700">Truck No.</label>
//             <input
//               name="truckNo"
//               value={formData.truckNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Enter Truck No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Dispatch Date</label>
//             <input
//               name="dispatchDate"
//               value={formData.dispatchDate}
//               onChange={handleChange}
//               type="date"
//               className="w-full border rounded px-4 py-2 shadow-sm"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Invoice Number</label>
//             <input
//               name="invoiceNo"
//               value={formData.invoiceNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Invoice No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Remarks</label>
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               readOnly
//               className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24"
//             />
//           </div>

//           <div className="flex justify-between mt-4">
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleCheckedInClick(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));
//     }
//   }, [selectedPlant]);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const res = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: {
//           plantName: selectedPlant,
//           truckNo,
//         }
//       });

//       setFormData(prev => ({
//         ...prev,
//         remarks: res.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching remarks:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

// const handleCheckedInClick = (truckNo) => {
//   handleTruckSelect(truckNo); // fetch remarks too
// };
//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));

//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//     } catch (err) {
//       console.error('Error:', err);
//       if (err.response?.status === 400 && err.response.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error('⚠️ Error while updating status');
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Form */}
//         <div className="col-span-1 space-y-4">
//           <img
//             src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//             alt="Truck"
//             className="w-full object-contain"
//           />

//           <div>
//             <label className="block font-semibold text-gray-700">Truck No.</label>
//             <input
//               name="truckNo"
//               value={formData.truckNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Enter Truck No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Dispatch Date</label>
//             <input
//               name="dispatchDate"
//               value={formData.dispatchDate}
//               onChange={handleChange}
//               type="date"
//               className="w-full border rounded px-4 py-2 shadow-sm"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Invoice Number</label>
//             <input
//               name="invoiceNo"
//               value={formData.invoiceNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Invoice No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Remarks</label>
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               readOnly
//               className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24"
//             />
//           </div>

//           <div className="flex justify-between mt-4">
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleCheckedInClick(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;




//////////////////////////////////////





// // Same imports as before
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]); // NEW: Quantity boxes

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const res = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: {
//           plantName: selectedPlant,
//           truckNo,
//         }
//       });

//       // Add FAKE quantity data for this truck
//       const sampleData = [
//         { plant: 'SALAL', qty: 550 },
//         { plant: 'WALL', qty: 150 },
//         { plant: 'WALL', qty: 959 }
//       ];
//       setQuantityPanels(sampleData);

//       setFormData(prev => ({
//         ...prev,
//         remarks: res.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching remarks:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Truck Image with Panels */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div
//                   key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{
//                     height: `${Math.min(panel.qty / 5, 120)}px`,
//                     width: '50px'
//                   }}
//                 >
//                   <div className="text-[10px]">{panel.plant}</div>
//                   <div className="font-bold">{panel.qty}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


////////////////////////////////////////////////////////////////




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);

//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Truck Image with Panels */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
               
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div
//                   key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
//                 >
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   const allowedPlants = localStorage.getItem('allowedPlants')
//     ? JSON.parse(localStorage.getItem('allowedPlants'))
//     : [];

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);

//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList
//               .filter(plant => allowedPlants.includes(getPlantName(plant)))
//               .map((plant, i) => (
//                 <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//               ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div
//                   key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
//                 >
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

//////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truck from './assets/truck.jpg';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//     quantity: '',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => {
//         let allowed = (localStorage.getItem('allowedPlants') || '')
//           .split(',')
//           .map(id => id.trim())
//           .filter(Boolean);
//         const filtered = res.data.filter(plant => allowed.includes(String(plant.PlantID)));
//         setPlantList(filtered);
//       })
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant && plantList.length > 0) {
//       const selectedPlantObj = plantList.find(p => String(p.PlantID) === String(selectedPlant));
//       const plantName = selectedPlantObj ? selectedPlantObj.PlantName : '';
//       if (!plantName) {
//         setTruckNumbers([]);
//         setCheckedInTrucks([]);
//         return;
//       }
//       axios.get(`${API_URL}/api/trucks?plantName=${encodeURIComponent(plantName)}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${encodeURIComponent(plantName)}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     } else {
//       setTruckNumbers([]);
//       setCheckedInTrucks([]);
//     }
//   }, [selectedPlant, plantList]);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     const selectedPlantObj = plantList.find(p => String(p.PlantID) === String(selectedPlant));
//     const plantName = selectedPlantObj ? selectedPlantObj.PlantName : '';

//     try {
//       const resRemarks = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName, truckNo }
//       });

//       const resQty = await axios.get(`${API_URL}/api/fetch-qty`, {
//         params: { plantName, truckNo }
//       });

//       setFormData(prev => ({
//         ...prev,
//         remarks: resRemarks.data.remarks || 'No remarks available.',
//         quantity: resQty.data.quantity || ''
//       }));
//     } catch (err) {
//       console.error('Error fetching remarks or quantity:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.',
//         quantity: ''
//       }));
//     }
//   };

//   const handleCheckedInClick = async (truckNo) => {
//     await handleTruckSelect(truckNo);
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo, quantity } = formData;

//     if (!selectedPlant) {
//       toast.warn('Please select a plant first.');
//       return;
//     }

//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => t.TruckNo === truckNo || t === truckNo)) {
//       toast.error('🚫 This truck is already checked in!');
//       return;
//     }

//     const selectedPlantObj = plantList.find(p => String(p.PlantID) === String(selectedPlant));
//     const plantName = selectedPlantObj ? selectedPlantObj.PlantName : '';

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity,
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => t.TruckNo !== truckNo));

//         if (type === 'Check In') {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         localStorage.setItem('allowedPlants', response.data.allowedPlants);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

//         {/* Left Panel - Truck List */}
//         <div className="col-span-1 space-y-6">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant) => (
//               <option key={plant.PlantID} value={plant.PlantID}>{plant.PlantName}</option>
//             ))}
//           </select>

//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 h-[300px] overflow-y-auto">
//             <h3 className="text-lg font-bold text-blue-800 mb-4">Truck List</h3>
//             <ul className="space-y-2 text-sm text-gray-700">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(truck.TruckNo)}
//                   className="hover:text-blue-600 cursor-pointer p-2"
//                 >
//                   🚛 {truck.TruckNo}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Form */}
//         <div className="col-span-1 space-y-6">
//           <div className="relative w-full">
//             <img src={truck} alt="Truck" className="w-full object-contain rounded-2xl" />
//             {formData.quantity && (
//               <div className="absolute top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-xl">
//                 Qty: {formData.quantity}
//               </div>
//             )}
//           </div>

//           <input
//             name="truckNo"
//             value={formData.truckNo}
//             onChange={handleChange}
//             className="w-full border-2 border-gray-200 rounded-xl px-4 py-3"
//             placeholder="Enter Truck No"
//           />

//           <input
//             name="dispatchDate"
//             value={formData.dispatchDate}
//             onChange={handleChange}
//             type="date"
//             className="w-full border-2 border-gray-200 rounded-xl px-4 py-3"
//           />

//           <input
//             name="invoiceNo"
//             value={formData.invoiceNo}
//             onChange={handleChange}
//             className="w-full border-2 border-gray-200 rounded-xl px-4 py-3"
//             placeholder="Invoice No"
//           />

//           <textarea
//             name="remarks"
//             value={formData.remarks}
//             readOnly
//             className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 resize-none h-24"
//           />

//           <div className="flex justify-between mt-6 space-x-4">
//             <button
//               className="flex-1 bg-green-500 text-white px-6 py-3 rounded-xl"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked In */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-2xl p-6 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-4">Checked In Trucks</h3>
//             <ul className="space-y-2 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer p-2"
//                   onClick={() => handleCheckedInClick(truck.TruckNo)}
//                 >
//                   ✓ {truck.TruckNo}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


///////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);

//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Truck Image with Panels */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div
//                   key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
//                 >
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) return toast.warn('🚛 Please select a truck number.');
//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });
//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== formData.truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }
//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0));

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">

//             {/* Bar Chart */}
//             <div
//               className="absolute bottom-[60px] left-[50px] h-[75px] flex items-end gap-[2px] z-10"
//               style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}
//             >
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Truck Image */}
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           {/* Form Inputs */}
//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleTruckSelect(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;//////////////////////////////final done ////////////////////////////////





// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) return toast.warn('🚛 Please select a truck number.');
//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });
//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== formData.truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }
//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0));

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">

//             {/* Bar Chart */}
//             <div
//               // className="absolute bottom-[60px] left-[50px] h-[75px] flex items-end gap-[2px] z-10"
//                className="absolute bottom-[51px] left-[50px] h-[75px] w-[80px] flex items-end gap-[2px] z-10"
//               style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}
//             >
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Truck Image */}
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           {/* Form Inputs */}
//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleTruckSelect(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = async (truckNo) => {
//     await handleTruckSelect(truckNo);
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;

//     if (!selectedPlant) {
//       toast.warn('Please select a plant first.');
//       return;
//     }

//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       toast.error('🚫 This truck is already checked in!');
//       return;
//     }

//     const selectedPlantObj = plantList.find(p => getPlantName(p) === selectedPlant);
//     const plantName = selectedPlantObj ? getPlantName(selectedPlantObj) : '';

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, panel) => acc + (panel.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));

//         if (type === 'Check In') {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//         localStorage.setItem('allowedPlants', response.data.allowedPlants || '');
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0));

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div
//               className="absolute bottom-[51px] left-[50px] h-[75px] w-[80px] flex items-end gap-[2px] z-10"
//               style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}
//             >
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           {/* Form */}
//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleCheckedInClick(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

////////////////////////////
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlants = (localStorage.getItem('allowedPlants') || '').split(',').map(p => p.trim());

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => {
//         // Filter the plants based on allowedPlants from localStorage
//         const filtered = res.data.filter(plant =>
//           allowedPlants.includes(getPlantName(plant))
//         );
//         setPlantList(filtered);
//       })
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = async (truckNo) => {
//     await handleTruckSelect(truckNo);
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;

//     if (!selectedPlant) {
//       toast.warn('Please select a plant first.');
//       return;
//     }

//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       toast.error('🚫 This truck is already checked in!');
//       return;
//     }

//     const selectedPlantObj = plantList.find(p => getPlantName(p) === selectedPlant);
//     const plantName = selectedPlantObj ? getPlantName(selectedPlantObj) : '';

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, panel) => acc + (panel.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));

//         if (type === 'Check In') {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//         localStorage.setItem('allowedPlants', response.data.allowedPlants || '');
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0));

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div
//               className="absolute bottom-[51px] left-[50px] h-[75px] w-[80px] flex items-end gap-[2px] z-10"
//               style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}
//             >
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img src={truckImage} alt="Truck" className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" style={{ height: '65%' }} />
//           </div>

//           {/* Form */}
//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleCheckedInClick(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

///////////////////////////////
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = async (truckNo) => {
//     await handleTruckSelect(truckNo);
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;

//     if (!selectedPlant) {
//       toast.warn('Please select a plant first.');
//       return;
//     }

//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       toast.error('🚫 This truck is already checked in!');
//       return;
//     }

//     const selectedPlantObj = plantList.find(p => getPlantName(p) === selectedPlant);
//     const plantName = selectedPlantObj ? getPlantName(selectedPlantObj) : '';

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, panel) => acc + (panel.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));

//         if (type === 'Check In') {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0));

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div
//               className="absolute bottom-[51px] left-[50px] h-[75px] w-[80px] flex items-end gap-[2px] z-10"
//               style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}
//             >
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           {/* Form */}
//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleCheckedInClick(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;
// *********************************************
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     console.log('🚀 User Role:', role);
//     console.log('✅ Allowed Plants from localStorage:', allowedPlants);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//     .then(res => {
//       console.log('🌿 All Plants from API:', res.data.map(p => p.PlantName || p.plantname));
//       const filtered = res.data.filter(plant => {
//         const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//         return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//       });
//       console.log('🌱 Filtered Plants:', filtered.map(p => p.PlantName || p.plantname));
//       setPlantList(filtered);
//     })
//     .catch(err => {
//       console.error('❌ Error fetching plants:', err);
//       toast.error('Failed to fetch plant list');
//     });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;
//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');
//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const plantName = selectedPlant;
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check In') setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Plant and Truck List */}
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>
//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Center Form Panel */}
//         <div className="space-y-4">
//           <img src={truckImage} alt="Truck" className="w-full object-contain rounded shadow" />
//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />
//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         {/* Checked In Trucks */}
//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;
// //////////////////////////////////////////////////////final with the plant/////////////////////

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//     .then(res => {
//       const filtered = res.data.filter(plant => {
//         const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//         return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//       });
//       setPlantList(filtered);
//     })
//     .catch(err => {
//       console.error('❌ Error fetching plants:', err);
//       toast.error('Failed to fetch plant list');
//     });
//   }, []);
// //   useEffect(() => {
// //   const userId = localStorage.getItem('userId');
// //   const role = localStorage.getItem('role') || localStorage.getItem('userRole') || '';
// //   const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
// //   const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

// //   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// //   axios.get(`${API_URL}/api/plants`, {
// //     headers: { userid: userId, role }
// //   })
// //   .then(res => {
// //     const filtered = res.data.filter(plant => {
// //       const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
// //       return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
// //     });
// //     setPlantList(filtered);
// //   })
// //   .catch(err => {
// //     console.error('❌ Error fetching plants:', err);
// //     toast.error('Failed to fetch plant list');
// //   });
// // }, []);



//   useEffect(() => {
//     if (!selectedPlant) return;
//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');
//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check In') setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>
//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="space-y-4">
// {/*           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[80px] flex items-end gap-[2px] z-10" style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}>
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div> */}
//           <div className="relative w-full aspect-[3/2] bg-blue-200 rounded-lg overflow-hidden shadow-md">
//   <div className="absolute bottom-[60px] left-[5%] flex items-end gap-[4px] h-[70%] w-[90%] z-10">
//     {quantityPanels.map((panel, index) => {
//       const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//       const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//       return (
//         <div
//           key={index}
//           className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//           style={{
//             height: `${height}%`,
//             flex: 1,
//             minWidth: '20px', // prevent bars from shrinking too much
//             maxWidth: '40px'
//           }}
//           title={`${panel.plantname}: ${panel.quantity}`}
//         >
//           <div className="flex items-center gap-[2px]">
//             <span>📦</span>
//             <span>{panel.quantity}</span>
//           </div>
//           <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//         </div>
//       );
//     })}
//   </div>

//   <img
//     src={truckImage}
//     alt="Truck"
//     className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//     style={{ height: '65%' }}
//   />
// </div>


//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />
//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }


// export default GateKeeper;




























































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//     .then(res => {
//       const filtered = res.data.filter(plant => {
//         const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//         return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//       });
//       setPlantList(filtered);
//     })
//     .catch(err => {
//       console.error('❌ Error fetching plants:', err);
//       toast.error('Failed to fetch plant list');
//     });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;
//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');
//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check In') setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-4 md:p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>
//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="relative w-full aspect-[3/2] bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[60px] left-[5%] flex items-end gap-[4px] h-[70%] w-[90%] z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{
//                       height: `${height}%`,
//                       flex: 1,
//                       minWidth: '20px',
//                       maxWidth: '40px'
//                     }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />
//           <div className="flex flex-col sm:flex-row gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

















// // GateKeeper.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));
//     }
//   }, [selectedPlant]);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const res = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: {
//           plantName: selectedPlant,
//           truckNo,
//         }
//       });

//       setFormData(prev => ({
//         ...prev,
//         remarks: res.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching remarks:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => t.TruckNo !== truckNo));

//       if (type === 'Check In' && !checkedInTrucks.includes(truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//     } catch (err) {
//       console.error('Error:', err);
//       if (err.response?.status === 400 && err.response.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error('⚠️ Error while updating status');
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={plant.PlantName}>{plant.PlantName}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(truck.TruckNo)}
//                   className="hover:text-blue-600"
//                 >
//                   {truck.TruckNo}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Form */}
//         <div className="col-span-1 space-y-4">
//           <img
//             src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//             alt="Truck"
//             className="w-full object-contain"
//           />

//           <div>
//             <label className="block font-semibold text-gray-700">Truck No.</label>
//             <input
//               name="truckNo"
//               value={formData.truckNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Enter Truck No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Dispatch Date</label>
//             <input
//               name="dispatchDate"
//               value={formData.dispatchDate}
//               onChange={handleChange}
//               type="date"
//               className="w-full border rounded px-4 py-2 shadow-sm"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Invoice Number</label>
//             <input
//               name="invoiceNo"
//               value={formData.invoiceNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Invoice No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Remarks</label>
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               readOnly
//               className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24"
//             />
//           </div>

//           <div className="flex justify-between mt-4">
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleCheckedInClick(truck.TruckNo)}
//                 >
//                   {truck.TruckNo}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));
//     }
//   }, [selectedPlant]);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const res = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: {
//           plantName: selectedPlant,
//           truckNo,
//         }
//       });

//       setFormData(prev => ({
//         ...prev,
//         remarks: res.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching remarks:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));

//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//     } catch (err) {
//       console.error('Error:', err);
//       if (err.response?.status === 400 && err.response.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error('⚠️ Error while updating status');
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Form */}
//         <div className="col-span-1 space-y-4">
//           <img
//             src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//             alt="Truck"
//             className="w-full object-contain"
//           />

//           <div>
//             <label className="block font-semibold text-gray-700">Truck No.</label>
//             <input
//               name="truckNo"
//               value={formData.truckNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Enter Truck No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Dispatch Date</label>
//             <input
//               name="dispatchDate"
//               value={formData.dispatchDate}
//               onChange={handleChange}
//               type="date"
//               className="w-full border rounded px-4 py-2 shadow-sm"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Invoice Number</label>
//             <input
//               name="invoiceNo"
//               value={formData.invoiceNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Invoice No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Remarks</label>
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               readOnly
//               className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24"
//             />
//           </div>

//           <div className="flex justify-between mt-4">
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleCheckedInClick(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));
//     }
//   }, [selectedPlant]);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const res = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: {
//           plantName: selectedPlant,
//           truckNo,
//         }
//       });

//       setFormData(prev => ({
//         ...prev,
//         remarks: res.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching remarks:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

// const handleCheckedInClick = (truckNo) => {
//   handleTruckSelect(truckNo); // fetch remarks too
// };
//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));

//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//     } catch (err) {
//       console.error('Error:', err);
//       if (err.response?.status === 400 && err.response.data?.message) {
//         toast.error(err.response.data.message);
//       } else {
//         toast.error('⚠️ Error while updating status');
//       }
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Form */}
//         <div className="col-span-1 space-y-4">
//           <img
//             src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//             alt="Truck"
//             className="w-full object-contain"
//           />

//           <div>
//             <label className="block font-semibold text-gray-700">Truck No.</label>
//             <input
//               name="truckNo"
//               value={formData.truckNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Enter Truck No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Dispatch Date</label>
//             <input
//               name="dispatchDate"
//               value={formData.dispatchDate}
//               onChange={handleChange}
//               type="date"
//               className="w-full border rounded px-4 py-2 shadow-sm"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Invoice Number</label>
//             <input
//               name="invoiceNo"
//               value={formData.invoiceNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Invoice No"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700">Remarks</label>
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               readOnly
//               className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24"
//             />
//           </div>

//           <div className="flex justify-between mt-4">
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleCheckedInClick(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Toast Container */}
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;




//////////////////////////////////////





// // Same imports as before
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]); // NEW: Quantity boxes

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const res = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: {
//           plantName: selectedPlant,
//           truckNo,
//         }
//       });

//       // Add FAKE quantity data for this truck
//       const sampleData = [
//         { plant: 'SALAL', qty: 550 },
//         { plant: 'WALL', qty: 150 },
//         { plant: 'WALL', qty: 959 }
//       ];
//       setQuantityPanels(sampleData);

//       setFormData(prev => ({
//         ...prev,
//         remarks: res.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching remarks:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Truck Image with Panels */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div
//                   key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{
//                     height: `${Math.min(panel.qty / 5, 120)}px`,
//                     width: '50px'
//                   }}
//                 >
//                   <div className="text-[10px]">{panel.plant}</div>
//                   <div className="font-bold">{panel.qty}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


////////////////////////////////////////////////////////////////




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);

//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Truck Image with Panels */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
               
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div
//                   key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
//                 >
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   const allowedPlants = localStorage.getItem('allowedPlants')
//     ? JSON.parse(localStorage.getItem('allowedPlants'))
//     : [];

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);

//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList
//               .filter(plant => allowedPlants.includes(getPlantName(plant)))
//               .map((plant, i) => (
//                 <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//               ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div
//                   key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
//                 >
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

//////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truck from './assets/truck.jpg';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//     quantity: '',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => {
//         let allowed = (localStorage.getItem('allowedPlants') || '')
//           .split(',')
//           .map(id => id.trim())
//           .filter(Boolean);
//         const filtered = res.data.filter(plant => allowed.includes(String(plant.PlantID)));
//         setPlantList(filtered);
//       })
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant && plantList.length > 0) {
//       const selectedPlantObj = plantList.find(p => String(p.PlantID) === String(selectedPlant));
//       const plantName = selectedPlantObj ? selectedPlantObj.PlantName : '';
//       if (!plantName) {
//         setTruckNumbers([]);
//         setCheckedInTrucks([]);
//         return;
//       }
//       axios.get(`${API_URL}/api/trucks?plantName=${encodeURIComponent(plantName)}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${encodeURIComponent(plantName)}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     } else {
//       setTruckNumbers([]);
//       setCheckedInTrucks([]);
//     }
//   }, [selectedPlant, plantList]);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     const selectedPlantObj = plantList.find(p => String(p.PlantID) === String(selectedPlant));
//     const plantName = selectedPlantObj ? selectedPlantObj.PlantName : '';

//     try {
//       const resRemarks = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName, truckNo }
//       });

//       const resQty = await axios.get(`${API_URL}/api/fetch-qty`, {
//         params: { plantName, truckNo }
//       });

//       setFormData(prev => ({
//         ...prev,
//         remarks: resRemarks.data.remarks || 'No remarks available.',
//         quantity: resQty.data.quantity || ''
//       }));
//     } catch (err) {
//       console.error('Error fetching remarks or quantity:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.',
//         quantity: ''
//       }));
//     }
//   };

//   const handleCheckedInClick = async (truckNo) => {
//     await handleTruckSelect(truckNo);
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo, quantity } = formData;

//     if (!selectedPlant) {
//       toast.warn('Please select a plant first.');
//       return;
//     }

//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => t.TruckNo === truckNo || t === truckNo)) {
//       toast.error('🚫 This truck is already checked in!');
//       return;
//     }

//     const selectedPlantObj = plantList.find(p => String(p.PlantID) === String(selectedPlant));
//     const plantName = selectedPlantObj ? selectedPlantObj.PlantName : '';

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity,
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => t.TruckNo !== truckNo));

//         if (type === 'Check In') {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         localStorage.setItem('allowedPlants', response.data.allowedPlants);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

//         {/* Left Panel - Truck List */}
//         <div className="col-span-1 space-y-6">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant) => (
//               <option key={plant.PlantID} value={plant.PlantID}>{plant.PlantName}</option>
//             ))}
//           </select>

//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 h-[300px] overflow-y-auto">
//             <h3 className="text-lg font-bold text-blue-800 mb-4">Truck List</h3>
//             <ul className="space-y-2 text-sm text-gray-700">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(truck.TruckNo)}
//                   className="hover:text-blue-600 cursor-pointer p-2"
//                 >
//                   🚛 {truck.TruckNo}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Form */}
//         <div className="col-span-1 space-y-6">
//           <div className="relative w-full">
//             <img src={truck} alt="Truck" className="w-full object-contain rounded-2xl" />
//             {formData.quantity && (
//               <div className="absolute top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-xl">
//                 Qty: {formData.quantity}
//               </div>
//             )}
//           </div>

//           <input
//             name="truckNo"
//             value={formData.truckNo}
//             onChange={handleChange}
//             className="w-full border-2 border-gray-200 rounded-xl px-4 py-3"
//             placeholder="Enter Truck No"
//           />

//           <input
//             name="dispatchDate"
//             value={formData.dispatchDate}
//             onChange={handleChange}
//             type="date"
//             className="w-full border-2 border-gray-200 rounded-xl px-4 py-3"
//           />

//           <input
//             name="invoiceNo"
//             value={formData.invoiceNo}
//             onChange={handleChange}
//             className="w-full border-2 border-gray-200 rounded-xl px-4 py-3"
//             placeholder="Invoice No"
//           />

//           <textarea
//             name="remarks"
//             value={formData.remarks}
//             readOnly
//             className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50 text-gray-700 resize-none h-24"
//           />

//           <div className="flex justify-between mt-6 space-x-4">
//             <button
//               className="flex-1 bg-green-500 text-white px-6 py-3 rounded-xl"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="flex-1 bg-red-500 text-white px-6 py-3 rounded-xl"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked In */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-2xl p-6 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-4">Checked In Trucks</h3>
//             <ul className="space-y-2 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer p-2"
//                   onClick={() => handleCheckedInClick(truck.TruckNo)}
//                 >
//                   ✓ {truck.TruckNo}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


///////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`)
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);

//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Truck Image with Panels */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div
//                   key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
//                 >
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;



/////////////////////////////////////////////////////////////////////


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//   const userId = localStorage.getItem('userId'); // Login ke time store hua hona chahiye

//   axios.get(`${API_URL}/api/plants`, {
//     headers: { 'userid': userId }
//   })
//     .then(res => setPlantList(res.data))
//     .catch(err => console.error('Error fetching plants:', err));
// }, []);


//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);

//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo } = formData;
//     if (!truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && (
//                 <li className="text-gray-400 italic">No trucks available</li>
//               )}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel - Truck Image with Panels */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div
//                   key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
//                 >
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-In Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && (
//                 <li className="text-gray-400 italic">No checked-in trucks</li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

//////////////////////////////////////////////////////////////////




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlants = localStorage.getItem('allowedPlants');

//     if (role && role.toLowerCase() === 'admin') {
//       axios.get(`${API_URL}/api/plants`, { headers: { userid: userId, role } })
//         .then(res => setPlantList(res.data))
//         .catch(err => console.error('Error fetching plants:', err));
//     } else if (allowedPlants) {
//       const plantArray = allowedPlants.split(',').map(p => p.trim());
//       setPlantList(plantArray);
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => {
//     if (typeof plant === 'string') return plant;
//     return plant.PlantName || plant.plantname || plant.plant_name || plant || '';
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, { params: { plantName: selectedPlant, truckNo } });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== formData.truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div className="col-span-1 space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border px-4 py-2 rounded-md shadow-sm">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img src="https://pngimg.com/uploads/truck/truck_PNG16234.png" alt="Truck" className="absolute bottom-0 left-0 w-full h-40 object-contain" />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div key={index} className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`} style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}>
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleTruckSelect(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

///////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlants = localStorage.getItem('allowedPlants');

//     if (role && role.toLowerCase() === 'admin') {
//       // ✅ Admin: get from DB (id + name)
//       axios.get(`${API_URL}/api/plants`, {
//         headers: { userid: userId, role }
//       })
//         .then(res => setPlantList(res.data))
//         .catch(err => console.error('Error fetching plants:', err));
//     } else if (allowedPlants) {
//       // ✅ Staff: use allowedPlants (name array)
//       const plantArray = allowedPlants.split(',').map(p => p.trim());
//       setPlantList(plantArray);
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';

//   const getPlantName = (plant) => {
//     if (typeof plant === 'string') return plant;
//     return (
//       plant.PlantName ||
//       plant.plantname ||
//       plant.plant_name ||
//       String(plant) ||
//       'Unknown'
//     );
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);

//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);
//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev =>
//         prev.filter(t => getTruckNo(t) !== formData.truckNo)
//       );

//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel - Plant + Truck List */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => {
//               const name = getPlantName(plant);
//               return <option key={i} value={name}>{name}</option>;
//             })}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel - Truck Image + Form */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
//                 >
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input
//               name="truckNo"
//               value={formData.truckNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Truck No"
//             />
//             <input
//               name="dispatchDate"
//               type="date"
//               value={formData.dispatchDate}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//             />
//             <input
//               name="invoiceNo"
//               value={formData.invoiceNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Invoice No"
//             />
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               readOnly
//               className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24"
//             />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-in Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Quantity Chart */}
//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


//////////////////////////////////////////////////////////


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlants = localStorage.getItem('allowedPlants');

//     if (role && role.toLowerCase() === 'admin') {
//       // ✅ Admin: get from DB (id + name)
//       axios.get(`${API_URL}/api/plants`, {
//         headers: { userid: userId, role }
//       })
//         .then(res => setPlantList(res.data))
//         .catch(err => console.error('Error fetching plants:', err));
//     } else if (allowedPlants) {
//       // ✅ Staff: use allowedPlants (name array)
//       const plantArray = allowedPlants.split(',').map(p => p.trim());
//       setPlantList(plantArray);
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';

//   const getPlantName = (plant) => {
//     if (typeof plant === 'string') return plant;
//     return (
//       plant.PlantName ||
//       plant.plantname ||
//       plant.plant_name ||
//       String(plant) ||
//       'Unknown'
//     );
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);

//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);
//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev =>
//         prev.filter(t => getTruckNo(t) !== formData.truckNo)
//       );

//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel - Plant + Truck List */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => {
//               const name = getPlantName(plant);
//               return <option key={i} value={name}>{name}</option>;
//             })}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel - Truck Image + Form */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
//                 >
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input
//               name="truckNo"
//               value={formData.truckNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Truck No"
//             />
//             <input
//               name="dispatchDate"
//               type="date"
//               value={formData.dispatchDate}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//             />
//             <input
//               name="invoiceNo"
//               value={formData.invoiceNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Invoice No"
//             />
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               readOnly
//               className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24"
//             />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-in Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Quantity Chart */}
//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


/////////////////////////////////////////////////////////



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
//   ResponsiveContainer, Legend,
// } from 'recharts';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [chartData, setChartData] = useState([]);

//   // ✅ Load allowed plants (role-based) from backend
//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   // ✅ Fetch trucks for selected plant
//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => {
//     if (typeof plant === 'string') return plant;
//     return plant.PlantName || plant.plantname || plant.plant_name || 'Unknown';
//   };

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setChartData([]);
//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//     }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });

//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);

//       setQuantityPanels(quantityRes.data);
//       setChartData(quantityRes.data);
//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.'
//       }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({
//         ...prev,
//         remarks: 'No remarks available or error fetching remarks.'
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) {
//       toast.warn('🚛 Please select a truck number.');
//       return;
//     }

//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });

//       setTruckNumbers(prev =>
//         prev.filter(t => getTruckNo(t) !== formData.truckNo)
//       );

//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }

//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//       setChartData([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <CancelButton/>
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel - Plant + Truck List */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => {
//               const name = getPlantName(plant);
//               return <option key={i} value={name}>{name}</option>;
//             })}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li
//                   key={index}
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                   className="hover:text-blue-600"
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel - Truck Image + Form */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <img
//               src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-40 object-contain"
//             />
//             <div className="absolute bottom-16 left-6 flex items-end gap-2">
//               {quantityPanels.map((panel, index) => (
//                 <div key={index}
//                   className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
//                   style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
//                 >
//                   <div className="text-[10px]">{panel.plantname}</div>
//                   <div className="font-bold">{panel.quantity}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="space-y-2">
//             <input
//               name="truckNo"
//               value={formData.truckNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Truck No"
//             />
//             <input
//               name="dispatchDate"
//               type="date"
//               value={formData.dispatchDate}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//             />
//             <input
//               name="invoiceNo"
//               value={formData.invoiceNo}
//               onChange={handleChange}
//               className="w-full border rounded px-4 py-2 shadow-sm"
//               placeholder="Invoice No"
//             />
//             <textarea
//               name="remarks"
//               value={formData.remarks}
//               readOnly
//               className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24"
//             />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button
//               className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               onClick={() => handleSubmit('Check In')}
//             >
//               Check In
//             </button>
//             <button
//               className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//               onClick={() => handleSubmit('Check Out')}
//             >
//               Check Out
//             </button>
//           </div>
//         </div>

//         {/* Right Panel - Checked-in Trucks */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li
//                   key={idx}
//                   className="hover:text-green-600 cursor-pointer"
//                   onClick={() => handleTruckSelect(getTruckNo(truck))}
//                 >
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Quantity Chart */}
//       <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
//         <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
//         {chartData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="plantname" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="quantity" fill="#0ea5e9" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <p className="text-center text-gray-500">No data to display. Select a truck.</p>
//         )}
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;///////////////////finalcode hai ye working vala////////////////////////////////

////////////////////////////////////////////////////////////////////////



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';  // Full truck image

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) return toast.warn('🚛 Please select a truck number.');
//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });
//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== formData.truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }
//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0));
//   const totalQty = quantityPanels.reduce((acc, p) => acc + p.quantity, 0);

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">

//             {/* Bar Chart only over container */}
//             <div className="absolute bottom-[58px] left-[65px] right-[160px] h-[70px] flex items-end justify-between z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const barWidth = quantityPanels.length > 0 ? `${100 / quantityPanels.length}%` : '0%';
//                 const bgColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white ${bgColors[index % bgColors.length]} rounded-t-md`}
//                     style={{ height: `${height}%`, width: barWidth }}
//                   >
//                     <div className="text-[10px]">{panel.plantname}</div>
//                     <div className="text-xs font-bold">{panel.quantity}</div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Truck Image */}
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           {/* Form Inputs */}
//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleTruckSelect(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

////////////////////////////////////////////////////////////////////////


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';  // Full truck image

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) return toast.warn('🚛 Please select a truck number.');
//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });
//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== formData.truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }
//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0));

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">

//             {/* Bar Chart only over container area */}
//             <div
//               className="absolute bottom-[58px] left-[65px] h-[70px] flex items-end justify-between z-10"
//               style={{ right: '160px' }} // Dynamic right spacing
//             >
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const barWidth = quantityPanels.length > 0 ? `${100 / quantityPanels.length}%` : '0%';
//                 const bgColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white ${bgColors[index % bgColors.length]} rounded-t-md`}
//                     style={{ height: `${height}%`, width: barWidth }}
//                   >
//                     <div className="text-[10px]">{panel.plantname}</div>
//                     <div className="text-xs font-bold">{panel.quantity}</div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Truck Image */}
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           {/* Form Inputs */}
//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleTruckSelect(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


////////////////////////////////////////////////////////////////////////////////

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png'; // Adjust path if needed

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.'
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) return toast.warn('🚛 Please select a truck number.');
//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });
//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== formData.truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }
//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 1);
//   const barAreaPadding = 135;
//   const totalBarAreaWidth = 260; // the width available before the cabin
//   const barWidth = quantityPanels.length > 0 ? totalBarAreaWidth / quantityPanels.length : 0;

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div
//               className="absolute bottom-[58px] left-[135px] flex items-end gap-[4px] z-10"
//               style={{ width: `${totalBarAreaWidth}px` }}
//             >
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white ${bgColors[index % bgColors.length]} rounded-t-md text-[10px]`}
//                     style={{
//                       height: `${height}%`,
//                       width: `${barWidth - 4}px`,
//                       minWidth: '30px',
//                       maxWidth: '80px'
//                     }}
//                   >
//                     <div>{panel.plantname}</div>
//                     <div className="text-[10px] font-bold">{panel.quantity}</div>
//                   </div>
//                 );
//               })}
//             </div>

//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleTruckSelect(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) return toast.warn('🚛 Please select a truck number.');
//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });
//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== formData.truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }
//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0));

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">

//             {/* Bar Chart */}
//             <div
//               className="absolute bottom-[60px] left-[50px] h-[75px] flex items-end gap-[2px] z-10"
//               style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}
//             >
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                   >
//                     <div>{panel.quantity}</div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Truck Image */}
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           {/* Form Inputs */}
//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleTruckSelect(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;/////////////////////////////final chart////////////






// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => setPlantList(res.data))
//       .catch(err => console.error('Error fetching plants:', err));
//   }, []);

//   useEffect(() => {
//     if (selectedPlant) {
//       axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//         .then(res => setTruckNumbers(res.data))
//         .catch(err => console.error('Error fetching trucks:', err));

//       axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//         .then(res => setCheckedInTrucks(res.data))
//         .catch(err => console.error('Error fetching checked-in trucks:', err));
//     }
//   }, [selectedPlant]);

//   const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = (plant) => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     if (!formData.truckNo) return toast.warn('🚛 Please select a truck number.');
//     try {
//       const res = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo: formData.truckNo,
//         plantName: selectedPlant,
//         type
//       });
//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== formData.truckNo));
//       if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo)) {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: formData.truckNo }]);
//       }
//       toast.success(res.data.message);
//       setFormData(prev => ({ ...prev, truckNo: '' }));
//       setQuantityPanels([]);
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error('⚠️ Error while updating status');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0));

//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Left Panel */}
//         <div className="col-span-1 space-y-4">
//           <select
//             value={selectedPlant}
//             onChange={handlePlantChange}
//             className="w-full border px-4 py-2 rounded-md shadow-sm"
//           >
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
//             <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
//             <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
//               {truckNumbers.map((truck, index) => (
//                 <li key={index} onClick={() => handleTruckSelect(getTruckNo(truck))} className="hover:text-blue-600">
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {truckNumbers.length === 0 && <li className="text-gray-400 italic">No trucks available</li>}
//             </ul>
//           </div>
//         </div>

//         {/* Middle Panel */}
//         <div className="col-span-1 space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">

//             {/* Bar Chart */}
//             <div
//               // className="absolute bottom-[60px] left-[50px] h-[75px] flex items-end gap-[2px] z-10"
//                className="absolute bottom-[51px] left-[50px] h-[75px] w-[80px] flex items-end gap-[2px] z-10"
//               style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}
//             >
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Truck Image */}
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           {/* Form Inputs */}
//           <div className="space-y-2">
//             <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
//             <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
//             <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
//             <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
//           </div>

//           <div className="flex justify-between mt-2">
//             <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
//             <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="col-span-1">
//           <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
//             <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
//             <ul className="space-y-1 text-sm text-gray-700">
//               {checkedInTrucks.map((truck, idx) => (
//                 <li key={idx} className="hover:text-green-600 cursor-pointer" onClick={() => handleTruckSelect(getTruckNo(truck))}>
//                   {getTruckNo(truck)}
//                 </li>
//               ))}
//               {checkedInTrucks.length === 0 && <li className="text-gray-400 italic">No checked-in trucks</li>}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;//////////////////////////////final done ////////////////////////////////

// ////////////////////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//     .then(res => {
//       const filtered = res.data.filter(plant => {
//         const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//         return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//       });
//       setPlantList(filtered);
//     })
//     .catch(err => {
//       console.error('❌ Error fetching plants:', err);
//       toast.error('Failed to fetch plant list');
//     });
//   }, []);
// //   useEffect(() => {
// //   const userId = localStorage.getItem('userId');
// //   const role = localStorage.getItem('role') || localStorage.getItem('userRole') || '';
// //   const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
// //   const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

// //   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// //   axios.get(`${API_URL}/api/plants`, {
// //     headers: { userid: userId, role }
// //   })
// //   .then(res => {
// //     const filtered = res.data.filter(plant => {
// //       const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
// //       return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
// //     });
// //     setPlantList(filtered);
// //   })
// //   .catch(err => {
// //     console.error('❌ Error fetching plants:', err);
// //     toast.error('Failed to fetch plant list');
// //   });
// // }, []);



//   useEffect(() => {
//     if (!selectedPlant) return;
//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');
//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check In') setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//         <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
    
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>
//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[80px] flex items-end gap-[2px] z-10" style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}>
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />
//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }


// export default GateKeeper;/////////////////////////////////////////////FULLY FINAL VERSION BY NIL CODE /////////////////////////////////////////



// // Full code with priority validation before check-in/check-out
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//     .then(res => {
//       const filtered = res.data.filter(plant => {
//         const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//         return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//       });
//       setPlantList(filtered);
//     })
//     .catch(err => {
//       console.error('❌ Error fetching plants:', err);
//       toast.error('Failed to fetch plant list');
//     });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;
//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');

//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo }
//       });

//       const priorityStatus = priorityRes.data;
//       if (priorityStatus.hasPriority1 && !priorityStatus.priority1Completed) {
//         const currentPlant = selectedPlant.toLowerCase().trim();
//         const priority1Plant = priorityStatus.priority1Plant?.toLowerCase().trim();
//         if (currentPlant !== priority1Plant) {
//           return toast.error('🚫 Truck is already in transaction. Priority 1 plant must be completed first.');
//         }
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check In') setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>
//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[80px] flex items-end gap-[2px] z-10" style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}>
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />
//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


// Full code with strict priority validation (integer-only, sequential enforcement)
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//     .then(res => {
//       const filtered = res.data.filter(plant => {
//         const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//         return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//       });
//       setPlantList(filtered);
//     })
//     .catch(err => {
//       console.error('❌ Error fetching plants:', err);
//       toast.error('Failed to fetch plant list');
//     });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;
//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);
//     setFormData(prev => ({ ...prev, truckNo: '', dispatchDate: new Date().toISOString().split('T')[0] }));
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       setQuantityPanels(quantityRes.data);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');

//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });

//       const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;

//       if (hasPending && !canProceed) {
//         return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check In') setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>
//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[80px] flex items-end gap-[2px] z-10" style={{ width: 'calc(100% - 170px)', maxWidth: '370px' }}>
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img
//               src={truckImage}
//               alt="Truck"
//               className="absolute bottom-0 left-0 w-full h-auto object-contain z-0"
//               style={{ height: '65%' }}
//             />
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />
//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;


// .///////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [fromPlant, setFromPlant] = useState('—');
//   const [nextPlant, setNextPlant] = useState('—');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => {
//         const filtered = res.data.filter(plant => {
//           const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//           return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//         });
//         setPlantList(filtered);
//       })
//       .catch(err => {
//         console.error('❌ Error fetching plants:', err);
//         toast.error('Failed to fetch plant list');
//       });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;

//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//       invoiceNo: '',
//       remarks: 'This is a system-generated remark.'
//     }));
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);

//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));
//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       const sorted = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
//       setQuantityPanels(sorted);
//       setFormData(prev => ({ ...prev, remarks: remarksRes.data.remarks || 'No remarks available.' }));

//       const currentIndex = sorted.findIndex(p => p.plantname === selectedPlant);
//       setFromPlant(currentIndex > 0 ? sorted[currentIndex - 1]?.plantname : '—');
//       setNextPlant(currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1]?.plantname : '—');
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => handleTruckSelect(truckNo);

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;
//     const role = localStorage.getItem('role');

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');

//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });
//       const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
//       if (hasPending && !canProceed) {
//         return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo,
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check Out') {
//           setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         } else {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   const maxQty = Math.max(...quantityPanels.map(p => p.quantity || 0), 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Left Panel */}
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel */}
//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-[2px] z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = maxQty ? (panel.quantity / maxQty) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img src={truckImage} alt="Truck" className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" style={{ height: '65%' }} />
//           </div>

//           <div className="col-span-3 flex justify-center gap-6 font-semibold text-sm">
//             <div>From: <span className="text-blue-800">{fromPlant}</span></div>
//             <div>Next: <span className="text-green-800">{nextPlant}</span></div>
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
//           <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} placeholder="Invoice No" className="w-full border px-4 py-2 rounded" />
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />

//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;



























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [fromPlant, setFromPlant] = useState('—');
//   const [nextPlant, setNextPlant] = useState('—');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => {
//         const filtered = res.data.filter(plant => {
//           const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//           return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//         });
//         setPlantList(filtered);
//       })
//       .catch(err => {
//         console.error('❌ Error fetching plants:', err);
//         toast.error('Failed to fetch plant list');
//       });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;

//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//       invoiceNo: '',
//       remarks: 'This is a system-generated remark.'
//     }));
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);

//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       // Fetch remarks and quantity details
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       const sorted = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
//       setQuantityPanels(sorted);

//       // Set remarks and quantity panels
//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.',
//       }));

//       // Set from and next plants
//       const currentIndex = sorted.findIndex(p => p.plantname === selectedPlant);
//       setFromPlant(currentIndex > 0 ? sorted[currentIndex - 1]?.plantname : '—');
//       setNextPlant(currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1]?.plantname : '—');
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   // Show the invoice number field only when the truck is checked-in
//   const handleCheckedInClick = (truckNo) => {
//     handleTruckSelect(truckNo); // Reuse the truck selection logic
    
//     // Check if the truck is already checked in
//     const checkedInTruck = checkedInTrucks.find(t => getTruckNo(t) === truckNo);
    
//     // If checked-in, show the invoice number field
//     if (checkedInTruck) {
//       setFormData(prev => ({
//         ...prev,
//         invoiceNo: checkedInTruck.invoiceNo || '',  // Set invoice number
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');

//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });
//       const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
//       if (hasPending && !canProceed) {
//         return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoiceNo: type === 'Check Out' ? invoiceNo : '',  // Only include invoiceNo on Check Out
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check Out') {
//           setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         } else {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Left Panel */}
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel */}
//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-[2px] z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = Math.max(...quantityPanels.map(p => p.quantity || 0), 0) ? (panel.quantity / Math.max(...quantityPanels.map(p => p.quantity || 0))) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img src={truckImage} alt="Truck" className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" style={{ height: '65%' }} />
//           </div>

//           <div className="col-span-3 flex justify-center gap-6 font-semibold text-sm">
//             <div>From: <span className="text-blue-800">{fromPlant}</span></div>
//             <div>Next: <span className="text-green-800">{nextPlant}</span></div>
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
          
//           {/* Invoice Number (conditionally displayed) */}
//           {checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo) && (
//             <input 
//               name="invoiceNo" 
//               value={formData.invoiceNo} 
//               onChange={handleChange} 
//               placeholder="Invoice No" 
//               className="w-full border px-4 py-2 rounded" 
//             />
//           )}
          
//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />

//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [fromPlant, setFromPlant] = useState('—');
//   const [nextPlant, setNextPlant] = useState('—');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => {
//         const filtered = res.data.filter(plant => {
//           const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//           return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//         });
//         setPlantList(filtered);
//       })
//       .catch(err => {
//         console.error('❌ Error fetching plants:', err);
//         toast.error('Failed to fetch plant list');
//       });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;

//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//       invoiceNo: '',
//       remarks: 'This is a system-generated remark.'
//     }));
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);

//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       // Fetch remarks and quantity details
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       const sorted = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
//       setQuantityPanels(sorted);

//       // Set remarks and quantity panels
//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.',
//       }));

//       // Set from and next plants
//       const currentIndex = sorted.findIndex(p => p.plantname === selectedPlant);
//       setFromPlant(currentIndex > 0 ? sorted[currentIndex - 1]?.plantname : '—');
//       setNextPlant(currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1]?.plantname : '—');
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   // Show the invoice number field only when the truck is checked-in
//   const handleCheckedInClick = (truckNo) => {
//     handleTruckSelect(truckNo); // Reuse the truck selection logic
    
//     // Check if the truck is already checked in
//     const checkedInTruck = checkedInTrucks.find(t => getTruckNo(t) === truckNo);
    
//     // If checked-in, show the invoice number field
//     if (checkedInTruck) {
//       setFormData(prev => ({
//         ...prev,
//         invoiceNo: checkedInTruck.invoiceNo || '',  // Set invoice number
//       }));
//     }
//   };

//   // const handleSubmit = async (type) => {
//   //   const { truckNo, dispatchDate, invoiceNo } = formData;

//   //   if (!selectedPlant) return toast.warn('Please select a plant first.');
//   //   if (!truckNo) return toast.warn('🚛 Please select a truck number.');
//   //   if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

//   //   try {
//   //     const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//   //       params: { truckNo, plantName: selectedPlant }
//   //     });
//   //     const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;
//   //     if (hasPending && !canProceed) {
//   //       return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//   //     }
//   //   } catch (error) {
//   //     console.error('Priority check error:', error);
//   //     toast.error('❌ Error checking priority status');
//   //     return;
//   //   }

//   //   if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//   //     return toast.error('🚫 This truck is already checked in!');
//   //   }

//   //   try {
//   //     const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//   //       truckNo,
//   //       plantName: selectedPlant,
//   //       type,
//   //       dispatchDate,
//   //       invoiceNo: type === 'Check Out' ? invoiceNo : '',  // Include invoiceNo only for Check Out
//   //       quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//   //     });

//   //     if (response.data.message?.includes('✅')) {
//   //       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//   //       if (type === 'Check Out') {
//   //         setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//   //       } else {
//   //         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
//   //       }

//   //       toast.success(response.data.message);
//   //       setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
//   //       setQuantityPanels([]);
//   //     } else {
//   //       toast.error(response.data.message || 'Failed to update status');
//   //     }
//   //   } catch (err) {
//   //     console.error('Error:', err);
//   //     toast.error(err.response?.data?.message || 'Something went wrong.');
//   //   }
//   // };

// // const handleSubmit = async (type) => {
// //   const { truckNo, dispatchDate, invoiceNo } = formData;

// //   if (!selectedPlant) return toast.warn('Please select a plant first.');
// //   if (!truckNo) return toast.warn('🚛 Please select a truck number.');
// //   if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

// //   try {
// //     const response = await axios.post(`${API_URL}/api/update-truck-status`, {
// //       truckNo,
// //       plantName: selectedPlant,
// //       type,
// //       dispatchDate,
// //       invoiceNo,  // Ensure invoiceNo is sent when Check Out is clicked
// //       quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
// //     });

// //     if (response.data.message?.includes('✅')) {
// //       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
// //       if (type === 'Check Out') {
// //         setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
// //       } else {
// //         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
// //       }

// //       toast.success(response.data.message);
// //       setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
// //       setQuantityPanels([]);
// //     } else {
// //       toast.error(response.data.message || 'Failed to update status');
// //     }
// //   } catch (err) {
// //     console.error('Error:', err);
// //     toast.error(err.response?.data?.message || 'Something went wrong.');
// //   }
// // };
// const handleSubmit = async (type) => {
//   const { truckNo, dispatchDate, invoicenumber } = formData;

//   // Validate required fields
//   if (!selectedPlant) return toast.warn('Please select a plant first.');
//   if (!truckNo) return toast.warn('🚛 Please select a truck number.');
  
//   // Ensure the invoice number is provided for Check Out
//   if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

//   // 1. Check if there is any pending priority
//   try {
//     const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//       params: { truckNo, plantName: selectedPlant }
//     });
//     const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;

//     // If there is a pending priority and it can't proceed, show an error
//     if (hasPending && !canProceed) {
//       return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//     }
//   } catch (error) {
//     console.error('Priority check error:', error);
//     toast.error('❌ Error checking priority status');
//     return;
//   }

//   // 2. Handle Check In
//   if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//     return toast.error('🚫 This truck is already checked in!');
//   }

//   // 3. Handle Check Out
//   if (type === 'Check Out' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//     return toast.warn('🚛 Please check in the truck first before checking out.');
//   }

//   try {
//     // 4. Send request to update truck status (either Check In or Check Out)
//     const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//       truckNo,
//       plantName: selectedPlant,
//       type,
//       dispatchDate,
//       invoicenumber: type === 'Check Out' ? invoicenumber : '',  // Include invoiceNo only for Check Out
//       quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//     });

//     // 5. Handle successful response
//     if (response.data.message?.includes('✅')) {
//       setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));

//       // If Check Out, remove from checked-in list
//       if (type === 'Check Out') {
//         setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//       } else {
//         setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
//       }

//       toast.success(response.data.message);

//       // Reset form after success
//       setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
//       setQuantityPanels([]);
//     } else {
//       toast.error(response.data.message || 'Failed to update status');
//     }
//   } catch (err) {
//     console.error('Error:', err);
//     toast.error(err.response?.data?.message || 'Something went wrong.');
//   }
// };



//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Left Panel */}
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel */}
//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-[2px] z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = Math.max(...quantityPanels.map(p => p.quantity || 0), 0) ? (panel.quantity / Math.max(...quantityPanels.map(p => p.quantity || 0))) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img src={truckImage} alt="Truck" className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" style={{ height: '65%' }} />
//           </div>

//           <div className="col-span-3 flex justify-center gap-6 font-semibold text-sm">
//             <div>From: <span className="text-blue-800">{fromPlant}</span></div>
//             <div>Next: <span className="text-green-800">{nextPlant}</span></div>
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />

//           {/* Invoice Number (conditionally displayed for Checkout) */}
//           {checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo) && (
//             <input 
//               name="invoiceNo" 
//               value={formData.invoiceNo} 
//               onChange={handleChange} 
//               placeholder="Invoice No" 
//               className="w-full border px-4 py-2 rounded" 
//             />
//           )}

//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />

//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import truckImage from './assets/Truck.png';
// import { useNavigate } from 'react-router-dom';
// import CancelButton from './CancelButton';

// const API_URL = import.meta.env.VITE_API_URL;

// function GateKeeper() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     truckNo: '',
//     dispatchDate: new Date().toISOString().split('T')[0],
//     invoiceNo: '',
//     remarks: 'This is a system-generated remark.',
//   });

//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlant, setSelectedPlant] = useState('');
//   const [truckNumbers, setTruckNumbers] = useState([]);
//   const [checkedInTrucks, setCheckedInTrucks] = useState([]);
//   const [quantityPanels, setQuantityPanels] = useState([]);
//   const [fromPlant, setFromPlant] = useState('—');
//   const [nextPlant, setNextPlant] = useState('—');

//   useEffect(() => {
//     const userId = localStorage.getItem('userId');
//     const role = localStorage.getItem('role');
//     const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
//     const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

//     axios.get(`${API_URL}/api/plants`, {
//       headers: { userid: userId, role }
//     })
//       .then(res => {
//         const filtered = res.data.filter(plant => {
//           const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
//           return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
//         });
//         setPlantList(filtered);
//       })
//       .catch(err => {
//         console.error('❌ Error fetching plants:', err);
//         toast.error('Failed to fetch plant list');
//       });
//   }, []);

//   useEffect(() => {
//     if (!selectedPlant) return;

//     setFormData(prev => ({
//       ...prev,
//       truckNo: '',
//       dispatchDate: new Date().toISOString().split('T')[0],
//       invoiceNo: '',
//       remarks: 'This is a system-generated remark.'
//     }));
//     setCheckedInTrucks([]);
//     setQuantityPanels([]);

//     axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
//       .then(res => setTruckNumbers(res.data))
//       .catch(err => console.error('Error fetching trucks:', err));

//     axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
//       .then(res => setCheckedInTrucks(res.data))
//       .catch(err => console.error('Error fetching checked-in trucks:', err));
//   }, [selectedPlant]);

//   const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
//   const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

//   const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

//   const handlePlantChange = (e) => {
//     setSelectedPlant(e.target.value);
//   };

//   const handleTruckSelect = async (truckNo) => {
//     setFormData(prev => ({ ...prev, truckNo }));

//     try {
//       const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
//         params: { plantName: selectedPlant, truckNo }
//       });
//       const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
//       const sorted = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
//       setQuantityPanels(sorted);

//       setFormData(prev => ({
//         ...prev,
//         remarks: remarksRes.data.remarks || 'No remarks available.',
//       }));

//       const currentIndex = sorted.findIndex(p => p.plantname === selectedPlant);
//       setFromPlant(currentIndex > 0 ? sorted[currentIndex - 1]?.plantname : '—');
//       setNextPlant(currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1]?.plantname : '—');
//     } catch (err) {
//       console.error('Error fetching data:', err);
//       setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
//     }
//   };

//   const handleCheckedInClick = (truckNo) => {
//     handleTruckSelect(truckNo);

//     const checkedInTruck = checkedInTrucks.find(t => getTruckNo(t) === truckNo);
    
//     if (checkedInTruck) {
//       setFormData(prev => ({
//         ...prev,
//         invoiceNo: checkedInTruck.invoiceNo || '',  // Set invoice number
//       }));
//     }
//   };

//   const handleSubmit = async (type) => {
//     const { truckNo, dispatchDate, invoiceNo } = formData;

//     if (!selectedPlant) return toast.warn('Please select a plant first.');
//     if (!truckNo) return toast.warn('🚛 Please select a truck number.');
//     if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

//     try {
//       const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
//         params: { truckNo, plantName: selectedPlant }
//       });
//       const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;

//       if (hasPending && !canProceed) {
//         return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
//       }
//     } catch (error) {
//       console.error('Priority check error:', error);
//       toast.error('❌ Error checking priority status');
//       return;
//     }

//     if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.error('🚫 This truck is already checked in!');
//     }

//     if (type === 'Check Out' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
//       return toast.warn('🚛 Please check in the truck first before checking out.');
//     }

//     try {
//       const response = await axios.post(`${API_URL}/api/update-truck-status`, {
//         truckNo,
//         plantName: selectedPlant,
//         type,
//         dispatchDate,
//         invoicenumber: type === 'Check Out' ? invoiceNo : '',  
//         quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
//       });

//       if (response.data.message?.includes('✅')) {
//         setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         if (type === 'Check Out') {
//           setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
//         } else {
//           setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
//         }

//         toast.success(response.data.message);
//         setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
//         setQuantityPanels([]);
//       } else {
//         toast.error(response.data.message || 'Failed to update status');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       toast.error(err.response?.data?.message || 'Something went wrong.');
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
//       <CancelButton />
//       <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Left Panel */}
//         <div className="space-y-4">
//           <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
//             <option value="">Select Plant</option>
//             {plantList.map((plant, i) => (
//               <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
//             ))}
//           </select>

//           <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
//             <h3 className="font-bold text-blue-700">Truck List</h3>
//             {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
//             <ul>
//               {truckNumbers.map((t, i) => (
//                 <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
//                   🚛 {getTruckNo(t)}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Center Panel */}
//         <div className="space-y-4">
//           <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
//             <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-[2px] z-10">
//               {quantityPanels.map((panel, index) => {
//                 const height = Math.max(...quantityPanels.map(p => p.quantity || 0), 0) ? (panel.quantity / Math.max(...quantityPanels.map(p => p.quantity || 0))) * 100 : 0;
//                 const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
//                 return (
//                   <div
//                     key={index}
//                     className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
//                     style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
//                     title={`${panel.plantname}: ${panel.quantity}`}
//                   >
//                     <div className="flex items-center gap-[2px]">
//                       <span>📦</span>
//                       <span>{panel.quantity}</span>
//                     </div>
//                     <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
//                   </div>
//                 );
//               })}
//             </div>
//             <img src={truckImage} alt="Truck" className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" style={{ height: '65%' }} />
//           </div>

//           <div className="col-span-3 flex justify-center gap-6 font-semibold text-sm">
//             <div>From: <span className="text-blue-800">{fromPlant}</span></div>
//             <div>Next: <span className="text-green-800">{nextPlant}</span></div>
//           </div>

//           <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
//           <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />

//           {/* Invoice Number (conditionally displayed for Checkout) */}
//           {checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo) && (
//             <input 
//               name="invoiceNo" 
//               value={formData.invoiceNo} 
//               onChange={handleChange} 
//               placeholder="Invoice No" 
//               className="w-full border px-4 py-2 rounded" 
//             />
//           )}

//           <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />

//           <div className="flex gap-4">
//             <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
//             <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
//           <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
//           {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
//           <ul>
//             {checkedInTrucks.map((t, i) => (
//               <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
//                 ✓ {getTruckNo(t)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
//     </div>
//   );
// }

// export default GateKeeper;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import truckImage from './assets/Truck.png';
import { useNavigate } from 'react-router-dom';
import CancelButton from './CancelButton';

const API_URL = import.meta.env.VITE_API_URL;

function GateKeeper() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    truckNo: '',
    dispatchDate: new Date().toISOString().split('T')[0],
    invoiceNo: '',
    remarks: 'This is a system-generated remark.',
  });

  const [plantList, setPlantList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState('');
  const [truckNumbers, setTruckNumbers] = useState([]);
  const [checkedInTrucks, setCheckedInTrucks] = useState([]);
  const [quantityPanels, setQuantityPanels] = useState([]);
  const [fromPlant, setFromPlant] = useState('—');
  const [nextPlant, setNextPlant] = useState('—');

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
    const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

    axios.get(`${API_URL}/api/plants`, {
      headers: { userid: userId, role }
    })
      .then(res => {
        const filtered = res.data.filter(plant => {
          const pid = String(plant.PlantID || plant.PlantId || plant.plantid || '');
          return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
        });
        setPlantList(filtered);
      })
      .catch(err => {
        console.error('❌ Error fetching plants:', err);
        toast.error('Failed to fetch plant list');
      });
  }, []);

  useEffect(() => {
    if (!selectedPlant) return;

    setFormData(prev => ({
      ...prev,
      truckNo: '',
      dispatchDate: new Date().toISOString().split('T')[0],
      invoiceNo: '',
      remarks: 'This is a system-generated remark.'
    }));
    setCheckedInTrucks([]);
    setQuantityPanels([]);

    axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
      .then(res => setTruckNumbers(res.data))
      .catch(err => console.error('Error fetching trucks:', err));

    axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
      .then(res => setCheckedInTrucks(res.data))
      .catch(err => console.error('Error fetching checked-in trucks:', err));
  }, [selectedPlant]);

  const getTruckNo = truck => truck.TruckNo || truck.truckno || truck.truck_no || '';
  const getPlantName = plant => typeof plant === 'string' ? plant : (plant.PlantName || plant.plantname || 'Unknown');

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePlantChange = (e) => {
    setSelectedPlant(e.target.value);
  };

  const handleTruckSelect = async (truckNo) => {
    setFormData(prev => ({ ...prev, truckNo }));

    try {
      const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
        params: { plantName: selectedPlant, truckNo }
      });
      const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
      const sorted = [...quantityRes.data].sort((a, b) => a.priority - b.priority);
      setQuantityPanels(sorted);

      setFormData(prev => ({
        ...prev,
        remarks: remarksRes.data.remarks || 'No remarks available.',
      }));

      const currentIndex = sorted.findIndex(p => p.plantname === selectedPlant);
      setFromPlant(currentIndex > 0 ? sorted[currentIndex - 1]?.plantname : '—');
      setNextPlant(currentIndex >= 0 && currentIndex < sorted.length - 1 ? sorted[currentIndex + 1]?.plantname : '—');
    } catch (err) {
      console.error('Error fetching data:', err);
      setFormData(prev => ({ ...prev, remarks: 'No remarks available or error fetching remarks.' }));
    }
  };

  const handleCheckedInClick = (truckNo) => {
    handleTruckSelect(truckNo);

    const checkedInTruck = checkedInTrucks.find(t => getTruckNo(t) === truckNo);
    
    if (checkedInTruck) {
      setFormData(prev => ({
        ...prev,
        invoiceNo: checkedInTruck.invoiceNo || '',  // Set invoice number
      }));
    }
  };

  const handleSubmit = async (type) => {
    const { truckNo, dispatchDate, invoiceNo } = formData;

    if (!selectedPlant) return toast.warn('Please select a plant first.');
    if (!truckNo) return toast.warn('🚛 Please select a truck number.');
    if (type === 'Check Out' && !invoiceNo) return toast.warn('🚨 Please enter an invoice number before checking out.');

    try {
      const priorityRes = await axios.get(`${API_URL}/api/check-priority-status`, {
        params: { truckNo, plantName: selectedPlant }
      });
      const { hasPending, canProceed, nextPriority, nextPlant } = priorityRes.data;

      if (hasPending && !canProceed) {
        return toast.error(`🚫 Priority ${nextPriority} at ${nextPlant} must be completed first.`);
      }
    } catch (error) {
      console.error('Priority check error:', error);
      toast.error('❌ Error checking priority status');
      return;
    }

    if (type === 'Check In' && checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
      return toast.error('🚫 This truck is already checked in!');
    }

    if (type === 'Check Out' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
      return toast.warn('🚛 Please check in the truck first before checking out.');
    }

    try {
      const response = await axios.post(`${API_URL}/api/update-truck-status`, {
        truckNo,
        plantName: selectedPlant,
        type,
        dispatchDate,
        invoicenumber: type === 'Check Out' ? invoiceNo : '',  
        quantity: quantityPanels.reduce((acc, p) => acc + (p.quantity || 0), 0),
      });

      if (response.data.message?.includes('✅')) {
        setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
        if (type === 'Check Out') {
          setCheckedInTrucks(prev => prev.filter(t => getTruckNo(t) !== truckNo));
        } else {
          setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo, invoiceNo }]);
        }

        toast.success(response.data.message);
        setFormData(prev => ({ ...prev, truckNo: '', invoiceNo: '' }));
        setQuantityPanels([]);
      } else {
        toast.error(response.data.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-indigo-100 p-6">
      <CancelButton />
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Panel */}
        <div className="space-y-4">
          <select value={selectedPlant} onChange={handlePlantChange} className="w-full border rounded px-4 py-2">
            <option value="">Select Plant</option>
            {plantList.map((plant, i) => (
              <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
            ))}
          </select>

          <div className="bg-blue-100 rounded p-4 h-64 overflow-y-auto">
            <h3 className="font-bold text-blue-700">Truck List</h3>
            {truckNumbers.length === 0 && <p className="text-gray-400 italic">No trucks available</p>}
            <ul>
              {truckNumbers.map((t, i) => (
                <li key={i} onClick={() => handleTruckSelect(getTruckNo(t))} className="cursor-pointer hover:text-blue-600">
                  🚛 {getTruckNo(t)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Center Panel */}
        <div className="space-y-4">
          <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
            <div className="absolute bottom-[51px] left-[50px] h-[75px] w-[calc(100%-170px)] max-w-[370px] flex items-end gap-[2px] z-10">
              {quantityPanels.map((panel, index) => {
                const height = Math.max(...quantityPanels.map(p => p.quantity || 0), 0) ? (panel.quantity / Math.max(...quantityPanels.map(p => p.quantity || 0))) * 100 : 0;
                const bgColors = ['bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-red-500'];
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-end text-white text-[10px] ${bgColors[index % bgColors.length]} rounded-t-md transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer`}
                    style={{ height: `${height}%`, width: `${100 / quantityPanels.length}%` }}
                    title={`${panel.plantname}: ${panel.quantity}`}
                  >
                    <div className="flex items-center gap-[2px]">
                      <span>📦</span>
                      <span>{panel.quantity}</span>
                    </div>
                    <div className="whitespace-nowrap text-[8px]">{panel.plantname}</div>
                  </div>
                );
              })}
            </div>
            <img src={truckImage} alt="Truck" className="absolute bottom-0 left-0 w-full h-auto object-contain z-0" style={{ height: '65%' }} />
          </div>

          <div className="col-span-3 flex justify-center gap-6 font-semibold text-sm">
            <div>From: <span className="text-blue-800">{fromPlant}</span></div>
            <div>Next: <span className="text-green-800">{nextPlant}</span></div>
          </div>

          <input name="truckNo" value={formData.truckNo} onChange={handleChange} placeholder="Truck No" className="w-full border px-4 py-2 rounded" />
          <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border px-4 py-2 rounded" />

          {/* Invoice Number (conditionally displayed for Checkout) */}
          {checkedInTrucks.some(t => getTruckNo(t) === formData.truckNo) && (
            <input 
              name="invoiceNo" 
              value={formData.invoiceNo} 
              onChange={handleChange} 
              placeholder="Invoice No" 
              className="w-full border px-4 py-2 rounded" 
            />
          )}

          <textarea name="remarks" readOnly value={formData.remarks} className="w-full border px-4 py-2 bg-gray-100 rounded" rows="3" />

          <div className="flex gap-4">
            <button onClick={() => handleSubmit('Check In')} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Check In</button>
            <button onClick={() => handleSubmit('Check Out')} className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">Check Out</button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-green-100 rounded p-4 h-full overflow-y-auto">
          <h3 className="font-bold text-green-700 mb-2">Checked In Trucks</h3>
          {checkedInTrucks.length === 0 && <p className="text-gray-400 italic">No checked-in trucks</p>}
          <ul>
            {checkedInTrucks.map((t, i) => (
              <li key={i} onClick={() => handleCheckedInClick(getTruckNo(t))} className="cursor-pointer hover:text-green-600">
                ✓ {getTruckNo(t)}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default GateKeeper;
