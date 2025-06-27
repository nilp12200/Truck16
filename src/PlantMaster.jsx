

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';
import CancelButton from './CancelButton';

const API_URL = import.meta.env.VITE_API_URL;

export default function PlantMaster() {
  const [formData, setFormData] = useState({
    plantId: null,
    plantName: '',
    plantAddress: '',
    contactPerson: '',
    mobileNo: '',
    remarks: ''
  });

  const [plantList, setPlantList] = useState([]);
  const [selectedPlantId, setSelectedPlantId] = useState('');
  const [showEditButton, setShowEditButton] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/plants`);
      setPlantList(res.data);
    } catch (err) {
      console.error('Error fetching plant list:', err);
    }
  };

  const handlePlantSelect = (e) => {
    const value = e.target.value;
    const id = parseInt(value, 10);
    if (isNaN(id)) {
      setSelectedPlantId('');
      setShowEditButton(false);
      return;
    }
    setSelectedPlantId(id);
    setShowEditButton(true);
  };

  const handleEditClick = async () => {
    if (!selectedPlantId) return;
    try {
      const res = await axios.get(`${API_URL}/api/plantmaster/${selectedPlantId}`);
      const data = res.data;
      if (data && data.plantId) {
        setFormData({
          plantId: data.plantId,
          plantName: data.plantName,
          plantAddress: data.plantAddress,
          contactPerson: data.contactPerson,
          mobileNo: data.mobileNo,
          remarks: data.remarks
        });
        setEditMode(true);
      } else {
        alert('❌ Invalid plant selected or no data found');
      }
    } catch (err) {
      console.error('Error fetching plant:', err);
      alert('❌ Error fetching plant data');
    }
  };

  const handleDelete = async (plantId) => {
    if (confirm('Are you sure you want to delete this plant?')) {
      try {
        await axios.delete(`${API_URL}/api/plant-master/${plantId}`);
        alert('✅ Plant deleted successfully!');
        fetchPlants();
      } catch (err) {
        console.error('Error deleting plant:', err);
        alert('❌ Failed to delete plant');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'plantName' ? value.toUpperCase() : value
    });
  };

  const handleBack = () => {
    setFormData({
      plantId: null,
      plantName: '',
      plantAddress: '',
      contactPerson: '',
      mobileNo: '',
      remarks: ''
    });
    setEditMode(false);
    setSelectedPlantId('');
    setShowEditButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const duplicate = plantList.some(plant =>
      plant.plantname?.toUpperCase() === formData.plantName.toUpperCase() &&
      plant.plantid !== formData.plantId
    );

    if (duplicate) {
      alert('❌ Plant with same name already exists!');
      return;
    }

    try {
      if (formData.plantId) {
        await axios.put(`${API_URL}/api/plant-master/${formData.plantId}`, formData);
        alert('✅ Plant updated successfully!');
      } else {
        await axios.post(`${API_URL}/api/plant-master`, formData);
        alert('✅ Plant saved successfully!');
      }
      fetchPlants();
      handleBack();
    } catch (err) {
      alert('❌ Error saving/updating plant');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-6">
        <CancelButton />
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-700">Plant Master Admin</h2>

        {!editMode && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Plant to Edit</label>
            <select value={selectedPlantId} onChange={handlePlantSelect} className="block w-full p-2 border rounded-lg border-gray-300 shadow-sm">
              <option value="">-- Select --</option>
              {plantList.map((plant) => (
                <option key={plant.plantid || plant.plantId} value={plant.plantid || plant.plantId}>
                  {(plant.plantname || plant.plantName)?.toUpperCase()}
                </option>
              ))}
            </select>

            {showEditButton && (
              <button onClick={handleEditClick} className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full">
                ✏️ Edit Selected Plant
              </button>
            )}

            <button onClick={() => setEditMode(true)} className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full">
              ➕ Add New Plant
            </button>
          </div>
        )}

        {!editMode && (
          <div className="overflow-auto">
            <table className="min-w-full border text-center">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Mobile</th>
                  <th className="px-4 py-2">Remarks</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plantList.map((plant) => (
                  <tr key={plant.plantid || plant.plantId} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{plant.plantid || plant.plantId}</td>
                    <td className="px-4 py-2">{(plant.plantname || plant.plantName)?.toUpperCase()}</td>
                    <td className="px-4 py-2">{plant.plantaddress || plant.plantAddress}</td>
                    <td className="px-4 py-2">{plant.contactperson || plant.contactPerson}</td>
                    <td className="px-4 py-2">{plant.mobileno || plant.mobileNo}</td>
                    <td className="px-4 py-2">{plant.remarks}</td>
                    <td className="px-4 py-2 space-x-2">
                      <button onClick={() => { setSelectedPlantId(plant.plantid || plant.plantId); handleEditClick(); }} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => handleDelete(plant.plantid || plant.plantId)} className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editMode && (
          <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Plant Name</label>
                <input type="text" name="plantName" value={formData.plantName} onChange={handleChange} required className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Contact Person</label>
                <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="w-full p-2 border rounded" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium">Address</label>
                <textarea name="plantAddress" value={formData.plantAddress} onChange={handleChange} className="w-full p-2 border rounded"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium">Mobile No</label>
                <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Remarks</label>
                <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} className="w-full p-2 border rounded" />
              </div>
            </div>
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {formData.plantId ? 'Update' : 'Save'}
              </button>
              <button type="button" onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
