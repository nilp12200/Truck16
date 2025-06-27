// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// const API_URL = import.meta.env.VITE_API_URL;

// export default function TruckFind() {
//   const navigate = useNavigate();
//   const [truckData, setTruckData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchAllTruckData();
//   }, []);

//   const fetchAllTruckData = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.get(`${API_URL}/api/truck-find`);
//       if (Array.isArray(response.data)) {
//         setTruckData(response.data);
//       } else {
//         setError('Invalid data format from server');
//         setTruckData([]);
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to fetch truck data');
//       setTruckData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-xl rounded-lg p-0 w-full max-w-3xl relative border border-gray-300">
//         <div className="flex items-center justify-between px-8 pt-6 pb-2 border-b border-gray-200 bg-cyan-100 rounded-t-lg">
//           <h2 className="text-2xl font-bold text-center flex-1 text-black tracking-wide" style={{ letterSpacing: '2px' }}>
//             SEARCH RESULT
//           </h2>
//           <div className="flex gap-2 ml-auto">
          
//             <button
//           onClick={() => navigate('/home')}
//           className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:scale-110 shadow-lg"
//           title="Close"
//         >
//           ✕
//         </button>
//           </div>
//         </div>

//         {loading && (
//           <div className="text-center py-8">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
//             <p className="mt-2 text-cyan-700 font-medium">Loading truck details...</p>
//           </div>
//         )}

//         {error && (
//           <div className="text-center py-6">
//             <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//               <p className="text-red-600 font-medium">❌ {error}</p>
//             </div>
//           </div>
//         )}

//         {!loading && !error && (
//           <div className="overflow-x-auto max-h-[70vh]">
//             <table className="w-full text-sm text-left border border-gray-400 mt-0">
//               <thead>
//                 <tr className="bg-cyan-700 text-white text-base">
//                   <th className="px-3 py-2 border border-gray-400">TRUCK NO</th>
//                   <th className="px-3 py-2 border border-gray-400">TRANSACTION DATE</th>
//                   <th className="px-3 py-2 border border-gray-400">CITY NAME</th>
//                   <th className="px-3 py-2 border border-gray-400">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {truckData.length === 0 ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-6 text-gray-500">
//                       No truck data available
//                     </td>
//                   </tr>
//                 ) : (
//                   truckData.map((truck, idx) => (
//                     <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'}>
//                       <td className="px-3 py-2 border border-gray-300 text-blue-800 font-semibold">{truck.TruckNo || '—'}</td>
//                       <td className="px-3 py-2 border border-gray-300 font-medium">
//                         {truck.TransactionDate ? new Date(truck.TransactionDate).toLocaleDateString() : '—'}
//                       </td>
//                       <td className="px-3 py-2 border border-gray-300 text-green-700 font-semibold">{truck.CityName || '—'}</td>
//                       <td className="px-3 py-2 border border-gray-300 text-center">
//                         <button
//                           className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2 transition-all duration-200"
//                           onClick={() => navigate('/truck', { state: { truck } })}
//                         >
//                           Edit
//                         </button>
                       
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// *****************************************************************
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

export default function TruckFind() {
  const navigate = useNavigate();
  const [truckData, setTruckData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllTruckData();
  }, []);

  const fetchAllTruckData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/api/truck-find`);
      console.log('Truck data:', response.data);
      if (Array.isArray(response.data)) {
        setTruckData(response.data);
      } else {
        setError('Invalid data format from server');
        setTruckData([]);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch truck data');
      setTruckData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-lg p-0 w-full max-w-3xl relative border border-gray-300">
        <div className="flex items-center justify-between px-8 pt-6 pb-2 border-b border-gray-200 bg-cyan-100 rounded-t-lg">
          <h2 className="text-2xl font-bold text-center flex-1 text-black tracking-wide" style={{ letterSpacing: '2px' }}>
            SEARCH RESULT
          </h2>
          <button
            onClick={() => navigate('/home')}
            className="absolute top-4 right-4 w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full flex items-center justify-center hover:from-red-600 hover:to-red-700 transform transition-all duration-300 hover:scale-110 shadow-lg"
            title="Close"
          >
            ✕
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
            <p className="mt-2 text-cyan-700 font-medium">Loading truck details...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-600 font-medium">❌ {error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto max-h-[70vh]">
            <table className="w-full text-sm text-left border border-gray-400 mt-0">
              <thead>
                <tr className="bg-cyan-700 text-white text-base">
                  <th className="px-3 py-2 border border-gray-400">TRUCK NO</th>
                  <th className="px-3 py-2 border border-gray-400">TRANSACTION DATE</th>
                  <th className="px-3 py-2 border border-gray-400">CITY NAME</th>
                  <th className="px-3 py-2 border border-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {truckData.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-gray-500">
                      No truck data available
                    </td>
                  </tr>
                ) : (
                  truckData.map((truck, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-cyan-50'}>
                      <td className="px-3 py-2 border border-gray-300 text-blue-800 font-semibold">{truck.truckno || '—'}</td>
                      <td className="px-3 py-2 border border-gray-300 font-medium">
                        {truck.transactiondate ? new Date(truck.transactiondate).toLocaleDateString() : '—'}
                      </td>
                      <td className="px-3 py-2 border border-gray-300 text-green-700 font-semibold">{truck.cityname || '—'}</td>
                      <td className="px-3 py-2 border border-gray-300 text-center">
                        <button
                          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-1 px-3 rounded mr-2 transition-all duration-200"
                          onClick={() => navigate('/truck', { state: { truck } })}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
// *******************************************

