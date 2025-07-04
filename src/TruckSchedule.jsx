// import React, { useState } from 'react';
// import axios from 'axios';
// import truckImage from './assets/Truck.png.png';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckSchedule() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [status, setStatus] = useState('All');
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchData = async (selectedStatus) => {
//     if (!fromDate || !toDate) {
//       setError('Please select dates');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setStatus(selectedStatus);

//     try {
//       const res = await axios.get(`${API_URL}/api/truck-schedule`, {
//         params: {
//           fromDate,
//           toDate,
//           status: selectedStatus,
//         },
//       });
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4 flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-indigo-700 mb-6">🚚 Truck Schedule</h1>

//       <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-lg mb-6 w-full max-w-4xl">
//         <div>
//           <label className="block text-sm font-medium">From</label>
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium">To</label>
//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//             className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//         </div>

//         <div className="flex gap-2 mt-6 sm:mt-0">
//           {['Dispatched', 'InTransit', 'CheckedOut', 'All'].map((btn) => (
//             <button
//               key={btn}
//               onClick={() => fetchData(btn)}
//               className={`px-4 py-2 rounded-lg font-semibold ${
//                 status === btn ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'
//               } hover:bg-indigo-200`}
//             >
//               {btn}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="relative bg-white shadow-xl rounded-2xl p-6 w-full max-w-5xl text-center">
//       <img src={truckImage} alt="Truck" className="mx-auto h-40 mb-4" />


//         {loading && <p className="text-indigo-600 font-medium">Loading...</p>}
//         {error && <p className="text-red-500 font-medium">{error}</p>}
//         {!loading && data.length === 0 && !error && (
//           <p className="text-gray-500">No trucks found for selected filters</p>
//         )}

//         {data.length > 0 && (
//           <table className="min-w-full mt-4 border border-gray-300 rounded-xl overflow-hidden text-left">
//             <thead className="bg-indigo-100 text-indigo-700">
//               <tr>
//                 <th className="px-4 py-2">Truck No.</th>
//                 <th className="px-4 py-2">Plant</th>
//                 <th className="px-4 py-2">Check-In Time</th>
//                 <th className="px-4 py-2">Check-Out Time</th>
//                 <th className="px-4 py-2">Loading Slip</th>
//                 <th className="px-4 py-2">Qty</th>
//                 <th className="px-4 py-2">Freight</th>
//                 <th className="px-4 py-2">Priority</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, i) => (
//                 <tr key={i} className="odd:bg-gray-50">
//                   <td className="px-4 py-2">{item.truckNo || '—'}</td>
//                   <td className="px-4 py-2">{item.plantName || '—'}</td>
//                   <td className="px-4 py-2">
//                     {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                   </td>
//                   <td className="px-4 py-2">
//                     {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                   </td>
//                   <td className="px-4 py-2">{item.loadingSlipNo || '—'}</td>
//                   <td className="px-4 py-2">{item.qty ?? '—'}</td>
//                   <td className="px-4 py-2">{item.freight ?? '—'}</td>
//                   <td className="px-4 py-2">{item.priority ?? '—'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

/////////////////////////



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import truckImage from './assets/Truck.png.png';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckSchedule() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedPlants, setSelectedPlants] = useState([]);
//   const [plantList, setPlantList] = useState([]);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`).then((res) => {
//       setPlantList(res.data);
//       setSelectedPlants(res.data.map((p) => p.name)); // Default select all
//     });
//   }, []);

//   const handleSelectAll = () => {
//     setSelectedPlants(plantList.map((p) => p.name));
//   };

//   const handleDeselectAll = () => {
//     setSelectedPlants([]);
//   };

//   const handleCheckboxChange = (plantName) => {
//     setSelectedPlants((prev) =>
//       prev.includes(plantName)
//         ? prev.filter((p) => p !== plantName)
//         : [...prev, plantName]
//     );
//   };

//   const fetchData = async (selectedStatus) => {
//     if (!fromDate || !toDate) {
//       setError('Please select dates');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setStatus(selectedStatus);

