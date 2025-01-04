import React from 'react'
import { HiMiniArrowTurnUpLeft } from "react-icons/hi2";


const Route = () => {
  return (
    <div className='flex'>
        <div className="w-16 h-16 flex items-center justify-center">
            <HiMiniArrowTurnUpLeft size={32}/>
        </div>
        <div className="">
            <h2 className='text-xl font-semibold leading-6'>Lorem ipsum dolor sit amet consectetur.</h2>
            <p className='text-gray-600 text-lg leading-6'>Lorem ipsum dolor sit.</p>
            <div className="flex gap-1 items-center">
                <p className='whitespace-nowrap text-gray-600'>18 min</p>
                <div className="w-full h-[1px] bg-gray-600 "></div>
            </div>
        </div>
    </div>
  )
}

export default Route