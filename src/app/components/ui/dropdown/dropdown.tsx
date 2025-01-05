'use client'
import React,{useState,useEffect,useContext,useRef} from 'react'
import { StoreStateContext } from '@/app/lib/context/storeContext'

type Props = {}

const Dropdown = (props: Props) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div className="relative inline-block text-left">
            <button id="dropdown-button" className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                Select Item
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
            <div id="dropdown-menu" className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden">
                <div className="py-2 p-2" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-button">
                    <a href="#" className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100" role="menuitem">Item 1</a>
                    <a href="#" className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100" role="menuitem">Item 2</a>
                    <a href="#" className="block px-4 py-2 mb-1 text-sm text-gray-700 rounded-md bg-white hover:bg-gray-100" role="menuitem">Item 3</a>
                    
                    
                    {/* <!-- Input field and submit button inside the dropdown -->*/}
                    <input type="text" id="input-field" className="w-full px-4 py-2 border rounded-md mb-2 focus:outline-none focus:border-blue-500" placeholder="Enter New Item"/>
                    <button id="submit-button" className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add</button>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Dropdown