//     try {
//       const res = await axios.get(`${API_URL}/api/truck-schedule`, {
//         params: {
//           fromDate,
//           toDate,
//           status: selectedStatus,
//           plants: selectedPlants.join(',')
//         },
//       });
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4 flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-indigo-700 mb-6">🚚 Truck Schedule</h1>

//       <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-lg mb-4 w-full max-w-5xl">
//         <div>
//           <label className="block text-sm font-medium">From</label>
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             className="border rounded-lg px-3 py-2"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">To</label>
//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//             className="border rounded-lg px-3 py-2"
//           />
//         </div>
//         <div className="flex gap-2 mt-6 sm:mt-0">
//           {['Dispatched', 'InTransit', 'CheckedOut', 'All'].map((btn) => (
//             <button
//               key={btn}
//               onClick={() => fetchData(btn)}
//               className={`px-4 py-2 rounded-lg font-semibold ${
//                 status === btn ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'
//               }`}
//             >
//               {btn}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-5xl mb-4">
//         <h2 className="text-lg font-semibold mb-2">Select Plants</h2>
//         <div className="flex gap-4 mb-2">
//           <button onClick={handleSelectAll} className="bg-green-500 text-white px-4 py-2 rounded-lg">Select All</button>
//           <button onClick={handleDeselectAll} className="bg-red-500 text-white px-4 py-2 rounded-lg">Deselect</button>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
//           {plantList.map((plant, i) => (
//             <label key={i} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={selectedPlants.includes(plant.name)}
//                 onChange={() => handleCheckboxChange(plant.name)}
//               />
//               {plant.name}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="relative bg-white shadow-xl rounded-2xl p-6 w-full max-w-5xl text-center">
//         <img src={truckImage} alt="Truck" className="mx-auto h-40 mb-4" />

//         {loading && <p className="text-indigo-600 font-medium">Loading...</p>}
//         {error && <p className="text-red-500 font-medium">{error}</p>}
//         {!loading && data.length === 0 && !error && (
//           <p className="text-gray-500">No trucks found for selected filters</p>
//         )}

//         {data.length > 0 && (
//           <table className="min-w-full mt-4 border border-gray-300 rounded-xl overflow-hidden text-left">
//             <thead className="bg-indigo-100 text-indigo-700">
//               <tr>
//                 <th className="px-4 py-2">Truck No.</th>
//                 <th className="px-4 py-2">Plant</th>
//                 <th className="px-4 py-2">Check-In Time</th>
//                 <th className="px-4 py-2">Check-Out Time</th>
//                 <th className="px-4 py-2">Loading Slip</th>
//                 <th className="px-4 py-2">Qty</th>
//                 <th className="px-4 py-2">Freight</th>
//                 <th className="px-4 py-2">Priority</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, i) => (
//                 <tr key={i} className="odd:bg-gray-50">
//                   <td className="px-4 py-2">{item.truckNo || '—'}</td>
//                   <td className="px-4 py-2">{item.plantName || '—'}</td>
//                   <td className="px-4 py-2">{item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}</td>
//                   <td className="px-4 py-2">{item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}</td>
//                   <td className="px-4 py-2">{item.loadingSlipNo || '—'}</td>
//                   <td className="px-4 py-2">{item.qty ?? '—'}</td>
//                   <td className="px-4 py-2">{item.freight ?? '—'}</td>
//                   <td className="px-4 py-2">{item.priority ?? '—'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

///////////////


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import truckImage from './assets/Truck.png.png';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckSchedule() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [status, setStatus] = useState('All');
//   const [selectedPlants, setSelectedPlants] = useState([]);
//   const [plantList, setPlantList] = useState([]);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`, {
//       headers: {
//         userid: localStorage.getItem('userId'),
//         role: localStorage.getItem('role'),
//       },
//     }).then((res) => {
//       setPlantList(res.data);
//       setSelectedPlants(res.data.map((p) => p.plantid.toString())); // ✅ default all IDs
//     });
//   }, []);

//   const handleSelectAll = () => {
//     setSelectedPlants(plantList.map((p) => p.plantid.toString()));
//   };

//   const handleDeselectAll = () => {
//     setSelectedPlants([]);
//   };

