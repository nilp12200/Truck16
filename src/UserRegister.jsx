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
//       if (!response.ok) throw new Error('Failed to fetch plants');
//       const data = await response.json();
//       setPlants(data);
//     } catch (err) {
//       console.error('Error fetching plants:', err.message);
//     }
//   };

//   const getPlantNameById = (plantId) => {
//     const plant = plants.find(p => p.id?.toString() === plantId?.toString());
//     return plant ? plant.plant_name : plantId;
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
//           <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 800 }}>
//             <thead>
//               <tr style={{ background: '#1976d2', color: '#fff' }}>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>User</th>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>Password</th>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>Role</th>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>Allowed Plant</th>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>Edit</th>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>Delete</th>
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
//                   background: idx === editIdx ? '#fffde7' : idx % 2 === 0 ? '#fff' : '#e3eafc',
//                   transition: 'background 0.2s'
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
//                           <option value="">-- Select Plant --</option>
//                           {plants.map(plant => (
//                             <option key={plant.id} value={plant.id}>
//                               {plant.plant_name}
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
//                       <td style={{ padding: '12px', fontWeight: 500 }}>{getPlantNameById(user.AllowedPlant)}</td>
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
// import React, { useEffect, useState } from 'react';

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
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({ Username: '', Password: '', Role: '', AllowedPlants: '' });
//   const [plants, setPlants] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//     fetchPlants();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('/api/users');
//       if (!response.ok) throw new Error('Failed to fetch users');
//       const data = await response.json();
//       setUsers(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPlants = async () => {
//     try {
//       const response = await fetch('/api/plants');
//       if (!response.ok) throw new Error('Failed to fetch plants');
//       const data = await response.json();
//       setPlants(data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (username) => {
//     if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;
//     try {
//       const response = await fetch(`/api/users/${encodeURIComponent(username)}`, { method: 'DELETE' });
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
//     try {
//       const response = await fetch(`/api/users/${encodeURIComponent(username)}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editUser),
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
//       <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '1.5rem', color: '#1a237e', letterSpacing: 1 }}>User Register</h2>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div style={{ color: 'red' }}>{error}</div>
//       ) : (
//         <div style={{ overflowX: 'auto', borderRadius: 16, background: '#f4f6fa', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
//           <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 600 }}>
//             <thead>
//               <tr style={{ background: '#1976d2', color: '#fff' }}>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>User</th>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>Password</th>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>Role</th>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>Allowed Plants</th>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>Edit</th>
//                 <th style={{ padding: '14px', fontWeight: 700, letterSpacing: 1 }}>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>No users found.</td>
//                 </tr>
//               ) : (
//                 users.map((user, idx) => (
//                   <tr key={idx} style={{ background: idx === editIdx ? '#fffde7' : idx % 2 === 0 ? '#fff' : '#e3eafc', transition: 'background 0.2s' }}>
//                     {editIdx === idx ? (
//                       <>
//                         <td><input name="Username" value={editUser.Username} onChange={handleEditChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }} /></td>
//                         <td><input name="Password" value={editUser.Password} onChange={handleEditChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }} /></td>
//                         <td>
//                           <select name="Role" value={editUser.Role} onChange={handleEditChange} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}>
//                             <option value="">Select Role</option>
//                             <option value="Admin">Admin</option>
//                             <option value="GateKeeper">GateKeeper</option>
//                             <option value="Report">Report</option>
//                             <option value="Dispatch">Dispatch</option>
//                             <option value="Loader">Loader</option>
//                           </select>
//                         </td>
//                         <td>
//                           <div style={{ maxHeight: 120, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
//                             {plants.map(plant => (
//                               <label key={plant.PlantID} style={{ marginBottom: 4 }}>
//                                 <input
//                                   type="checkbox"
//                                   value={plant.PlantID}
//                                   checked={editUser.AllowedPlants?.split(',').includes(String(plant.PlantID))}
//                                   onChange={e => {
//                                     const selected = new Set(editUser.AllowedPlants?.split(',').map(s => s.trim()) || []);
//                                     if (e.target.checked) {
//                                       selected.add(String(plant.PlantID));
//                                     } else {
//                                       selected.delete(String(plant.PlantID));
//                                     }
//                                     setEditUser(prev => ({ ...prev, AllowedPlants: Array.from(selected).join(',') }));
//                                   }}
//                                 /> {plant.PlantName}
//                               </label>
//                             ))}
//                           </div>
//                         </td>
//                         <td colSpan={2} style={{ display: 'flex', gap: 8 }}>
//                           <button onClick={() => handleEditSave(user.Username)} style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer' }}>Save</button>
//                           <button onClick={handleEditCancel} style={{ background: '#bdbdbd', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
//                         </td>
//                       </>
//                     ) : (
//                       <>
//                         <td style={{ padding: '12px' }}>{user.Username}</td>
//                         <td style={{ padding: '12px' }}>{'*'.repeat(user.Password?.length || 8)}</td>
//                         <td style={{ padding: '12px' }}>{user.Role}</td>
//                         <td style={{ padding: '12px' }}>{user.AllowedPlants}</td>
//                         <td style={{ padding: '12px' }}>
//                           <button onClick={() => handleEdit(user, idx)} style={{ background: '#ffc107', border: 'none', borderRadius: 6, padding: 7, cursor: 'pointer' }} title="Edit">{iconEdit}</button>
//                         </td>
//                         <td style={{ padding: '12px' }}>
//                           <button onClick={() => handleDelete(user.Username)} style={{ background: '#e53935', border: 'none', borderRadius: 6, padding: 7, cursor: 'pointer' }} title="Delete">{iconDelete}</button>
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserRegister;
// import React, { useEffect, useState } from 'react';

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
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editIdx, setEditIdx] = useState(null);
//   const [editUser, setEditUser] = useState({ Username: '', Password: '', Role: '', AllowedPlants: '' });
//   const [plants, setPlants] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//     fetchPlants();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch('/api/users');
//       if (!response.ok) throw new Error('Failed to fetch users');
//       const data = await response.json();
//       setUsers(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchPlants = async () => {
//     try {
//       const response = await fetch('/api/plants');
//       if (!response.ok) throw new Error('Failed to fetch plants');
//       const data = await response.json();
//       setPlants(data);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleDelete = async (username) => {
//     if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;
//     try {
//       const response = await fetch(`/api/users/${encodeURIComponent(username)}`, { method: 'DELETE' });
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
//     try {
//       const response = await fetch(`/api/users/${encodeURIComponent(username)}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editUser),
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
//       <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '1.5rem', color: '#1a237e', letterSpacing: 1 }}>User Register</h2>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div style={{ color: 'red' }}>{error}</div>
//       ) : (
//         <div style={{ overflowX: 'auto' }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//             <thead>
//               <tr>
//                 <th>Username</th>
//                 <th>Password</th>
//                 <th>Role</th>
//                 <th>Allowed Plants</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, idx) => (
//                 <tr key={user.Username}>
//                   <td>{editIdx === idx ? <input name="Username" value={editUser.Username} onChange={handleEditChange} /> : user.Username}</td>
//                   <td>{editIdx === idx ? <input name="Password" value={editUser.Password} onChange={handleEditChange} /> : user.Password}</td>
//                   <td>{editIdx === idx ? <input name="Role" value={editUser.Role} onChange={handleEditChange} /> : user.Role}</td>
//                   <td>{editIdx === idx ? <input name="AllowedPlants" value={editUser.AllowedPlants} onChange={handleEditChange} /> : user.AllowedPlants}</td>
//                   <td>
//                     {editIdx === idx ? (
//                       <>
//                         <button onClick={() => handleEditSave(user.Username)}>Save</button>
//                         <button onClick={handleEditCancel}>Cancel</button>
//                       </>
//                     ) : (
//                       <>
//                         <button onClick={() => handleEdit(user, idx)}>{iconEdit}</button>
//                         <button onClick={() => handleDelete(user.Username)}>{iconDelete}</button>
//                       </>
//                     )}
//                   </td>
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
//       const response = await fetch(`${API_URL}/api/plants`);
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

