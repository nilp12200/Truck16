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

const UserRegister = () => {
  const [users, setUsers] = useState([]);
  const [plants, setPlants] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editUser, setEditUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [userRes, plantRes] = await Promise.all([
        fetch(`${API_URL}/api/users`),
        fetch(`${API_URL}/api/plantmaster`)
      ]);

      if (!userRes.ok) throw new Error("Failed to fetch users");
      if (!plantRes.ok) throw new Error("Failed to fetch plant master");

      const userData = await userRes.json();
      const plantData = await plantRes.json();

      setUsers(userData);
      setPlants(plantData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getPlantNamesFromIds = (plantString) => {
    if (!plantString || !plants.length) return '';
    const ids = plantString.split(',').map(id => id.trim());
    const names = ids.map(id => {
      const match = plants.find(p => p.plantid === Number(id));
      return match ? match.plantname : `Unknown(${id})`;
    });
    return names.join(', ');
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditUser({ ...users[index] });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditUser({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePlantChange = (e) => {
    const options = Array.from(e.target.selectedOptions).map(opt => opt.value);
    setEditUser(prev => ({ ...prev, allowedplants: options.join(',') }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/${editUser.username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser)
      });

      if (!res.ok) throw new Error('Failed to update user');
      await fetchAllData();
      setEditIndex(null);
    } catch (err) {
      alert('Error saving user: ' + err.message);
    }
  };

  const handleDelete = async (username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;
    try {
      const res = await fetch(`${API_URL}/api/users/${username}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete user');
      await fetchAllData();
    } catch (err) {
      alert('Error deleting user: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 1000, margin: '0 auto' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '2rem', marginBottom: '1.5rem', color: '#1a237e' }}>
        User List
      </h2>

      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <div style={{
          overflowX: 'auto',
          borderRadius: 16,
          background: '#f4f6fa',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr style={{ background: '#1976d2', color: '#fff' }}>
                <th style={{ padding: '12px' }}>Username</th>
                <th style={{ padding: '12px' }}>Password</th>
                <th style={{ padding: '12px' }}>Role</th>
                <th style={{ padding: '12px' }}>Allowed Plants</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#e3eafc' }}>
                  {editIndex === idx ? (
                    <>
                      <td style={{ padding: '10px' }}>
                        <input
                          value={editUser.username}
                          name="username"
                          disabled
                          style={{ width: '100%' }}
                        />
                      </td>
                      <td style={{ padding: '10px' }}>
                        <input
                          value={editUser.password}
                          name="password"
                          onChange={handleChange}
                          type="text"
                          style={{ width: '100%' }}
                        />
                      </td>
                      <td style={{ padding: '10px' }}>
                        <input
                          value={editUser.role}
                          name="role"
                          onChange={handleChange}
                          style={{ width: '100%' }}
                        />
                      </td>
                      <td style={{ padding: '10px' }}>
                        <select
                          multiple
                          value={editUser.allowedplants?.split(',') || []}
                          onChange={handlePlantChange}
                          style={{ width: '100%' }}
                        >
                          {plants.map(plant => (
                            <option key={plant.plantid} value={plant.plantid}>
                              {plant.plantname}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={{ padding: '10px' }}>
                        <button onClick={handleSave}>Save</button>{' '}
                        <button onClick={handleCancel}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={{ padding: '10px' }}>{user.username}</td>
                      <td style={{ padding: '10px' }}>{'*'.repeat(user.password?.length || 8)}</td>
                      <td style={{ padding: '10px' }}>{user.role}</td>
                      <td style={{ padding: '10px' }}>{getPlantNamesFromIds(user.allowedplants)}</td>
                      <td style={{ padding: '10px' }}>
                        <button onClick={() => handleEdit(idx)}>Edit</button>{' '}
                        <button onClick={() => handleDelete(user.username)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '1rem', textAlign: 'center', color: '#888' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserRegister;