//   const handleCheckboxChange = (plantId) => {
//     setSelectedPlants((prev) =>
//       prev.includes(plantId)
//         ? prev.filter((id) => id !== plantId)
//         : [...prev, plantId]
//     );
//   };

//   const fetchData = async (selectedStatus) => {
//     if (!fromDate || !toDate || selectedPlants.length === 0) {
//       setError('Please select all filters');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setStatus(selectedStatus);

//     try {
//       const res = await axios.get(`${API_URL}/api/truck-schedule`, {
//         params: {
//           fromDate,
//           toDate,
//           status: selectedStatus,
//           plant: JSON.stringify(selectedPlants),
//         },
//       });
//       setData(res.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-4 flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-indigo-700 mb-6">🚚 Truck Schedule</h1>

//       <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-lg mb-4 w-full max-w-5xl">
//         <div>
//           <label className="block text-sm font-medium">From</label>
//           <input
//             type="date"
//             value={fromDate}
//             onChange={(e) => setFromDate(e.target.value)}
//             className="border rounded-lg px-3 py-2"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium">To</label>
//           <input
//             type="date"
//             value={toDate}
//             onChange={(e) => setToDate(e.target.value)}
//             className="border rounded-lg px-3 py-2"
//           />
//         </div>
//         <div className="flex gap-2 mt-6 sm:mt-0">
//           {['Dispatched', 'InTransit', 'CheckedOut', 'All'].map((btn) => (
//             <button
//               key={btn}
//               onClick={() => fetchData(btn)}
//               className={`px-4 py-2 rounded-lg font-semibold ${
//                 status === btn ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'
//               }`}
//             >
//               {btn}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-5xl mb-4">
//         <h2 className="text-lg font-semibold mb-2">Select Plants</h2>
//         <div className="flex gap-4 mb-2">
//           <button onClick={handleSelectAll} className="bg-green-500 text-white px-4 py-2 rounded-lg">Select All</button>
//           <button onClick={handleDeselectAll} className="bg-red-500 text-white px-4 py-2 rounded-lg">Deselect</button>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
//           {plantList.map((plant, i) => (
//             <label key={i} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={selectedPlants.includes(plant.plantid.toString())}
//                 onChange={() => handleCheckboxChange(plant.plantid.toString())}
//               />
//               {plant.plantname}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="relative bg-white shadow-xl rounded-2xl p-6 w-full max-w-5xl text-center">
//         <img src={truckImage} alt="Truck" className="mx-auto h-40 mb-4" />

//         {loading && <p className="text-indigo-600 font-medium">Loading...</p>}
//         {error && <p className="text-red-500 font-medium">{error}</p>}
//         {!loading && data.length === 0 && !error && (
//           <p className="text-gray-500">No trucks found for selected filters</p>
//         )}

//         {data.length > 0 && (
//           <table className="min-w-full mt-4 border border-gray-300 rounded-xl overflow-hidden text-left">
//             <thead className="bg-indigo-100 text-indigo-700">
//               <tr>
//                 <th className="px-4 py-2">Truck No.</th>
//                 <th className="px-4 py-2">Plant</th>
//                 <th className="px-4 py-2">Check-In Time</th>
//                 <th className="px-4 py-2">Check-Out Time</th>
//                 <th className="px-4 py-2">Loading Slip</th>
//                 <th className="px-4 py-2">Qty</th>
//                 <th className="px-4 py-2">Freight</th>
//                 <th className="px-4 py-2">Priority</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item, i) => (
//                 <tr key={i} className="odd:bg-gray-50">
//                   <td className="px-4 py-2">{item.truckNo || '—'}</td>
//                   <td className="px-4 py-2">{item.plantName || '—'}</td>
//                   <td className="px-4 py-2">{item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}</td>
//                   <td className="px-4 py-2">{item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}</td>
//                   <td className="px-4 py-2">{item.loadingSlipNo || '—'}</td>
//                   <td className="px-4 py-2">{item.qty ?? '—'}</td>
//                   <td className="px-4 py-2">{item.freight ?? '—'}</td>
//                   <td className="px-4 py-2">{item.priority ?? '—'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }
///////////////////////////////////////////final working code today 


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import truckImage from './assets/Truck.png.png'; // अपनी इमेज पथ के अनुसार बदलें

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckSchedule() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [status, setStatus] = useState('All');
//   const [truckSearch, setTruckSearch] = useState('');
//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlants, setSelectedPlants] = useState([]);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`, {
//       headers: {
//         userid: localStorage.getItem('userId'),
//         role: localStorage.getItem('role'),
//       },
//     })
//     .then(res => {
//       setPlantList(res.data);
//       setSelectedPlants(res.data.map(p => p.plantid.toString())); // default all select
//     })
//     .catch(() => setError('प्लांट लोड करने में त्रुटि'));
//   }, []);

