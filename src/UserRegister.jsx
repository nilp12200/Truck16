import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const iconEdit = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M5 19h14v2H5v-2zm14.7-13.3a1 1 0 0 0-1.4 0l-2 2 3.4 3.4 2-2a1 1 0 0 0 0-1.4l-2-2zm-3.4 2L5 17.3V21h3.7L19.3 8.7l-3.4-3.4z"/></svg>
);
const iconDelete = (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
);

const UserRegister = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editIdx, setEditIdx] = useState(null);
  const [editUser, setEditUser] = useState({ Username: '', Password: '', Role: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/api/users`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;
    try {
      const response = await fetch(`${API_URL}/api/users/${encodeURIComponent(username)}`, { method: 'DELETE' });
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
    if (!editUser.Username.trim() || !editUser.Password.trim()) {
      alert("Username and Password are required.");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/api/users/${encodeURIComponent(username)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editUser),
      });
      if (!response.ok) throw new Error('Failed to update user');
      setUsers(users.map(u => (u.Username === username ? editUser : u)));
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
                <th style={{ padding: '14px', border: 'none', fontWeight: 700, letterSpacing: 1 }}>Edit</th>
                <th style={{ padding: '14px', border: 'none', fontWeight: 700, letterSpacing: 1 }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '1.5rem', color: '#888' }}>No users found.</td>
                </tr>
              ) : (
                users.map((user, idx) => (
                  <tr key={idx} style={{ background: idx === editIdx ? '#fffde7' : idx % 2 === 0 ? '#fff' : '#e3eafc', transition: 'background 0.2s' }}>
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
                            <option value="User">User</option>
                          </select>
                        </td>
                        <td colSpan={2} style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
                          <button onClick={() => handleEditSave(user.Username)} style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer', marginRight: 4 }}>Save</button>
                          <button onClick={handleEditCancel} style={{ background: '#bdbdbd', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 18px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: '12px', border: 'none', fontWeight: 500 }}>{user.Username}</td>
                        <td style={{ padding: '12px', border: 'none', fontWeight: 500 }}>{'*'.repeat(user.Password?.length || 8)}</td>
                        <td style={{ padding: '12px', border: 'none', fontWeight: 500 }}>{user.Role}</td>
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
