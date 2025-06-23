
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
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const API_URL = import.meta.env.VITE_API_URL;

function GateKeeper() {
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
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/plants`)
      .then(res => setPlantList(res.data))
      .catch(err => console.error('Error fetching plants:', err));
  }, []);

  useEffect(() => {
    if (selectedPlant) {
      axios.get(`${API_URL}/api/trucks?plantName=${selectedPlant}`)
        .then(res => setTruckNumbers(res.data))
        .catch(err => console.error('Error fetching trucks:', err));

      axios.get(`${API_URL}/api/checked-in-trucks?plantName=${selectedPlant}`)
        .then(res => setCheckedInTrucks(res.data))
        .catch(err => console.error('Error fetching checked-in trucks:', err));
    }
  }, [selectedPlant]);

  const getTruckNo = (truck) => truck.TruckNo || truck.truckno || truck.truck_no || '';
  const getPlantName = (plant) => plant.PlantName || plant.plantname || plant.plant_name || plant || '';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlantChange = (e) => {
    setSelectedPlant(e.target.value);
    setCheckedInTrucks([]);
    setQuantityPanels([]);
    setChartData([]);
    setFormData(prev => ({
      ...prev,
      truckNo: '',
      dispatchDate: new Date().toISOString().split('T')[0],
    }));
  };

  const handleTruckSelect = async (truckNo) => {
    setFormData(prev => ({ ...prev, truckNo }));

    try {
      const remarksRes = await axios.get(`${API_URL}/api/fetch-remarks`, {
        params: { plantName: selectedPlant, truckNo }
      });

      const quantityRes = await axios.get(`${API_URL}/api/truck-plant-quantities?truckNo=${truckNo}`);
      setQuantityPanels(quantityRes.data);
      setChartData(quantityRes.data);

      setFormData(prev => ({
        ...prev,
        remarks: remarksRes.data.remarks || 'No remarks available.'
      }));
    } catch (err) {
      console.error('Error fetching data:', err);
      setFormData(prev => ({
        ...prev,
        remarks: 'No remarks available or error fetching remarks.'
      }));
    }
  };

  const handleSubmit = async (type) => {
    const { truckNo } = formData;
    if (!truckNo) {
      toast.warn('🚛 Please select a truck number.');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/api/update-truck-status`, {
        truckNo,
        plantName: selectedPlant,
        type
      });

      setTruckNumbers(prev => prev.filter(t => getTruckNo(t) !== truckNo));
      if (type === 'Check In' && !checkedInTrucks.some(t => getTruckNo(t) === truckNo)) {
        setCheckedInTrucks(prev => [...prev, { TruckNo: truckNo }]);
      }

      toast.success(res.data.message);
      setFormData(prev => ({ ...prev, truckNo: '' }));
      setQuantityPanels([]);
      setChartData([]);
    } catch (err) {
      console.error('Error:', err);
      toast.error('⚠️ Error while updating status');
    }
  };

  const panelColors = ['bg-green-400', 'bg-blue-400', 'bg-yellow-400', 'bg-red-400'];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left Panel */}
        <div className="col-span-1 space-y-4">
          <select
            value={selectedPlant}
            onChange={handlePlantChange}
            className="w-full border px-4 py-2 rounded-md shadow-sm"
          >
            <option value="">Select Plant</option>
            {plantList.map((plant, i) => (
              <option key={i} value={getPlantName(plant)}>{getPlantName(plant)}</option>
            ))}
          </select>

          <div className="bg-blue-100 rounded-lg p-4 h-[300px] overflow-y-auto">
            <h3 className="text-md font-semibold text-blue-800 mb-2">Truck List</h3>
            <ul className="space-y-1 text-sm text-gray-700 cursor-pointer">
              {truckNumbers.map((truck, index) => (
                <li
                  key={index}
                  onClick={() => handleTruckSelect(getTruckNo(truck))}
                  className="hover:text-blue-600"
                >
                  {getTruckNo(truck)}
                </li>
              ))}
              {truckNumbers.length === 0 && (
                <li className="text-gray-400 italic">No trucks available</li>
              )}
            </ul>
          </div>
        </div>

        {/* Center Panel - Truck Image with Panels */}
        <div className="col-span-1 space-y-4">
          <div className="relative h-56 w-full bg-blue-200 rounded-lg overflow-hidden shadow-md">
            <img
              src="https://pngimg.com/uploads/truck/truck_PNG16234.png"
              alt="Truck"
              className="absolute bottom-0 left-0 w-full h-40 object-contain"
            />
            <div className="absolute bottom-16 left-6 flex items-end gap-2">
              {quantityPanels.map((panel, index) => (
                <div
                  key={index}
                  className={`text-xs text-center text-white ${panelColors[index % panelColors.length]} rounded-t-md`}
                  style={{ height: `${Math.min(panel.quantity / 5, 120)}px`, width: '50px' }}
                >
                  <div className="text-[10px]">{panel.plantname}</div>
                  <div className="font-bold">{panel.quantity}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <input name="truckNo" value={formData.truckNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Truck No" />
            <input name="dispatchDate" type="date" value={formData.dispatchDate} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" />
            <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} className="w-full border rounded px-4 py-2 shadow-sm" placeholder="Invoice No" />
            <textarea name="remarks" value={formData.remarks} readOnly className="w-full border rounded px-4 py-2 shadow-sm bg-gray-100 text-gray-700 resize-none h-24" />
          </div>

          <div className="flex justify-between mt-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => handleSubmit('Check In')}>Check In</button>
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={() => handleSubmit('Check Out')}>Check Out</button>
          </div>
        </div>

        {/* Right Panel - Checked-In Trucks */}
        <div className="col-span-1">
          <div className="bg-green-100 rounded-lg p-4 h-full overflow-y-auto">
            <h3 className="text-lg font-bold text-green-800 mb-2">Checked In Trucks</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {checkedInTrucks.map((truck, idx) => (
                <li
                  key={idx}
                  className="hover:text-green-600 cursor-pointer"
                  onClick={() => handleTruckSelect(getTruckNo(truck))}
                >
                  {getTruckNo(truck)}
                </li>
              ))}
              {checkedInTrucks.length === 0 && (
                <li className="text-gray-400 italic">No checked-in trucks</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="max-w-5xl mx-auto mt-8 p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Plant-wise Quantity Chart</h2>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plantname" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No data to display. Select a truck.</p>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </div>
  );
}

export default GateKeeper;