//   const togglePlant = id =>
//     setSelectedPlants(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   const selectAll = () =>
//     setSelectedPlants(plantList.map(p => p.plantid.toString()));
//   const deselectAll = () => setSelectedPlants([]);

//   const fetchData = async (st, tr = '') => {
//     if (!fromDate || !toDate || selectedPlants.length === 0) {
//       setError('कृपया सभी फिल्टर चुनें');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     setStatus(st);

//     try {
//       const res = await axios.get(`${API_URL}/api/truck-schedule`, {
//         params: {
//           fromDate,
//           toDate,
//           status: st,
//           plant: JSON.stringify(selectedPlants),
//           truckNo: tr || undefined,
//         },
//       });

//       let fetched = res.data;
//       if (tr) {
//         fetched = fetched.filter(item =>
//           item.truckNo?.toLowerCase().includes(tr.toLowerCase())
//         ); // frontend fallback filter :contentReference[oaicite:1]{index=1}
//       }
//       setData(fetched);
//     } catch {
//       setError('डेटा लाने में समस्या');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-indigo-700 mb-6">🚚 ट्रक अनुसूची</h1>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow w-full max-w-5xl mb-4">
//         <div>
//           <label className="block">From</label>
//           <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)}
//                  className="border rounded px-3 py-2"/>
//         </div>
//         <div>
//           <label className="block">To</label>
//           <input type="date" value={toDate} onChange={e => setToDate(e.target.value)}
//                  className="border rounded px-3 py-2"/>
//         </div>
//         <div className="flex gap-2">
//           {['Dispatched','InTransit','CheckedOut','All'].map(btn => (
//             <button key={btn}
//               onClick={() => fetchData(btn, truckSearch)}
//               className={`px-4 py-2 rounded font-semibold ${
//                 status === btn ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-700'
//               }`}>
//               {btn}
//             </button>
//           ))}
//         </div>
//         <input type="text" placeholder="Truck No."
//                value={truckSearch} onChange={e => setTruckSearch(e.target.value)}
//                className="border rounded px-3 py-2 w-32"/>
//         <button onClick={() => fetchData(status, truckSearch)}
//                 className="px-4 py-2 bg-indigo-500 text-white rounded">
//           Search
//         </button>
//       </div>

//       {/* Plant selector */}
//       <div className="bg-white p-4 rounded-lg shadow w-full max-w-5xl mb-4">
//         <h2 className="text-lg font-semibold mb-2">Select Plants</h2>
//         <div className="flex gap-2 mb-2">
//           <button onClick={selectAll} className="bg-green-500 text-white px-4 py-2 rounded">
//             सब चुनें
//           </button>
//           <button onClick={deselectAll} className="bg-red-500 text-white px-4 py-2 rounded">
//             रद्द करें
//           </button>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
//           {plantList.map(p => (
//             <label key={p.plantid} className="flex items-center gap-2">
//               <input type="checkbox"
//                      checked={selectedPlants.includes(p.plantid.toString())}
//                      onChange={() => togglePlant(p.plantid.toString())}/>
//               {p.plantname}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Data display */}
//       <div className="bg-white p-6 shadow rounded-2xl w-full max-w-5xl overflow-x-auto">
//         <img src={truckImage} alt="Truck" className="mx-auto h-40 mb-4"/>

