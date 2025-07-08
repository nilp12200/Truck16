// import React, { useState } from 'react';
// import axios from 'axios';

// // ✅ Using VITE_API_URL from .env file
// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [truckNo, setTruckNo] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchReport = async () => {
//     if (!truckNo.trim()) {
//       setError('Please enter a truck number');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-report?truckNo=${encodeURIComponent(truckNo)}`);
//       if (Array.isArray(response.data)) {
//         setReportData(response.data);
//       } else {
//         setReportData([]);
//         setError('Invalid data format from server');
//       }
//     } catch (err) {
//       setError('Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-5xl">
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Truck Movement Report</h2>

//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter Truck Number"
//             value={truckNo}
//             onChange={(e) => setTruckNo(e.target.value)}
//             className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <button
//             onClick={fetchReport}
//             className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300"
//           >
//             Search
//           </button>
//         </div>

//         {loading && <div className="text-center text-indigo-600 font-medium">Loading report...</div>}
//         {error && <div className="text-center text-red-500 font-medium">{error}</div>}

//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">No data found. Try another truck number.</div>
//         )}

//         {!loading && reportData.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Truck No</th>
//                   <th className="px-4 py-3 text-left">Plant Name</th>
//                   <th className="px-4 py-3 text-left">Check-In Time</th>
//                   <th className="px-4 py-3 text-left">Check-Out Time</th>
//                   <th className="px-4 py-3 text-left">Loading Slip</th>
//                   <th className="px-4 py-3 text-left">Qty</th>
//                   <th className="px-4 py-3 text-left">Freight</th>
//                   <th className="px-4 py-3 text-left">Priority</th>
//                   <th className="px-4 py-3 text-left">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, index) => (
//                   <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="px-4 py-3">{item.truckno || item.truckNo || '—'}</td>
//                     <td className="px-4 py-3">{item.plantname || item.plantName || '—'}</td>
//                     <td className="px-4 py-3">{item.checkintime ? new Date(item.checkintime).toLocaleString() : '—'}</td>
//                     <td className="px-4 py-3">{item.checkouttime ? new Date(item.checkouttime).toLocaleString() : '—'}</td>
//                     <td className="px-4 py-3">{item.loadingslipno || '—'}</td>
//                     <td className="px-4 py-3">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-3">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-3">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-3">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



/////////////////////////////////////////////////////////////////////////////


// import React, { useState } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [truckNo, setTruckNo] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchReport = async () => {
//     if (!truckNo.trim()) {
//       setError('Please enter a truck number');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/truck-report?truckNo=${encodeURIComponent(truckNo)}`
//       );
//       console.log('API raw data:', response.data);

//       if (Array.isArray(response.data)) {
//         // Normalize keys to a consistent camelCase shape
//         const normalized = response.data.map((row) => ({
//           truckNo: row.truckno || row.truckNo || '',
//           plantName: row.plantname || row.plantName || '',
//           checkInTime: row.checkintime || row.checkInTime || null,
//           checkOutTime: row.checkouttime || row.checkOutTime || null,
//           loadingSlipNo: row.loadingslipno || row.loadingSlipNo || '',
//           qty: row.qty ?? null,
//           freight: row.freight ?? null,
//           priority: row.priority ?? null,
//           remarks: row.remarks || ''
//         }));
//         setReportData(normalized);
//       } else {
//         setError('Invalid data format from server');
//         setReportData([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-5xl">
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//           Truck Movement Report
//         </h2>
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter Truck Number"
//             value={truckNo}
//             onChange={(e) => setTruckNo(e.target.value)}
//             className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <button
//             onClick={fetchReport}
//             className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300"
//           >
//             Search
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center text-indigo-600 font-medium">Loading report...</div>
//         )}
//         {error && <div className="text-center text-red-500 font-medium">{error}</div>}

//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">
//             No data found. Try another truck number.
//           </div>
//         )}

