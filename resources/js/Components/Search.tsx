import React from 'react';
import { CiSearch } from "react-icons/ci";

export default function Search() {
    return (
        <div className="flex items-center border border-button-border-color rounded-md px-2 ">
            <CiSearch size={20} className="text-gray-400" />
            <input
                type="text"
                placeholder="Quick Search..."
                className="px-4 py-1.5 text-md bg-mainColor text-white border-none focus:outline-none focus:ring-0 focus:border-none focus:shadow-none w-full"
            />
        </div>
    );
}