//         {loading && <p className="text-indigo-600">लोड हो रहा है…</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {!loading && !error && data.length === 0 && (
//           <p className="text-gray-500">कोई ट्रक नहीं मिला</p>
//         )}

//         {data.length > 0 && (
//           <table className="min-w-full table-auto border-collapse block md:table">
//             <thead className="bg-indigo-100 hidden md:table-header-group">
//               <tr className="table-row">
//                 {['Truck No','Plant','Check‑In','Check‑Out','Slip','Qty','Freight','Priority'].map(h => (
//                   <th key={h} className="px-4 py-2 text-left font-medium">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="block md:table-row-group">
//               {data.map((it,i) => (
//                 <tr key={i} className="bg-white md:bg-transparent md:table-row block mb-4 md:mb-0 rounded md:rounded-none">
//                   {['truckNo','plantName','checkInTime','checkOutTime','loadingSlipNo','qty','freight','priority'].map((k,idx) => {
//                     const val = k.includes('Time') && it[k] ? new Date(it[k]).toLocaleString() : it[k] ?? '—';
//                     const label = ['Truck No','Plant','Check‑In','Check‑Out','Slip','Qty','Freight','Priority'][idx];
//                     return (
//                       <td key={k} className="px-4 py-2 block md:table-cell whitespace-normal lg:whitespace-nowrap">
//                         <span className="font-semibold md:hidden">{label}: </span>{val}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

//////////////////////


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import truckImage from './assets/Truck.png'; // update path if needed

// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckSchedule() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [status, setStatus] = useState('All');
//   const [truckSearch, setTruckSearch] = useState('');
//   const [plantList, setPlantList] = useState([]);
//   const [selectedPlants, setSelectedPlants] = useState([]);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     axios.get(`${API_URL}/api/plants`, {
//       headers: {
//         userid: localStorage.getItem('userId'),
//         role: localStorage.getItem('role'),
//       }
//     })
//     .then(res => {
//       setPlantList(res.data);
//       setSelectedPlants(res.data.map(p => p.plantid.toString())); // default select all
//     })
//     .catch(() => setError('Failed to load plants'));
//   }, []);

//   const togglePlant = id =>
//     setSelectedPlants(prev =>
//       prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
//     );
//   const selectAll = () =>
//     setSelectedPlants(plantList.map(p => p.plantid.toString()));
//   const deselectAll = () => setSelectedPlants([]);

//   const fetchData = async (st, tr = '') => {
//     if (!fromDate || !toDate || selectedPlants.length === 0) {
//       setError('Please select all filters');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     setStatus(st);

//     try {
//       const res = await axios.get(`${API_URL}/api/truck-schedule`, {
//         params: {
//           fromDate,
//           toDate,
//           status: st,
//           plant: JSON.stringify(selectedPlants),
//           truckNo: tr || undefined,
//         },
//       });
//       let fetched = res.data;
//       if (tr) {
//         fetched = fetched.filter(item =>
//           item.truckNo?.toLowerCase().includes(tr.toLowerCase())
//         );
//       }
//       setData(fetched);
//     } catch {
//       setError('Failed to fetch data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen flex flex-col items-center">
//       <h1 className="text-3xl font-bold text-indigo-700 mb-6">🚚 Truck Schedule</h1>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow w-full max-w-5xl mb-4">
//         <div>
//           <label className="block">From</label>
//           <input
//             type="date"
//             value={fromDate}
//             onChange={e => setFromDate(e.target.value)}
//             className="border rounded px-3 py-2"
//           />
//         </div>
//         <div>
//           <label className="block">To</label>
//           <input
//             type="date"
//             value={toDate}
//             onChange={e => setToDate(e.target.value)}
//             className="border rounded px-3 py-2"
//           />
//         </div>
//         <div className="flex gap-2">
//           {['Dispatched', 'InTransit', 'CheckedOut', 'All'].map(btn => (
//             <button
//               key={btn}
//               onClick={() => fetchData(btn, truckSearch)}
//               className={`px-4 py-2 rounded font-semibold ${
//                 status === btn
//                   ? 'bg-indigo-600 text-white'
//                   : 'bg-indigo-100 text-indigo-700'
//               }`}
//             >
//               {btn}
//             </button>
//           ))}
//         </div>
//         <input
//           type="text"
//           placeholder="Truck No."
//           value={truckSearch}
//           onChange={e => setTruckSearch(e.target.value)}
//           className="border rounded px-3 py-2 w-32"
//         />
//         <button
//           onClick={() => fetchData(status, truckSearch)}
//           className="px-4 py-2 bg-indigo-500 text-white rounded"
//         >
//           Search
//         </button>
//       </div>