//         {!loading && reportData.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Truck No</th>
//                   <th className="px-4 py-3 text-left">Plant Name</th>
//                   <th className="px-4 py-3 text-left">Check-In Time</th>
//                   <th className="px-4 py-3 text-left">Check-Out Time</th>
//                   <th className="px-4 py-3 text-left">Loading Slip</th>
//                   <th className="px-4 py-3 text-left">Qty</th>
//                   <th className="px-4 py-3 text-left">Freight</th>
//                   <th className="px-4 py-3 text-left">Priority</th>
//                   <th className="px-4 py-3 text-left">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, i) => (
//                   <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="px-4 py-3">{item.truckNo || '—'}</td>
//                     <td className="px-4 py-3">{item.plantName || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">
//                       {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.loadingSlipNo || '—'}</td>
//                     <td className="px-4 py-3">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-3">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-3">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-3">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const navigate = useNavigate();
//   const [truckNo, setTruckNo] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchReport = async () => {
//     if (!truckNo.trim()) {
//       setError('Please enter a truck number');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/truck-report?truckNo=${encodeURIComponent(truckNo)}`
//       );
//       console.log('API raw data:', response.data);

//       if (Array.isArray(response.data)) {
//         // Normalize keys to a consistent camelCase shape
//         const normalized = response.data.map((row) => ({
//           truckNo: row.truckno || row.truckNo || '',
//           plantName: row.plantname || row.plantName || '',
//           checkInTime: row.checkintime || row.checkInTime || null,
//           checkOutTime: row.checkouttime || row.checkOutTime || null,
//           loadingSlipNo: row.loadingslipno || row.loadingSlipNo || '',
//           qty: row.qty ?? null,
//           freight: row.freight ?? null,
//           priority: row.priority ?? null,
//           remarks: row.remarks || ''
//         }));
//         setReportData(normalized);
//       } else {
//         setError('Invalid data format from server');
//         setReportData([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-5xl relative">
//         {/* Close Button */}
//         <button
//           onClick={() => navigate('/home')}
//           className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:scale-110 shadow-lg z-10"
//           title="Close"
//         >
//           ✕
//         </button>
        
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//           Truck Movement Report
//         </h2>
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter Truck Number"
//             value={truckNo}
//             onChange={(e) => setTruckNo(e.target.value)}
//             className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <button
//             onClick={fetchReport}
//             className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300"
//           >
//             Search
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center text-indigo-600 font-medium">Loading report...</div>
//         )}
//         {error && <div className="text-center text-red-500 font-medium">{error}</div>}

//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">
//             No data found. Try another truck number.
//           </div>
//         )}

//         {!loading && reportData.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Truck No</th>
//                   <th className="px-4 py-3 text-left">Plant Name</th>
//                   <th className="px-4 py-3 text-left">Check-In Time</th>
//                   <th className="px-4 py-3 text-left">Check-Out Time</th>
//                   <th className="px-4 py-3 text-left">Loading Slip</th>
//                   <th className="px-4 py-3 text-left">Qty</th>
//                   <th className="px-4 py-3 text-left">Freight</th>
//                   <th className="px-4 py-3 text-left">Priority</th>
//                   <th className="px-4 py-3 text-left">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, i) => (
//                   <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="px-4 py-3">{item.truckNo || '—'}</td>
//                     <td className="px-4 py-3">{item.plantName || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">
//                       {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.loadingSlipNo || '—'}</td>
//                     <td className="px-4 py-3">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-3">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-3">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-3">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


/////////////////////////////////////////////////////////////////////////////


// import React, { useState } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [truckNo, setTruckNo] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchReport = async () => {
//     if (!truckNo.trim()) {
//       setError('Please enter a truck number');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/truck-report?truckNo=${encodeURIComponent(truckNo)}`
//       );
//       console.log('API raw data:', response.data);

//       if (Array.isArray(response.data)) {
//         // Normalize keys to a consistent camelCase shape
//         const normalized = response.data.map((row) => ({
//           truckNo: row.truckno || row.truckNo || '',
//           plantName: row.plantname || row.plantName || '',
//           checkInTime: row.checkintime || row.checkInTime || null,
//           checkOutTime: row.checkouttime || row.checkOutTime || null,
//           loadingSlipNo: row.loadingslipno || row.loadingSlipNo || '',
//           qty: row.qty ?? null,
//           freight: row.freight ?? null,
//           priority: row.priority ?? null,
//           remarks: row.remarks || ''
//         }));
//         setReportData(normalized);
//       } else {
//         setError('Invalid data format from server');
//         setReportData([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-5xl">
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
//           Truck Movement Report
//         </h2>
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter Truck Number"
//             value={truckNo}
//             onChange={(e) => setTruckNo(e.target.value)}
//             className="w-full sm:w-2/3 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//           />
//           <button
//             onClick={fetchReport}
//             className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300"
//           >
//             Search
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center text-indigo-600 font-medium">Loading report...</div>
//         )}
//         {error && <div className="text-center text-red-500 font-medium">{error}</div>}

