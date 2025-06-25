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
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export default function Report() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [plant, setPlant] = useState('');
  const [plants, setPlants] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Fetch all plants for dropdown
useEffect(() => {
  const fetchPlants = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/plants`, {
        headers: {
          userid: localStorage.getItem('userId'),
          role: localStorage.getItem('role')
        }
      });
      console.log(res.data);  // 👈 Console me response dekhna
      setPlants(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch plants');
    }
  };
  fetchPlants();
}, []);


  // ✅ Fetch report based on filters
  const fetchReport = async () => {
    if (!fromDate || !toDate || !plant) {
      setError('Please select all filters');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await axios.get(
        `${API_URL}/api/truck-report?fromDate=${fromDate}&toDate=${toDate}&plant=${plant}`
      );

      console.log('API raw response:', res.data);

      if (res.data.success && Array.isArray(res.data.data)) {
        setReportData(res.data.data);
      } else if (Array.isArray(res.data)) {
        setReportData(res.data); // In case backend is returning raw array
      } else {
        setError('Invalid data format from server');
        setReportData([]);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to fetch report');
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Truck Movement Report
        </h2>

        {/* 🔵 Filters Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex flex-col w-full sm:w-1/4">
            <label className="mb-1 font-medium">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col w-full sm:w-1/4">
            <label className="mb-1 font-medium">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex flex-col w-full sm:w-1/4">
            <label className="mb-1 font-medium">Plant</label>
            <select
              value={plant}
              onChange={(e) => setPlant(e.target.value)}
              className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Plant</option>
              {plants.map((p) => (
                <option key={p.plantid} value={p.plantid}>
                  {p.plantname}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end w-full sm:w-auto">
            <button
              onClick={fetchReport}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300 w-full"
            >
              Search
            </button>
          </div>
        </div>

        {/* 🔵 Loading / Error / No Data */}
        {loading && (
          <div className="text-center text-indigo-600 font-medium">Loading report...</div>
        )}
        {error && (
          <div className="text-center text-red-500 font-medium">{error}</div>
        )}
        {!loading && !error && reportData.length === 0 && (
          <div className="text-center text-gray-500">
            No records found for selected filters.
          </div>
        )}

        {/* 🔵 Report Table */}
        {!loading && reportData.length > 0 && (
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <thead className="bg-indigo-100 text-indigo-700">
                <tr>
                  <th className="px-4 py-3 text-left">Truck No</th>
                  <th className="px-4 py-3 text-left">Transaction Date</th>
                  <th className="px-4 py-3 text-left">Plant Name</th>
                  <th className="px-4 py-3 text-left">Check-In Time</th>
                  <th className="px-4 py-3 text-left">Check-Out Time</th>
                  <th className="px-4 py-3 text-left">Loading Slip</th>
                  <th className="px-4 py-3 text-left">Qty</th>
                  <th className="px-4 py-3 text-left">Freight</th>
                  <th className="px-4 py-3 text-left">Priority</th>
                  <th className="px-4 py-3 text-left">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((item, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3">{item.truckNo || '—'}</td>
                    <td className="px-4 py-3">
                      {item.transactionDate ? new Date(item.transactionDate).toLocaleDateString() : '—'}
                    </td>
                    <td className="px-4 py-3">{item.plantName || '—'}</td>
                    <td className="px-4 py-3">
                      {item.checkInTime ? new Date(item.checkInTime).toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {item.checkOutTime ? new Date(item.checkOutTime).toLocaleString() : '—'}
                    </td>
                    <td className="px-4 py-3">{item.loadingSlipNo || '—'}</td>
                    <td className="px-4 py-3">{item.qty ?? '—'}</td>
                    <td className="px-4 py-3">{item.freight ?? '—'}</td>
                    <td className="px-4 py-3">{item.priority ?? '—'}</td>
                    <td className="px-4 py-3">{item.remarks || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