//       {/* Plant selector */}
//       <div className="bg-white p-4 rounded-lg shadow w-full max-w-5xl mb-4">
//         <h2 className="text-lg font-semibold mb-2">Select Plants</h2>
//         <div className="flex gap-2 mb-2">
//           <button
//             onClick={selectAll}
//             className="bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Select All
//           </button>
//           <button
//             onClick={deselectAll}
//             className="bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Deselect
//           </button>
//         </div>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
//           {plantList.map(p => (
//             <label key={p.plantid} className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={selectedPlants.includes(p.plantid.toString())}
//                 onChange={() => togglePlant(p.plantid.toString())}
//               />
//               {p.plantname}
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Table / cards display */}
//       <div className="bg-white p-6 shadow rounded-2xl w-full max-w-5xl overflow-x-auto">
//         <img src={truckImage} alt="Truck" className="mx-auto h-40 mb-4" />

//         {loading && <p className="text-indigo-600">Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}
//         {!loading && !error && data.length === 0 && (
//           <p className="text-gray-500">No trucks found</p>
//         )}

//         {data.length > 0 && (
//           <table className="min-w-full table-auto border-collapse block md:table">
//             <thead className="bg-indigo-100 hidden md:table-header-group">
//               <tr className="table-row">
//                 {[
//                   'Truck No',
//                   'Plant',
//                   'Check‑In',
//                   'Check‑Out',
//                   'Slip',
//                   'Qty',
//                   'Freight',
//                   'Priority'
//                 ].map(h => (
//                   <th
//                     key={h}
//                     className="px-4 py-2 text-left font-medium"
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="block md:table-row-group">
//               {data.map((item, idx) => (
//                 <tr
//                   key={idx}
//                   className="bg-white md:bg-transparent md:table-row block mb-4 md:mb-0 rounded md:rounded-none"
//                 >
//                   {[
//                     'truckNo',
//                     'plantName',
//                     'checkInTime',
//                     'checkOutTime',
//                     'loadingSlipNo',
//                     'qty',
//                     'freight',
//                     'priority'
//                   ].map((key, i) => {
//                     const raw = item[key];
//                     const value =
//                       key.includes('Time') && raw
//                         ? new Date(raw).toLocaleString()
//                         : raw ?? '—';
//                     const label = [
//                       'Truck No',
//                       'Plant',
//                       'Check‑In',
//                       'Check‑Out',
//                       'Slip',
//                       'Qty',
//                       'Freight',
//                       'Priority'
//                     ][i];
//                     return (
//                       <td
//                         key={key}
//                         className="px-4 py-2 block md:table-cell whitespace-normal lg:whitespace-nowrap"
//                       >
//                         <span className="font-semibold md:hidden">
//                           {label}:{' '}
//                         </span>
//                         {value}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import truckImage from './assets/Truck.png'; // update path if needed

const API_URL = import.meta.env.VITE_API_URL;