//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">
//             No data found. Try another truck number.
//           </div>
//         )}

//         {!loading && reportData.length > 0 && (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Truck No</th>
//                   <th className="px-4 py-3 text-left">Plant Name</th>
//                   <th className="px-4 py-3 text-left">Check-In Time</th>
//                   <th className="px-4 py-3 text-left">Check-Out Time</th>
//                   <th className="px-4 py-3 text-left">Loading Slip</th>
//                   <th className="px-4 py-3 text-left">Qty</th>
//                   <th className="px-4 py-3 text-left">Freight</th>
//                   <th className="px-4 py-3 text-left">Priority</th>
//                   <th className="px-4 py-3 text-left">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, i) => (
//                   <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="px-4 py-3">{item.truckNo || '—'}</td>
//                     <td className="px-4 py-3">{item.plantName || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">
//                       {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.loadingSlipNo || '—'}</td>
//                     <td className="px-4 py-3">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-3">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-3">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-3">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////


// import React, { useState } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [truckNo, setTruckNo] = useState('');
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchReport = async () => {
//     if (!truckNo.trim()) {
//       setError('Please enter a truck number');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(
//         `${API_URL}/api/truck-report?truckNo=${encodeURIComponent(truckNo)}`
//       );

//       if (Array.isArray(response.data)) {
//         const normalized = response.data.map((row) => ({
//           truckNo: row.truckno || row.truckNo || '',
//           plantName: row.plantname || row.plantName || '',
//           checkInTime: row.checkintime || row.checkInTime || null,
//           checkOutTime: row.checkouttime || row.checkOutTime || null,
//           loadingSlipNo: row.loadingslipno || row.loadingSlipNo || '',
//           qty: row.qty ?? null,
//           freight: row.freight ?? null,
//           priority: row.priority ?? null,
//           remarks: row.remarks || ''
//         }));
//         setReportData(normalized);
//       } else {
//         setError('Invalid data format from server');
//         setReportData([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
      
//       <div className="bg-white w-full max-w-6xl rounded shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
//           Gate Pass Register
//         </h2>

//         <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Enter Truck Number"
//             value={truckNo}
//             onChange={(e) => setTruckNo(e.target.value)}
//             className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 w-60"
//           />
//           <button
//             onClick={fetchReport}
//             className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
//           >
//             Search
//           </button>
//         </div>

//         {loading && (
//           <div className="text-center text-indigo-600 font-medium mb-4">Loading report...</div>
//         )}
//         {error && <div className="text-center text-red-500 font-medium mb-4">{error}</div>}

//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500 mb-4">
//             No data found. Try another truck number.
//           </div>
//         )}

//         {!loading && reportData.length > 0 && (
//           <div className="overflow-auto border border-gray-300 rounded-md">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-100 border-b">
//                 <tr>
//                   <th className="px-4 py-2">Truck No</th>
//                   <th className="px-4 py-2">Plant Name</th>
//                   <th className="px-4 py-2">Check-In</th>
//                   <th className="px-4 py-2">Check-Out</th>
//                   <th className="px-4 py-2">Loading Slip</th>
//                   <th className="px-4 py-2">Qty</th>
//                   <th className="px-4 py-2">Freight</th>
//                   <th className="px-4 py-2">Priority</th>
//                   <th className="px-4 py-2">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, i) => (
//                   <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                     <td className="px-4 py-2">{item.truckNo || '—'}</td>
//                     <td className="px-4 py-2">{item.plantName || '—'}</td>
//                     <td className="px-4 py-2">
//                       {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-2">
//                       {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-2">{item.loadingSlipNo || '—'}</td>
//                     <td className="px-4 py-2">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-2">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-2">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-2">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////////////////////////k////////////////////////////////////////////////////k


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [plant, setPlant] = useState('');
//   const [plants, setPlants] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlants(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchReport = async () => {
//     if (!fromDate || !toDate || !plant) {
//       setError('Please select all filters');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-report`, {
//         params: { fromDate, toDate, plant }
//       });
//       setReportData(res.data || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
//       <div className="bg-white w-full max-w-6xl rounded shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
//           Gate Pass Register
//         </h2>

//         {/* Filter Section */}
//         <div className="flex flex-wrap justify-center gap-4 mb-6">
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">From:</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">To:</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">Plant:</label>
//             <select
//               value={plant}
//               onChange={(e) => setPlant(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             >
//               <option value="">Select Plant</option>
//               {plants.map((p) => (
//                 <option key={p.plantid} value={p.plantid}>
//                   {p.plantname}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             onClick={fetchReport}
//             className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Search
//           </button>
//         </div>

//         {/* Error & Loading */}
//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//         {loading && <div className="text-indigo-600 text-center mb-4">Loading...</div>}

//         {/* Table */}
//         {reportData.length > 0 && (
//           <div className="overflow-auto border border-gray-300 rounded mb-4">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-100 border-b">
//                 <tr>
//                   <th className="px-4 py-2">Date</th>
//                   <th className="px-4 py-2">Truck No</th>
//                   <th className="px-4 py-2">Freight</th>
//                   <th className="px-4 py-2">Amount Per</th>
//                   <th className="px-4 py-2">Zone Name</th>
//                   <th className="px-4 py-2">Party Name</th>
//                   <th className="px-4 py-2">City Name</th>
//                   <th className="px-4 py-2">Truck Weight</th>
//                   <th className="px-4 py-2">Dispatcher Name</th>
//                   <th className="px-4 py-2">Contact No</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((row, idx) => (
//                   <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                     <td className="px-4 py-2">{row.date || '—'}</td>
//                     <td className="px-4 py-2">{row.truckNo || '—'}</td>
//                     <td className="px-4 py-2">{row.freight || '—'}</td>
//                     <td className="px-4 py-2">{row.amountPer || '—'}</td>
//                     <td className="px-4 py-2">{row.zoneName || '—'}</td>
//                     <td className="px-4 py-2">{row.partyName || '—'}</td>
//                     <td className="px-4 py-2">{row.cityName || '—'}</td>
//                     <td className="px-4 py-2">{row.truckWeight || '—'}</td>
//                     <td className="px-4 py-2">{row.dispatcherName || '—'}</td>
//                     <td className="px-4 py-2">{row.contactNo || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Export Button */}
//         {reportData.length > 0 && (
//           <div className="text-center">
//             <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//               Export Excel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [plant, setPlant] = useState('');
//   const [plants, setPlants] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchPlants();
//   }, []);

//   const fetchPlants = async () => {
//     try {
//       const res = await axios.get(`${API_URL}/api/plants`);
//       setPlants(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchReport = async () => {
//     if (!fromDate || !toDate || !plant) {
//       setError('Please select all filters');
//       return;
//     }
//     setError('');
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_URL}/api/truck-report`, {
//         params: { fromDate, toDate, plant }
//       });
//       setReportData(res.data || []);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-200 flex flex-col items-center p-4">
//       <div className="bg-white w-full max-w-6xl rounded shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
//           Gate Pass Register
//         </h2>

//         {/* Filter Section */}
//         <div className="flex flex-wrap justify-center gap-4 mb-6">
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">From:</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">To:</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <label className="text-gray-700 font-medium">Plant:</label>
//             <select
//               value={plant}
//               onChange={(e) => setPlant(e.target.value)}
//               className="p-2 border border-gray-300 rounded"
//             >
//               <option value="">Select Plant</option>
//               {plants.map((p) => (
//                 <option key={p.plantid} value={p.plantid}>
//                   {p.plantname}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button
//             onClick={fetchReport}
//             className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
//           >
//             Search
//           </button>
//         </div>

//         {/* Error & Loading */}
//         {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//         {loading && <div className="text-indigo-600 text-center mb-4">Loading...</div>}

//         {/* Table */}
//         {reportData.length > 0 && (
//           <div className="overflow-auto border border-gray-300 rounded mb-4">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-100 border-b">
//                 <tr>
//                   <th className="px-4 py-2">Date</th>
//                   <th className="px-4 py-2">Truck No</th>
//                   <th className="px-4 py-2">Freight</th>
//                   <th className="px-4 py-2">Amount Per</th>
//                   <th className="px-4 py-2">Zone Name</th>
//                   <th className="px-4 py-2">Party Name</th>
//                   <th className="px-4 py-2">City Name</th>
//                   <th className="px-4 py-2">Truck Weight</th>
//                   <th className="px-4 py-2">Dispatcher Name</th>
//                   <th className="px-4 py-2">Contact No</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((row, idx) => (
//                   <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                     <td className="px-4 py-2">{row.date || '—'}</td>
//                     <td className="px-4 py-2">{row.truckNo || '—'}</td>
//                     <td className="px-4 py-2">{row.freight || '—'}</td>
//                     <td className="px-4 py-2">{row.amountPer || '—'}</td>
//                     <td className="px-4 py-2">{row.zoneName || '—'}</td>
//                     <td className="px-4 py-2">{row.partyName || '—'}</td>
//                     <td className="px-4 py-2">{row.cityName || '—'}</td>
//                     <td className="px-4 py-2">{row.truckWeight || '—'}</td>
//                     <td className="px-4 py-2">{row.dispatcherName || '—'}</td>
//                     <td className="px-4 py-2">{row.contactNo || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Export Button */}
//         {reportData.length > 0 && (
//           <div className="text-center">
//             <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
//               Export Excel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
//////////////
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;

// export default function Report() {
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [plant, setPlant] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchPlants = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/api/plants`, {
//           headers: {
//             userid: localStorage.getItem('userId'),
//             role: localStorage.getItem('role')
//           }
//         });
//         setPlants(res.data);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to fetch plants');
//       }
//     };
//     fetchPlants();
//   }, []);

//   const fetchReport = async () => {
//     if (!fromDate || !toDate || plant.length === 0) {
//       setError('Please select all filters');
//       return;
//     }
//     setError('');
//     setLoading(true);

//     try {
//       const res = await axios.get(`${API_URL}/api/truck-report`, {
//         params: {
//           fromDate,
//           toDate,
//           plant: JSON.stringify(plant)
//         }
//       });
//       setReportData(res.data);
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.error || 'Failed to fetch report');
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const togglePlant = (plantId) => {
//     setPlant((prev) =>
//       prev.includes(plantId)
//         ? prev.filter((id) => id !== plantId)
//         : [...prev, plantId]
//     );
//   };

//   const selectAllPlants = () => {
//     const allIds = plants.map((p) => String(p.plantid));
//     setPlant(allIds);
//   };

//   const deselectAllPlants = () => {
//     setPlant([]);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-7xl">
        
//         <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6 flex items-center justify-center gap-2">
//           🚚 Truck Movement Report
//         </h2>

//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-6 items-end">
          
//           <div className="flex flex-col w-full md:w-1/4">
//             <label className="mb-1 font-medium">From Date</label>
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <div className="flex flex-col w-full md:w-1/4">
//             <label className="mb-1 font-medium">To Date</label>
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
//             />
//           </div>

//           <div className="flex flex-col w-full md:w-1/3">
//             <label className="mb-1 font-medium">Select Plants</label>
//             <div className="grid grid-cols-2 gap-2 bg-indigo-50 p-3 rounded-xl max-h-40 overflow-y-auto border border-indigo-200">
//               {plants.map((p) => (
//                 <label key={p.plantid} className="flex items-center gap-2 text-sm">
//                   <input
//                     type="checkbox"
//                     value={p.plantid}
//                     checked={plant.includes(String(p.plantid))}
//                     onChange={() => togglePlant(String(p.plantid))}
//                     className="w-4 h-4 rounded-full accent-green-600"
//                   />
//                   {p.plantname}
//                 </label>
//               ))}
//             </div>
//           </div>

//           <div className="flex gap-2 w-full md:w-auto">
//             <button
//               onClick={fetchReport}
//               className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105 w-full"
//             >
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Select/Deselect All */}
//         <div className="flex gap-3 mb-4">
//           <button
//             onClick={selectAllPlants}
//             className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow transition transform hover:scale-105"
//           >
//             Select All
//           </button>
//           <button
//             onClick={deselectAllPlants}
//             className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow transition transform hover:scale-105"
//           >
//             Deselect
//           </button>
//         </div>

