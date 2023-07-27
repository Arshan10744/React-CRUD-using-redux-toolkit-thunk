import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../features/userDetailsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUser } from '../features/userDetailsSlice';


function Update() {
    const [updatedData, setUpdatedData] = useState({});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();

    const {users, loading} = useSelector((state)=> state.app);
    
    useEffect(() => {
    const singleUser = users.filter((elem)=> elem.id === id);
    setUpdatedData(singleUser[0]);
},[])

    const newData = (e) => {
      setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
    };
    
    console.log(updatedData);
    const handleUpdate = (e) => {
      e.preventDefault();
  
      // Perform validation
      const validationErrors = {};
      if (!updatedData.name) {
        validationErrors.name = 'Name is required';
      }
      if (!updatedData.email) {
        validationErrors.email = 'Email is required';
      } else if (!updatedData.email.includes('@')) {
        validationErrors.email = 'Invalid email address';
      }
      if (!updatedData.age) {
        validationErrors.age = 'Age is required';
      }
      if (!updatedData.gender) {
        validationErrors.gender = 'Gender is required';
      }
  
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      } else {
        setErrors({}); // Clear any existing errors
        dispatch(updateUser(updatedData));
        navigate("/read")
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Registration Form</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your name"
              onChange={newData}
              value={updatedData && updatedData.name}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email"
              onChange={newData}
              value={updatedData && updatedData.email}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block text-gray-700 font-semibold mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your age"
              onChange={newData}
              value={updatedData && updatedData.age}
            />
            {errors.age && <p className="text-red-500">{errors.age}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              onChange={newData}
              value={updatedData && updatedData.gender}
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500">{errors.gender}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    );
}

export default Update