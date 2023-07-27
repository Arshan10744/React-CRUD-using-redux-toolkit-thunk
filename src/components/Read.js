import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readUser } from '../features/userDetailsSlice';
import { deleteUser } from '../features/userDetailsSlice';
import View from './View';
import { Link } from 'react-router-dom';

function Read() {

    const dispatch = useDispatch();

    const{users, loading, search} = useSelector((state)=>state.app);
    const[id,setId] = useState();
    const [showPopup, setShowPopup] = useState(false);


    useEffect(() =>{
        dispatch(readUser());
    }, []);

    if(loading){
        return <h1>Loading...</h1>
    }

  return (
    <div>
        {showPopup && <View id = {id} showPopup = {showPopup} setShowPopup = {setShowPopup} />}
    <div>
    {users && users.filter((elem) => {
        if(elem.name.toLowerCase().includes(search.toLowerCase()).length === 0) {
            <p className='mt-20'>No Results Found</p>
        }
})}
    {users&& 
    
    users.filter((elem) => {
        if(search.length === 0){
            return elem;
        }
        else{
            return elem.name.toLowerCase().includes(search.toLowerCase());
        }
    })
    
    .map((elem) =>(
     <div key={elem.id} className="max-w-sm bg-gradient-to-r from-gray-400 to-blue-500 shadow-lg rounded-lg hover:scale-105 transition duration-300 mt-10 float-left justify-center ml-16">
      {/* Card content */}
      <div className="p-4">
        {/* Card attributes */}
        <h2 className="text-2xl font-semibold text-white mb-2">{elem.name}</h2>
        <p className="text-white mb-4">{elem.email}</p>
        <p className="text-white mb-4">{elem.age}</p>
        <p className="text-white mb-4">{elem.gender}</p>
        
        {/* Card links */}
        <div className="flex justify-center space-x-4">
          <button onClick={()=> [setId(elem.id), setShowPopup(true)]} href="#" className=" hover:text-gray-500 font-semibold">
            View
          </button>
          <Link to={`/update/${elem.id}`} className=" hover:text-gray-500 font-semibold">
            Edit
          </Link>
          <button onClick={() =>{dispatch(deleteUser(elem.id))} } className=" hover:text-gray-500 font-semibold">
            Delete
          </button>
        </div>
      </div>
    </div>
    
    ))}
    </div>
    </div>
  )
}

export default Read