//         {/* Error / Loading / Table */}
//         {loading && (
//           <div className="text-center text-indigo-600 font-medium">Loading report...</div>
//         )}
//         {error && (
//           <div className="text-center text-red-500 font-medium">{error}</div>
//         )}
//         {!loading && !error && reportData.length === 0 && (
//           <div className="text-center text-gray-500">
//             No records found for selected filters.
//           </div>
//         )}

//         {!loading && reportData.length > 0 && (
//           <div className="overflow-x-auto mt-4">
//             <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow">
//               <thead className="bg-indigo-100 text-indigo-700">
//                 <tr>
//                   <th className="px-4 py-3 text-left">Truck No</th>
//                   <th className="px-4 py-3 text-left">Transaction Date</th>
//                   <th className="px-4 py-3 text-left">Plant Name</th>
//                   <th className="px-4 py-3 text-left">Check-In Time</th>
//                   <th className="px-4 py-3 text-left">Check-Out Time</th>
//                   <th className="px-4 py-3 text-left">Loading Slip</th>
//                   <th className="px-4 py-3 text-left">Qty</th>
//                   <th className="px-4 py-3 text-left">Freight</th>
//                   <th className="px-4 py-3 text-left">Priority</th>
//                   <th className="px-4 py-3 text-left">Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reportData.map((item, i) => (
//                   <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                     <td className="px-4 py-3">{item.truckNo || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.transactionDate ? new Date(item.transactionDate).toLocaleDateString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.plantName || '—'}</td>
//                     <td className="px-4 py-3">
//                       {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">
//                       {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
//                     </td>
//                     <td className="px-4 py-3">{item.loadingSlipNo || '—'}</td>
//                     <td className="px-4 py-3">{item.qty ?? '—'}</td>
//                     <td className="px-4 py-3">{item.freight ?? '—'}</td>
//                     <td className="px-4 py-3">{item.priority ?? '—'}</td>
//                     <td className="px-4 py-3">{item.remarks || '—'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import truckImage from './assets/Truck.png.png';

