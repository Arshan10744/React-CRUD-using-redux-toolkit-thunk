import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchUser } from '../features/userDetailsSlice';

function Navbar() {

    const allUsers = useSelector((state) => state.app.users);
    const[searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(searchUser(searchValue));
    },[searchValue]);
    
  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 text-white">
      <div className="flex items-center">
        <a href="/" className="text-lg font-bold">Logo</a>
        <ul className="ml-6 flex space-x-4">
          <li><Link to="/" className="hover:underline">Create User</Link></li>
          <li><Link to="/read" className="hover:underline">All Users ({allUsers.length})</Link></li>
          
        </ul>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          name='search'
          className="px-4 py-2 mr-4 rounded bg-white text-gray-800"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white">
          Search
        </button>
      </div>
    </nav>
  )
}

export default Navbar