export default function TruckSchedule() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [status, setStatus] = useState('All');
  const [truckSearch, setTruckSearch] = useState('');
  const [plantList, setPlantList] = useState([]);
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/plants`, {
      headers: {
        userid: localStorage.getItem('userId'),
        role: localStorage.getItem('role'),
      }
    })
    .then(res => {
      setPlantList(res.data);
      setSelectedPlants(res.data.map(p => p.plantid.toString())); // default select all
    })
    .catch(() => setError('Failed to load plants'));
  }, []);

  const togglePlant = id =>
    setSelectedPlants(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  const selectAll = () =>
    setSelectedPlants(plantList.map(p => p.plantid.toString()));
  const deselectAll = () => setSelectedPlants([]);

  const fetchData = async (st, tr = '') => {
    if (!fromDate || !toDate || selectedPlants.length === 0) {
      setError('Please select all filters');
      return;
    }
    setLoading(true);
    setError(''); 
    setStatus(st);

    try {
      const res = await axios.get(`${API_URL}/api/truck-schedule`, {
        params: {
          fromDate,
          toDate,
          status: st,
          plant: JSON.stringify(selectedPlants),
          truckNo: tr || undefined,
        },
      });
      let fetched = res.data;
      if (tr) {
        fetched = fetched.filter(item =>
          item.truckNo?.toLowerCase().includes(tr.toLowerCase())
        );
      }
      setData(fetched);
    } catch {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-br from-gray-100 to-blue-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6">🚚 Truck Schedule</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow w-full max-w-5xl mb-4">
        <div>
          <label className="block">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={e => setFromDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block">To</label>
          <input
            type="date"
            value={toDate}
            onChange={e => setToDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex gap-2">
          {['Dispatched', 'InTransit', 'CheckedOut', 'All'].map(btn => (
            <button
              key={btn}
              onClick={() => fetchData(btn, truckSearch)}
              className={`px-4 py-2 rounded font-semibold ${
                status === btn
                  ? 'bg-indigo-600 text-white'
                  : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Truck No."
          value={truckSearch}
          onChange={e => setTruckSearch(e.target.value)}
          className="border rounded px-3 py-2 w-32"
        />
        <button
          onClick={() => fetchData(status, truckSearch)}
          className="px-4 py-2 bg-indigo-500 text-white rounded"
        >
          Search
        </button>
      </div>

      {/* Plant selector */}
      <div className="bg-white p-4 rounded-lg shadow w-full max-w-5xl mb-4">
        <h2 className="text-lg font-semibold mb-2">Select Plants</h2>
        <div className="flex gap-2 mb-2">
          <button
            onClick={selectAll}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Select All
          </button>
          <button
            onClick={deselectAll}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Deselect
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto">
          {plantList.map(p => (
            <label key={p.plantid} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedPlants.includes(p.plantid.toString())}
                onChange={() => togglePlant(p.plantid.toString())}
              />
              {p.plantname}
            </label>
          ))}
        </div>
      </div>

      {/* Table / cards display */}
      <div className="bg-white p-6 shadow rounded-2xl w-full max-w-5xl overflow-x-auto">
        <img src={truckImage} alt="Truck" className="mx-auto h-40 mb-4" />

        {loading && <p className="text-indigo-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && data.length === 0 && (
          <p className="text-gray-500">No trucks found</p>
        )}

        {data.length > 0 && (
          <table className="min-w-full table-auto border-collapse block md:table">
            <thead className="bg-indigo-100 hidden md:table-header-group">
              <tr className="table-row">
                {[
                  'Truck No',
                  'Plant',
                  'Check‑In',
                  'Check‑Out',
                  'Slip',
                  'Qty',
                  'Freight',
                  'Priority'
                ].map(h => (
                  <th
                    key={h}
                    className="px-4 py-2 text-left font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {data.map((item, idx) => (
                <tr
                  key={idx}
                  className="bg-white md:bg-transparent md:table-row block mb-4 md:mb-0 rounded md:rounded-none"
                >
                  {[
                    'truckNo',
                    'plantName',
                    'checkInTime',
                    'checkOutTime',
                    'loadingSlipNo',
                    'qty',
                    'freight',
                    'priority'
                  ].map((key, i) => {
                    const raw = item[key];
                    const value =
                      key.includes('Time') && raw
                        ? raw // Show the raw time directly without conversion
                        : raw ?? '—';
                    const label = [
                      'Truck No',
                      'Plant',
                      'Check‑In',
                      'Check‑Out',
                      'Slip',
                      'Qty',
                      'Freight',
                      'Priority'
                    ][i];
                    return (
                      <td
                        key={key}
                        className="px-4 py-2 block md:table-cell whitespace-normal lg:whitespace-nowrap"
                      >
                        <span className="font-semibold md:hidden">
                          {label}:{' '}
                        </span>
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