const API_URL = import.meta.env.VITE_API_URL;

export default function Report() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedPlants, setSelectedPlants] = useState([]);
  const [plants, setPlants] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPlants = async () => {
      const userId = localStorage.getItem('userId');
      const role = localStorage.getItem('role');
      const allowedPlantsRaw = localStorage.getItem('allowedPlants') || '';
      const allowedPlants = allowedPlantsRaw.split(',').map(p => p.trim()).filter(Boolean);

      try {
        const { data } = await axios.get(`${API_URL}/api/plants`, {
          headers: { userid: userId, role }
        });
        const filtered = data.filter(plant => {
          const pid = String(plant.plantid || '');
          return allowedPlants.includes(pid) || role?.toLowerCase() === 'admin';
        });
        setPlants(filtered);
        setSelectedPlants(filtered.map(p => String(p.plantid)));
      } catch {
        toast.error('Failed to load plant data', {
          position: "top-right",
          autoClose: 3000,
          theme: "colored"
        });
      }
    };

    fetchPlants();
  }, []);

  const togglePlant = id =>
    setSelectedPlants(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );

  const selectAll = () => setSelectedPlants(plants.map(p => String(p.plantid)));
  const deselectAll = () => setSelectedPlants([]);

  const fetchReport = async () => {
    if (!fromDate || !toDate) {
      toast.warn('Please select both date ranges', {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
      return;
    }
    if (selectedPlants.length === 0) {
      toast.warn('Please select at least one plant', {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.get(`${API_URL}/api/truck-report`, {
        params: { fromDate, toDate, plant: JSON.stringify(selectedPlants) }
      });
      setReportData(data);
      if (data.length === 0) {
        toast.info('No records found for selected filters', {
          position: "top-right",
          autoClose: 3000,
          theme: "colored"
        });
      }
    } catch {
      toast.error('Failed to generate report', {
        position: "top-right",
        autoClose: 3000,
        theme: "colored"
      });
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = dateStr => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '—';
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredData = reportData.filter(row => 
    row.truckNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.plantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.loadingSlipNo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      
      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                <img src={truckImage} alt="Truck" className="h-16 md:h-20 inline-block mr-3" />
                Truck Movement Analytics
              </h1>
              <p className="text-blue-100 text-lg">Comprehensive fleet tracking and reporting</p>
            </div>
            <div className="mt-6 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <div className="text-sm font-medium mb-1">Records Found</div>
                <div className="text-2xl font-bold">{reportData.length}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg className="w-6 h-6 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter Parameters
            </h2>
            <div className="mt-4 md:mt-0 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <svg className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Date Filters */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={fromDate}
                    onChange={e => setFromDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={toDate}
                    onChange={e => setToDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Plant Selection */}
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Plant Locations</label>
                <div className="flex space-x-2">
                  <button 
                    onClick={selectAll}
                    className="text-xs px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all shadow-sm flex items-center"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Select All
                  </button>
                  <button 
                    onClick={deselectAll}
                    className="text-xs px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-sm flex items-center"
                  >
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear All
                  </button>
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto p-3 border border-gray-300 rounded-xl bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {plants.map(p => (
                    <div 
                      key={p.plantid}
                      onClick={() => togglePlant(String(p.plantid))}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${selectedPlants.includes(String(p.plantid)) ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-100'}`}
                    >
                      <div className={`flex items-center justify-center w-5 h-5 rounded border-2 mr-3 transition-all ${selectedPlants.includes(String(p.plantid)) ? 'bg-indigo-600 border-indigo-600' : 'border-gray-300 bg-white'}`}>
                        {selectedPlants.includes(String(p.plantid)) && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-700">{p.plantname}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={fetchReport}
              disabled={loading}
              className={`px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all transform ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'} focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Report...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Generate Analytics Report
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {filteredData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-2 md:mb-0">
                <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Movement Records
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {filteredData.length} entries
                </span>
              </h3>
              <div className="text-sm text-gray-500">
                Showing results for: {formatDateTime(fromDate)} to {formatDateTime(toDate)}
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Truck</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date/Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Plant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Timings</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((row, index) => (
                    <tr key={index} className="hover:bg-blue-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 uppercase">{row.truckNo || '—'}</div>
                        <div className="text-xs text-gray-500">Priority: {row.priority}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDateTime(row.transactionDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{row.plantName || '—'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-4">
                          <div>
                            <div className="text-xs text-gray-500">Check-In</div>
                            <div className="text-sm font-medium">{row.checkInTime || '—'}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500">Check-Out</div>
                            <div className="text-sm font-medium">{row.checkOutTime || '—'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">Slip: {row.loadingSlipNo}</div>
                        <div className="text-sm text-gray-900">Qty: {row.qty}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">Remarks: {row.remarks || '—'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          row.freight === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {row.freight}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredData.map((row, index) => (
                <div key={index} className="p-4 hover:bg-blue-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 uppercase">{row.truckNo || '—'}</h4>
                      <p className="text-sm text-gray-500">{formatDateTime(row.transactionDate)}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      row.freight === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {row.freight}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-xs text-gray-500">Plant</p>
                      <p className="text-sm">{row.plantName || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Priority</p>
                      <p className="text-sm">{row.priority}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Check-In</p>
                      <p className="text-sm font-medium">{row.checkInTime || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Check-Out</p>
                      <p className="text-sm font-medium">{row.checkOutTime || '—'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Loading Slip</p>
                      <p className="text-sm">{row.loadingSlipNo}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Quantity</p>
                      <p className="text-sm">{row.qty}</p>
                    </div>
                  </div>
                  
                  {row.remarks && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500">Remarks</p>
                      <p className="text-sm text-gray-700">{row.remarks}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && reportData.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center">
            <div className="mx-auto h-40 w-40 text-indigo-100">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No movement records found</h3>
            <p className="mt-2 text-gray-500">Adjust your filters and generate a new report to view data</p>
            <button
              onClick={fetchReport}
              className="mt-6 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Generate Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
