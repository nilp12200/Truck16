// import React, { useEffect, useState } from 'react';

// const API_URL = import.meta.env.VITE_API_URL;

// const iconEdit = (
//   <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//     <path fill="#fff" d="M5 19h14v2H5v-2zm14.7-13.3a1 1 0 0 0-1.4 0l-2 2 3.4 3.4 2-2a1 1 0 0 0 0-1.4l-2-2zm-3.4 2L5 17.3V21h3.7L19.3 8.7l-3.4-3.4z"/>
//   </svg>
// );

// const iconDelete = (
//   <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
//     <path fill="#fff" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
//   </svg>
// );

// const UserRegister = () => {
//   const [users, setUsers] = useState([]);
//   const [plants, setPlants] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({ Username: '', Password: '', Role: '', AllowedPlant: '' });

//   useEffect(() => {
//     fetchUsers();
//     fetchPlants();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${API_URL}/api/users`);
//       if (!response.ok) throw new Error('Failed to fetch users');
//       const data = await response.json();

//       const normalized = data.map(u => ({
//         Username: u.username,
//         Password: u.password,
//         Role: u.role,
//         AllowedPlant: u.allowed_plant || ''
//       }));

//       setUsers(normalized);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPlants = async () => {
//     try {
//       const response = await fetch(`${API_URL}/api/plantmaster`);
//       if (!response.ok) throw new Error('Failed to fetch plant data');
//       const data = await response.json();
//       setPlants(data); // format: [{ PlantId: 1, PlantName: 'Ahmedabad' }]
//     } catch (err) {
//       console.error('Error fetching plants:', err);
//     }
//   };

//   const getPlantName = (plantId) => {
//     const plant = plants.find(p => p.PlantId === Number(plantId));
//     return plant ? plant.PlantName : plantId;
//   };

//   const handleDelete = async (username) => {
//     if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;
//     try {
//       const response = await fetch(`${API_URL}/api/users/${encodeURIComponent(username)}`, {
//         method: 'DELETE'
//       });
//       if (!response.ok) throw new Error('Failed to delete user');
//       setUsers(users.filter(u => u.Username !== username));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEdit = (user, idx) => {
//     setEditIdx(idx);
//     setEditUser({ ...user });
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditUser(prev => ({ ...prev, [name]: value }));
//   };

//   const handleEditSave = async (username) => {
//     if (!editUser.Username.trim() || !editUser.Password.trim()) {
//       alert("Username and Password are required.");
//       return;
//     }
//     try {
//       const response = await fetch(`${API_URL}/api/users/${encodeURIComponent(username)}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           username: editUser.Username,
//           password: editUser.Password,
//           role: editUser.Role,
//           allowed_plant: editUser.AllowedPlant
//         })
//       });
//       if (!response.ok) throw new Error('Failed to update user');
//       setUsers(users.map(u => (u.Username === username ? editUser : u)));
//       setEditIdx(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEditCancel = () => {
//     setEditIdx(null);
//   };

//   return (
//     <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
//       <h2 style={{
//         fontWeight: 'bold',
//         fontSize: '2rem',
//         marginBottom: '1.5rem',
//         color: '#1a237e',
//         letterSpacing: 1
//       }}>User Register</h2>

//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div style={{ color: 'red' }}>{error}</div>
//       ) : (
//         <div style={{
//           overflowX: 'auto',
//           borderRadius: 16,
//           background: '#f4f6fa',
//           boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
//         }}>
//           <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 900 }}>
//             <thead>
//               <tr style={{ background: '#1976d2', color: '#fff' }}>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>User</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Password</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Role</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Allowed Plant</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Edit</th>
//                 <th style={{ padding: '14px', fontWeight: 700 }}>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>
//                     No users found.
//                   </td>
//                 </tr>
//               ) : users.map((user, idx) => (
//                 <tr key={idx} style={{
//                   background: idx === editIdx ? '#fffde7' : idx % 2 === 0 ? '#fff' : '#e3eafc'
//                 }}>
//                   {editIdx === idx ? (
//                     <>
//                       <td>
//                         <input
//                           name="Username"
//                           value={editUser.Username}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           name="Password"
//                           value={editUser.Password}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         />
//                       </td>
//                       <td>
//                         <select
//                           name="Role"
//                           value={editUser.Role}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         >
//                           <option value="Admin">Admin</option>
//                           <option value="User">User</option>
//                           <option value="Dispatcher">Dispatcher</option>
//                           <option value="GateKeeper">GateKeeper</option>
//                           <option value="Report">Report</option>
//                           <option value="Loader">Loader</option>
//                         </select>
//                       </td>
//                       <td>
//                         <select
//                           name="AllowedPlant"
//                           value={editUser.AllowedPlant}
//                           onChange={handleEditChange}
//                           style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
//                         >
//                           <option value="">Select Plant</option>
//                           {plants.map(plant => (
//                             <option key={plant.PlantId} value={plant.PlantId}>
//                               {plant.PlantName}
//                             </option>
//                           ))}
//                         </select>
//                       </td>
//                       <td colSpan={2} style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
//                         <button
//                           onClick={() => handleEditSave(user.Username)}
//                           style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer' }}
//                         >Save</button>
//                         <button
//                           onClick={handleEditCancel}
//                           style={{ background: '#bdbdbd', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer' }}
//                         >Cancel</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{user.Username}</td>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{'*'.repeat(user.Password?.length || 8)}</td>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{user.Role}</td>
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{getPlantName(user.AllowedPlant)}</td>
//                       <td style={{ padding: '12px' }}>
//                         <button
//                           onClick={() => handleEdit(user, idx)}
//                           style={{ background: '#ffc107', border: 'none', borderRadius: 6, padding: 7, cursor: 'pointer' }}
//                           title="Edit"
//                         >{iconEdit}</button>
//                       </td>
//                       <td style={{ padding: '12px' }}>
//                         <button
//                           onClick={() => handleDelete(user.Username)}
//                           style={{ background: '#e53935', border: 'none', borderRadius: 6, padding: 7, cursor: 'pointer' }}
//                           title="Delete"
//                         >{iconDelete}</button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserRegister;

