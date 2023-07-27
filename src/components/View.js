import { useState } from 'react';
import React from 'react'
import { useSelector } from 'react-redux'

function View({id, showPopup, setShowPopup}) {

    const allUsers = useSelector((state) => state.app.users);

    const singleUser = allUsers.filter((ele) => ele.id === id);

    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" w-70 bg-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="font-semibold mb-2 text-2xl">User Details</h2>
            <p className="text-gray-600 mb-2 text-xl">Name: {singleUser[0].name}</p>
            <p className="text-gray-600 mb-2 text-xl">Email: {singleUser[0].email  }</p>
            <p className="text-gray-600 mb-2 text-xl">Age: {singleUser[0].age}</p>
            <p className="text-gray-600 mb-2 text-xl">Gender: {singleUser[0].gender}</p>
            <button
              onClick={()=>setShowPopup(false)}className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
  )
}

export default View