const iconEdit = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M5 19h14v2H5v-2zm14.7-13.3a1 1 0 0 0-1.4 0l-2 2 3.4 3.4 2-2a1 1 0 0 0 0-1.4l-2-2zm-3.4 2L5 17.3V21h3.7L19.3 8.7l-3.4-3.4z"/></svg>
);
const iconDelete = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
);

const UserRegister = () => {
  const [users, setUsers] = useState([]);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editIdx, setEditIdx] = useState(null);
  const [editUser, setEditUser] = useState({ Username: '', Password: '', Role: '', AllowedPlants: '' });

  useEffect(() => {
    fetchUsers();
    fetchPlants();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlants = async () => {
    try {
      const response = await fetch('/api/plants');
      if (!response.ok) throw new Error('Failed to fetch plants');
      const data = await response.json();
      setPlants(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(username)}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(u => u.Username !== username));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (user, idx) => {
    setEditIdx(idx);
    setEditUser({ ...user });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (username) => {
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(username)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser),
      });
      if (!response.ok) throw new Error('Failed to update user');
      const updatedUser = await response.json();
      setUsers(users.map(u => (u.Username === username ? updatedUser : u)));
      setEditIdx(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditCancel = () => {
    setEditIdx(null);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 900, margin: '0 auto' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '1.5rem', color: '#1a237e', letterSpacing: 1 }}>User Register</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div style={{ overflowX: 'auto', borderRadius: 16, background: '#f4f6fa', boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 600 }}>
            <thead>
              <tr style={{ background: '#1976d2', color: '#fff' }}>
                <th style={{ padding: '14px', border: 'none', fontWeight: 700, letterSpacing: 1 }}>User</th>
                <th style={{ padding: '14px', border: 'none', fontWeight: 700, letterSpacing: 1 }}>Password</th>
                <th style={{ padding: '14px', border: 'none', fontWeight: 700, letterSpacing: 1 }}>Role</th>
                <th style={{ padding: '14px', border: 'none', fontWeight: 700, letterSpacing: 1 }}>Allowed Plants</th>
                <th style={{ padding: '14px', border: 'none', fontWeight: 700, letterSpacing: 1 }}>Edit</th>
                <th style={{ padding: '14px', border: 'none', fontWeight: 700, letterSpacing: 1 }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>No users found.</td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#e3eafc', transition: 'background 0.2s' }}>
                    {editIdx === idx ? (
                      <>
                        <td>
                          <input
                            name="Username"
                            value={editUser.Username}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
                          />
                        </td>
                        <td>
                          <input
                            name="Password"
                            value={editUser.Password}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
                          />
                        </td>
                        <td>
                          <select
                            name="Role"
                            value={editUser.Role}
                            onChange={handleEditChange}
                            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #bdbdbd' }}
                          >
                            <option value="Admin">Admin</option>
                            <option value="GateKeeper">GateKeeper</option>
                            <option value="Report">Report</option>
                            <option value="Dispatch">Dispatch</option>
                            <option value="Loader">Loader</option>
                          </select>
                        </td>
                        <td>
                          <div style={{ maxHeight: 120, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                            {plants.map(plant => (
                              <label key={plant.PlantID} style={{ marginBottom: 4 }}>
                                <input
                                  type="checkbox"
                                  value={plant.PlantID}
                                  checked={editUser.AllowedPlants?.split(',').map(id => id.trim()).includes(String(plant.PlantID))}
                                  onChange={e => {
                                    const selected = new Set(editUser.AllowedPlants ? editUser.AllowedPlants.split(',').map(id => id.trim()) : []);
                                    if (e.target.checked) {
                                      selected.add(String(plant.PlantID));
                                    } else {
                                      selected.delete(String(plant.PlantID));
                                    }
                                    setEditUser(prev => ({
                                      ...prev,
                                      AllowedPlants: Array.from(selected).join(','),
                                    }));
                                  }}
                                />
                                {' '}{plant.PlantName}
                              </label>
                            ))}
                          </div>
                        </td>
                        <td colSpan={2} style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                          <button onClick={() => handleEditSave(user.Username)} style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer', marginRight: 4 }}>Save</button>
                          <button onClick={handleEditCancel} style={{ background: '#bdbdbd', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: '12px', border: 'none', fontWeight: 500 }}>{user.Username}</td>
                        <td style={{ padding: '12px', border: 'none', fontWeight: 500 }}>{user.Password}</td>
                        <td style={{ padding: '12px', border: 'none', fontWeight: 500 }}>{user.Role}</td>
                        <td style={{ padding: '12px', border: 'none', fontWeight: 500 }}>{user.AllowedPlants ? user.AllowedPlants.split(',').map(plantId => {
                          const plant = plants.find(p => p.PlantID === parseInt(plantId));
                          return plant ? plant.PlantName : plantId;
                        }).join(', ') : '-'}</td>
                        <td style={{ padding: '12px', border: 'none' }}>
                          <button onClick={() => handleEdit(user, idx)} style={{ background: '#ffc107', border: 'none', borderRadius: 6, padding: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit">
                            {iconEdit}
                          </button>
                        </td>
                        <td style={{ padding: '12px', border: 'none' }}>
                          <button onClick={() => handleDelete(user.Username)} style={{ background: '#e53935', border: 'none', borderRadius: 6, padding: 7, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Delete">
                            {iconDelete}
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserRegister;



