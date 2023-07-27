import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetailsSlice';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const validationErrors = {};
    if (!users.name) {
      validationErrors.name = 'Name is required';
    }
    if (!users.email) {
      validationErrors.email = 'Email is required';
    } else if (!users.email.includes('@')) {
      validationErrors.email = 'Invalid email address';
    }
    if (!users.age) {
      validationErrors.age = 'Age is required';
    }
    if (!users.gender) {
      validationErrors.gender = 'Gender is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({}); // Clear any existing errors
      dispatch(createUser(users));
      navigate("/read");
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
            onChange={getUserData}
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
            onChange={getUserData}
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
            onChange={getUserData}
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
            onChange={getUserData}
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
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Create;