import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
const ALL_ROLES = ['Admin','User','Dispatcher','GateKeeper','Report','Loader'];

export default function UserRegister() {
  const [users, setUsers] = useState([]);
  const [plants, setPlants] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showPlantDropdown, setShowPlantDropdown] = useState(false);

  useEffect(() => {
    fetchAll();

    const handler = e => {
      if (!e.target.closest('.role-dropdown')) setShowRoleDropdown(false);
      if (!e.target.closest('.plant-dropdown')) setShowPlantDropdown(false);
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  async function fetchAll() {
    const [uRes, pRes] = await Promise.all([
      fetch(`${API_URL}/api/users`),
      fetch(`${API_URL}/api/plantmaster`)
    ]);
    setUsers(await uRes.json());
    setPlants(await pRes.json());
  }

  const handleEdit = (u, i) => {
    setEditIdx(i);
    setEditUser({
      ...u,
      allowedplants: u.allowedplants || '',
      role: u.role || ''
    });
  };
  const handleCancel = () => {
    setEditIdx(null);
    setEditUser({});
  };

  const handleChange = e => {
    setEditUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleListValue = (field, value) => {
    setEditUser(prev => {
      const cur = prev[field] || '';
      const arr = cur.split(',').filter(Boolean);
      const nextArr = arr.includes(value)
        ? arr.filter(x => x !== value)
        : [...arr, value];
      return { ...prev, [field]: nextArr.join(',') };
    });
  };

  const handleSave = async () => {
    await fetch(`${API_URL}/api/users/${editUser.username}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editUser)
    });
    await fetchAll();
    setEditIdx(null);
    setEditUser({});
  };

  const handleDelete = async username => {
    if (!confirm(`Delete ${username}?`)) return;
    await fetch(`${API_URL}/api/users/${username}`, { method: 'DELETE' });
    await fetchAll();
  };

  const getNames = (str, list, idKey, nameKey) => {
    if (!str) return '';
    return str
      .split(',')
      .map(id => {
        const m = list.find(x => String(x[idKey]) === id);
        return m ? m[nameKey] : id;
      })
      .join(', ');
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-indigo-800 mb-6">
        User Register
      </h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white">
            <tr>
              {['Username','Password','Role','Allowed Plants','Actions'].map(c => (
                <th key={c} className="px-6 py-3">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={u.username}
                className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                {editIdx === i ? (
                  <>
                    <td className="p-4">
                      <input
                        name="username"
                        value={editUser.username}
                        disabled
                        className="w-full border-gray-300 rounded px-3 py-2 bg-gray-100"
                      />
                    </td>
                    <td className="p-4">
                      <input
                        name="password"
                        value={editUser.password}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded px-3 py-2"
                      />
                    </td>

                    {/* Role Dropdown */}
                    <td className="p-4 role-dropdown relative">
                      <div
                        onClick={() => setShowRoleDropdown(show => !show)}
                        className="border rounded px-3 py-2 bg-white cursor-pointer"
                      >
                        {editUser.role.split(',').filter(Boolean).join(', ') ||
                          'Select Roles'}
                      </div>
                      {showRoleDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
                          {ALL_ROLES.map(r => (
                            <label
                              key={r}
                              className="flex items-center px-3 py-1 hover:bg-gray-100">
                              <input
                                type="checkbox"
                                checked={editUser.role
                                  .split(',')
                                  .includes(r)}
                                onChange={() => toggleListValue('role', r)}
                                className="mr-2"
                              />
                              {r}
                            </label>
                          ))}
                        </div>
                      )}
                    </td>

                    {/* Plant Dropdown */}
                    <td className="p-4 plant-dropdown relative">
                      <div
                        onClick={() => setShowPlantDropdown(show => !show)}
                        className="border rounded px-3 py-2 bg-white cursor-pointer"
                      >
                        {getNames(editUser.allowedplants, plants, 'plantid', 'plantname') ||
                          'Select Plants'}
                      </div>
                      {showPlantDropdown && (
                        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-40 overflow-y-auto">
                          {plants.length === 0 && (
                            <div className="p-3 text-gray-500">No plants</div>
                          )}
                          {plants.map(p => {
                            const arr = editUser.allowedplants
                              ? editUser.allowedplants.split(',')
                              : [];
                            return (
                              <label
                                key={p.plantid}
                                className="flex items-center px-3 py-1 hover:bg-gray-100">
                                <input
                                  type="checkbox"
                                  checked={arr.includes(String(p.plantid))}
                                  onChange={() =>
                                    toggleListValue(
                                      'allowedplants',
                                      String(p.plantid)
                                    )
                                  }
                                  className="mr-2"
                                />
                                {p.plantname}
                              </label>
                            );
                          })}
                        </div>
                      )}
                    </td>

                    <td className="p-4 space-x-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 font-medium">{u.username}</td>
                    <td className="px-6 py-4">
                      {'*'.repeat(u.password.length)}
                    </td>
                    <td className="px-6 py-4">{u.role}</td>
                    <td className="px-6 py-4">
                      {getNames(u.allowedplants, plants, 'plantid', 'plantname')}
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleEdit(u, i)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(u.username)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
