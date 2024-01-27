import React from "react";
import { useDispatch } from "react-redux";

const SearchProducts = ({value,setValue}) => {
    
    const dispatch=useDispatch()
    const handleSearch=()=>{
        dispatch()
    }
  return (
    <div>
      <input
        value={value}
        onChange={(e)=>setValue(e.target.value)}
        placeholder="Search Products...."
        className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};

export default SearchProducts;
